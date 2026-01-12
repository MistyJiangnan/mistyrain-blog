// Timeline data configuration file
// Used to manage data for the timeline page

export interface TimelineItem {
	id: string;
	title: string;
	description: string;
	type: "education" | "work" | "project" | "achievement";
	startDate: string;
	endDate?: string; // If empty, it means current
	location?: string;
	organization?: string;
	position?: string;
	skills?: string[];
	achievements?: string[];
	links?: {
		name: string;
		url: string;
		type: "website" | "certificate" | "project" | "other";
	}[];
	icon?: string; // Iconify icon name
	color?: string;
	featured?: boolean;
}

export const timelineData: TimelineItem[] = [
	{
		id: "current-works",
		title: "运维开发专家 / SRE 工程师",
		description:
			"专注于 DevOps 平台建设与 SRE 稳定性保障体系。作为打通开发与运维边界的“连接者”，致力于用工程化手段解决复杂的运维难题，提升研发效能与系统稳定性。",
		type: "work",
		startDate: "2022-07-01",
		endDate: "", // Present
		location: "Shanghai, China",
		organization: "某知名互联网企业",
		position: "SRE / DevOps Engineer",
		skills: [
			"React",
			"TypeScript",
			"Go",
			"Node.js",
			"Kubernetes",
			"Docker",
			"CI/CD",
		],
		achievements: [
			"主导一站式 DevOps 研发效能平台的前端架构与开发，打通从代码提交到生产发布的全链路",
			"建设 SRE 可观测性平台，基于 Prometheus/Grafana 定制开发高可用监控大屏，实现故障秒级发现",
			"开发自动化运维工具链，包括资源自动交付、故障自愈系统，降低人工运维成本 40%",
			"优化 CI/CD 流水线引擎，引入容器化构建与缓存策略，将核心服务构建速度提升 50%+",
		],
		icon: "material-symbols:work",
		color: "#3B82F6", // Blue
		featured: true,
	},
	{
		id: "state-grid-works",
		title: "前端开发工程师",
		description:
			"服务于国家重点行业，参与电力系统核心业务平台的研发。在极其严格的内网环境与高稳定性要求下，完成了多个关键调度系统与数据可视化平台的大屏开发。",
		type: "work",
		startDate: "2020-07-01",
		endDate: "2022-06-30",
		location: "Nanjing, China",
		organization: "国家电网 (State Grid)",
		position: "Frontend Engineer",
		skills: [
			"Vue.js",
			"JavaScript",
			"ECharts",
			"WebGL",
			"Data Visualization",
		],
		achievements: [
			"参与电力业务管理系统的日常功能迭代与维护，确保业务流程顺畅",
			"基于 Vue.js 和 ECharts 开发数据展示页面，协助业务人员进行数据监控",
			"配合后端完成接口对接与调试，优化前端页面的响应速度与交互体验",
			"负责内部系统的前端模块化开发，维护公共组件代码，提升代码复用率",
		],
		icon: "material-symbols:corporate-fare",
		color: "#059669", // Green
		featured: true,
	},
];

export const getTimelineStats = () => {
	const total = timelineData.length;
	const byType = {
		work: timelineData.filter((item) => item.type === "work").length,
		project: timelineData.filter((item) => item.type === "project").length,
		education: timelineData.filter((item) => item.type === "education")
			.length,
		achievement: timelineData.filter((item) => item.type === "achievement")
			.length,
	};
	return { total, byType };
};

export const getCurrentItems = () => {
	return timelineData.filter((item) => !item.endDate);
};

export const getTimelineByType = (type?: string) => {
	if (!type) {
		return timelineData.sort(
			(a, b) =>
				new Date(b.startDate).getTime() -
				new Date(a.startDate).getTime(),
		);
	}
	return timelineData
		.filter((item) => item.type === type)
		.sort(
			(a, b) =>
				new Date(b.startDate).getTime() -
				new Date(a.startDate).getTime(),
		);
};

export const getTotalWorkExperience = () => {
	const totalMonths = timelineData
		.filter((item) => item.type === "work")
		.reduce((total, item) => {
			const start = new Date(item.startDate);
			const end = item.endDate ? new Date(item.endDate) : new Date();
			const months =
				(end.getFullYear() - start.getFullYear()) * 12 +
				(end.getMonth() - start.getMonth());
			return total + months;
		}, 0);
	return {
		years: Math.floor(totalMonths / 12),
		months: totalMonths % 12,
	};
};
