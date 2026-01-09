
import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import COS from "cos-nodejs-sdk-v5";

const BUCKET = "yanyu-1308075390";
const REGION = "ap-shanghai";

// COS 根目录：相册/
const ROOT_PREFIX = "相册/";

// 输出到这个相册（一个总相册）
// 最终写入：public/images/albums/<TARGET_ALBUM_ID>/info.json
const TARGET_ALBUM_ID = "Photos"; // 你可以改成“相册总集”之类，但建议用英文文件夹名更稳
const OUT_ROOT = path.resolve(process.cwd(), "public/images/albums");

const PUBLIC_BASE = `https://${BUCKET}.cos.${REGION}.myqcloud.com`;

// 是否在新增图上加一个“收件箱”标签，方便你后续整理
const INBOX_TAG = ""; // 不想要就设为 ""

// 仅图片后缀
function isImageKey(key) {
  return /\.(jpg|jpeg|png|webp|gif|bmp|svg|avif|tiff|tif)$/i.test(key);
}
function isFolderMarker(key) {
  return key.endsWith("/");
}
function toPublicUrl(key) {
  return `${PUBLIC_BASE}/${encodeURI(key)}`;
}
function toYYYYMMDD(v) {
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString().slice(0, 10);
}
function stableIdFromKey(key) {
  // 稳定 id：对 key 做 sha1，避免每次构建 photo-1/2/3 变动
  return crypto.createHash("sha1").update(key).digest("hex").slice(0, 16);
}
function categoryFromPrefix(prefix) {
  // prefix: 相册/风景/ -> 风景
  const clean = prefix.replace(ROOT_PREFIX, "").replace(/\/$/, "");
  return clean;
}

function buildCosClient() {
  const { SecretId, SecretKey } = process.env;
  if (!SecretId || !SecretKey) {
    throw new Error("缺少环境变量 SecretId / SecretKey");
  }
  return new COS({ SecretId, SecretKey });
}

async function cosGetBucket(cos, params) {
  return await new Promise((resolve, reject) => {
    cos.getBucket(params, (err, data) => (err ? reject(err) : resolve(data)));
  });
}

async function listCategoryPrefixes(cos) {
  // 枚举 ROOT_PREFIX 下一级子目录
  const res = await cosGetBucket(cos, {
    Bucket: BUCKET,
    Region: REGION,
    Prefix: ROOT_PREFIX,
    Delimiter: "/",
    MaxKeys: 1000,
  });

  const prefixes = (res?.CommonPrefixes || [])
    .map((x) => x?.Prefix)
    .filter(Boolean);

  return prefixes;
}

async function listAllObjectsUnderPrefix(cos, prefix) {
  const all = [];
  let Marker = undefined;

  while (true) {
    const res = await cosGetBucket(cos, {
      Bucket: BUCKET,
      Region: REGION,
      Prefix: prefix,
      Marker,
      MaxKeys: 1000,
    });

    all.push(...(res?.Contents || []));

    if (res?.IsTruncated === "true") Marker = res.NextMarker;
    else break;
  }
  return all;
}

async function readJsonIfExists(file) {
  try {
    const txt = await fs.readFile(file, "utf8");
    return JSON.parse(txt);
  } catch {
    return null;
  }
}

function mergeIncremental(existingInfo, newPhotos, { keepOrder = true } = {}) {
  const info =
    existingInfo ??
    ({
      mode: "external",
      title: TARGET_ALBUM_ID,
      description: "",
      date: new Date().toISOString().slice(0, 10),
      location: "",
      tags: [],
      layout: "masonry",
      columns: 3,
      hidden: false,
      cover: "",
      photos: [],
    });

  // 现有 src 集合：用于判重（不改变你已有照片顺序和内容）
  const existingSrc = new Set((info.photos || []).map((p) => p?.src).filter(Boolean));

  const appended = [];
  for (const p of newPhotos) {
    if (!p?.src) continue;
    if (existingSrc.has(p.src)) continue;
    appended.push(p);
    existingSrc.add(p.src);
  }

  // 只做增量追加，不重排
  info.photos = [...(info.photos || []), ...appended];

  // cover：如果你已手工设置，就不动；否则用第一张已有图/新增图
  if (!info.cover) {
    const first = info.photos?.[0]?.src;
    if (first) info.cover = first;
  }

  // date：保留你手工 date，不强制覆盖
  if (!info.date) info.date = new Date().toISOString().slice(0, 10);

  return { info, appendedCount: appended.length };
}

async function main() {
  const cos = buildCosClient();

  const outDir = path.join(OUT_ROOT, TARGET_ALBUM_ID);
  const outFile = path.join(outDir, "info.json");

  await fs.mkdir(outDir, { recursive: true });

  const existing = await readJsonIfExists(outFile);

  console.log(`[cos-merge] ROOT_PREFIX=${ROOT_PREFIX}`);
  console.log(`[cos-merge] target=${outFile}`);
  console.log(`[cos-merge] existing photos=${existing?.photos?.length ?? 0}`);

  const categoryPrefixes = await listCategoryPrefixes(cos);
  console.log(`[cos-merge] categories found=${categoryPrefixes.length}`);
  categoryPrefixes.slice(0, 10).forEach((p) => console.log(" -", p));

  // 拉取所有分类下的图片，生成“新增候选”
  const candidates = [];

  for (const catPrefix of categoryPrefixes) {
    const category = categoryFromPrefix(catPrefix) || "uncategorized";

    const objects = await listAllObjectsUnderPrefix(cos, catPrefix);

    const imgs = objects
      .map((o) => ({
        Key: o?.Key,
        LastModified: o?.LastModified,
      }))
      .filter((o) => o?.Key)
      .filter((o) => !isFolderMarker(o.Key))
      .filter((o) => isImageKey(o.Key))
      .sort((a, b) => (a.Key > b.Key ? 1 : -1));

    for (const it of imgs) {
      const src = toPublicUrl(it.Key);
      const base = path.basename(it.Key);
      const tags = [category];
      if (INBOX_TAG) tags.push(INBOX_TAG);

      candidates.push({
        id: stableIdFromKey(it.Key),
        src,
        alt: base,
        title: base,
        description: "",
        tags,
        date: toYYYYMMDD(it.LastModified), // 上传时间
        // 你如果还要 width/height，可后续在“新增”这部分再补一次 ?imageInfo
      });
    }
  }

  console.log(`[cos-merge] candidate photos from COS=${candidates.length}`);

  const { info, appendedCount } = mergeIncremental(existing, candidates);

  await fs.writeFile(outFile, JSON.stringify(info, null, 2), "utf8");

  console.log(`[cos-merge] appended=${appendedCount}, total now=${info.photos.length}`);
  console.log(`[cos-merge] done: ${outFile}`);
}

main().catch((e) => {
  console.error("[cos-merge] failed:", e);
  process.exit(1);
});
