
let __unconfig_data;
let __unconfig_stub = function (data = {}) { __unconfig_data = data };
__unconfig_stub.default = (data = {}) => { __unconfig_data = data };
import { vitePreprocess } from "@astrojs/svelte";

const __unconfig_default =  {
	preprocess: [vitePreprocess({ script: true })],
};

if (typeof __unconfig_default === "function") __unconfig_default(...[{"command":"serve","mode":"development"}]);export default __unconfig_data;