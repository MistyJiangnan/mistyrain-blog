// Skill data configuration file
// Used to manage data for the skill display page

export interface Skill {
	id: string;
	name: string;
	description: string;
	icon: string; // Iconify icon name
	category: "frontend" | "backend" | "database" | "tools" | "other";
	level: "beginner" | "intermediate" | "advanced" | "expert";
	experience: {
		years: number;
		months: number;
	};
	projects?: string[]; // Related project IDs
	certifications?: string[];
	color?: string; // Skill card theme color
}

export const skillsData: Skill[] = [
	// Frontend Skills
	{
		id: "javascript",
		name: "JavaScript",
		description:
			"Modern JavaScript development, including ES6+ syntax, asynchronous programming, and modular development.",
		icon: "logos:javascript",
		category: "frontend",
		level: "expert",
		experience: { years: 5, months: 7 },
		projects: ["mistyrain-blog", "data-visualization-tool"],
		color: "#F7DF1E",
	},
	{
		id: "typescript",
		name: "TypeScript",
		description:
			"A type-safe superset of JavaScript that enhances code quality and development efficiency.",
		icon: "logos:typescript-icon",
		category: "frontend",
		level: "expert",
		experience: { years: 4, months: 0 },
		projects: ["mistyrain-blog", "task-manager-app"],
		color: "#3178C6",
	},
	{
		id: "react",
		name: "React",
		description:
			"A JavaScript library for building user interfaces, including Hooks, Context, and state management.",
		icon: "logos:react",
		category: "frontend",
		level: "expert",
		experience: { years: 3, months: 6 },
		projects: ["task-manager-app"],
		color: "#61DAFB",
	},
	{
		id: "vue",
		name: "Vue.js",
		description:
			"A progressive JavaScript framework that is easy to learn and use, suitable for rapid development.",
		icon: "logos:vue",
		category: "frontend",
		level: "advanced",
		experience: { years: 5, months: 0 },
		projects: ["data-visualization-tool"],
		color: "#4FC08D",
	},
	{
		id: "nextjs",
		name: "Next.js",
		description:
			"A production-level React framework supporting SSR, SSG, and full-stack development.",
		icon: "logos:nextjs-icon",
		category: "frontend",
		level: "advanced",
		experience: { years: 2, months: 0 },
		projects: ["blog-platform"],
		color: "#616161",
	},
	{
		id: "astro",
		name: "Astro",
		description:
			"A modern static site generator supporting multi-framework integration and excellent performance.",
		icon: "logos:astro-icon",
		category: "frontend",
		level: "advanced",
		experience: { years: 1, months: 0 },
		projects: ["mistyrain-blog"],
		color: "#FF5D01",
	},
	{
		id: "tailwindcss",
		name: "Tailwind CSS",
		description:
			"A utility-first CSS framework for rapidly building modern user interfaces.",
		icon: "logos:tailwindcss-icon",
		category: "frontend",
		level: "advanced",
		experience: { years: 3, months: 0 },
		projects: ["mistyrain-blog"],
		color: "#06B6D4",
	},
	{
		id: "vite",
		name: "Vite",
		description:
			"Next-generation frontend build tool with fast cold starts and hot updates.",
		icon: "logos:vitejs",
		category: "frontend",
		level: "advanced",
		experience: { years: 3, months: 0 },
		color: "#646CFF",
	},
	{
		id: "webpack",
		name: "Webpack",
		description:
			"A static module bundler for modern JavaScript applications.",
		icon: "logos:webpack",
		category: "frontend",
		level: "intermediate",
		experience: { years: 4, months: 0 },
		color: "#8DD6F9",
	},

	// Backend Skills
	{
		id: "nodejs",
		name: "Node.js",
		description:
			"A JavaScript runtime based on Chrome V8 engine, used for server-side development.",
		icon: "logos:nodejs-icon",
		category: "backend",
		level: "advanced",
		experience: { years: 4, months: 0 },
		projects: ["ci-cd-tools", "backend-services"],
		color: "#339933",
	},
	{
		id: "go",
		name: "Go",
		description:
			"An efficient programming language developed by Google, suitable for cloud-native and microservices development.",
		icon: "logos:go",
		category: "backend",
		level: "advanced",
		experience: { years: 3, months: 0 },
		projects: ["microservices-demo", "ops-tools"],
		color: "#00ADD8",
	},

	// Database Skills
	{
		id: "mysql",
		name: "MySQL",
		description:
			"The world's most popular open-source relational database management system.",
		icon: "logos:mysql-icon",
		category: "database",
		level: "advanced",
		experience: { years: 4, months: 0 },
		color: "#4479A1",
	},
	{
		id: "postgresql",
		name: "PostgreSQL",
		description:
			"A powerful open-source relational database management system.",
		icon: "logos:postgresql",
		category: "database",
		level: "intermediate",
		experience: { years: 3, months: 0 },
		color: "#336791",
	},
	{
		id: "redis",
		name: "Redis",
		description:
			"A high-performance in-memory data structure store, used as a database, cache, and message broker.",
		icon: "logos:redis",
		category: "database",
		level: "intermediate",
		experience: { years: 3, months: 0 },
		color: "#DC382D",
	},
	{
		id: "mongodb",
		name: "MongoDB",
		description:
			"A document-oriented NoSQL database with a flexible data model.",
		icon: "logos:mongodb-icon",
		category: "database",
		level: "intermediate",
		experience: { years: 2, months: 0 },
		color: "#47A248",
	},

	// Tools
	{
		id: "linux",
		name: "Linux",
		description:
			"An open-source operating system, the preferred choice for server deployment and development environments.",
		icon: "logos:linux-tux",
		category: "tools",
		level: "expert",
		experience: { years: 1, months: 0 },
		projects: ["server-management", "shell-scripting"],
		color: "#FCC624",
	},
	{
		id: "docker",
		name: "Docker",
		description:
			"A containerization platform that simplifies application deployment and environment management.",
		icon: "logos:docker-icon",
		category: "tools",
		level: "expert",
		experience: { years: 4, months: 0 },
		projects: ["containerized-apps"],
		color: "#2496ED",
	},
	{
		id: "kubernetes",
		name: "Kubernetes",
		description:
			"A container orchestration platform for automating deployment, scaling, and management of containerized applications.",
		icon: "logos:kubernetes",
		category: "tools",
		level: "advanced",
		experience: { years: 2, months: 0 },
		projects: ["cluster-management"],
		color: "#326CE5",
	},
	{
		id: "git",
		name: "Git",
		description:
			"A distributed version control system, an essential tool for code management and team collaboration.",
		icon: "logos:git-icon",
		category: "tools",
		level: "expert",
		experience: { years: 5, months: 7 },
		color: "#F05032",
	},
	{
		id: "nginx",
		name: "Nginx",
		description: "A high-performance web server and reverse proxy server.",
		icon: "logos:nginx",
		category: "tools",
		level: "advanced",
		experience: { years: 4, months: 0 },
		projects: ["gateway-config"],
		color: "#009639",
	},

	{
		id: "github-actions",
		name: "GitHub Actions",
		description: "Automate your workflow from idea to production.",
		icon: "logos:github-actions",
		category: "tools",
		level: "advanced",
		experience: { years: 3, months: 0 },
		projects: ["automated-workflows"],
		color: "#2088FF",
	},
	{
		id: "prometheus",
		name: "Prometheus",
		description:
			"An open-source systems monitoring and alerting toolkit originally built at SoundCloud.",
		icon: "logos:prometheus",
		category: "tools",
		level: "intermediate",
		experience: { years: 2, months: 0 },
		color: "#E6522C",
	},
	{
		id: "grafana",
		name: "Grafana",
		description:
			"The open analytics and monitoring platform for every database.",
		icon: "logos:grafana",
		category: "tools",
		level: "intermediate",
		experience: { years: 2, months: 0 },
		color: "#F46800",
	},
	{
		id: "vscode",
		name: "VS Code",
		description:
			"A lightweight but powerful code editor with a rich plugin ecosystem.",
		icon: "logos:visual-studio-code",
		category: "tools",
		level: "expert",
		experience: { years: 5, months: 7 },
		color: "#007ACC",
	},

	// Other Skills
	{
		id: "jest",
		name: "Jest",
		description:
			"A JavaScript testing framework focused on simplicity and ease of use.",
		icon: "logos:jest",
		category: "other",
		level: "advanced",
		experience: { years: 3, months: 0 },
		color: "#C21325",
	},
	{
		id: "bash",
		name: "Shell / Bash",
		description:
			"Unix shell and command language, essential for automation and system administration.",
		icon: "logos:bash-icon",
		category: "other",
		level: "expert",
		experience: { years: 5, months: 0 },
		color: "#4EAA25",
	},
	{
		id: "graphql",
		name: "GraphQL",
		description:
			"An API query language and runtime providing a more efficient, powerful, and flexible way to fetch data.",
		icon: "logos:graphql",
		category: "other",
		level: "intermediate",
		experience: { years: 2, months: 0 },
		color: "#E10098",
	},
	{
		id: "elasticsearch",
		name: "Elasticsearch",
		description:
			"A distributed search and analytics engine used for full-text search and log analysis.",
		icon: "logos:elasticsearch",
		category: "other",
		level: "intermediate",
		experience: { years: 2, months: 0 },
		color: "#005571",
	},
];

// Get skill statistics
export const getSkillStats = () => {
	const total = skillsData.length;
	const byLevel = {
		beginner: skillsData.filter((s) => s.level === "beginner").length,
		intermediate: skillsData.filter((s) => s.level === "intermediate")
			.length,
		advanced: skillsData.filter((s) => s.level === "advanced").length,
		expert: skillsData.filter((s) => s.level === "expert").length,
	};
	const byCategory = {
		frontend: skillsData.filter((s) => s.category === "frontend").length,
		backend: skillsData.filter((s) => s.category === "backend").length,
		database: skillsData.filter((s) => s.category === "database").length,
		tools: skillsData.filter((s) => s.category === "tools").length,
		other: skillsData.filter((s) => s.category === "other").length,
	};

	return { total, byLevel, byCategory };
};

// Get skills by category
export const getSkillsByCategory = (category?: string) => {
	if (!category || category === "all") {
		return skillsData;
	}
	return skillsData.filter((s) => s.category === category);
};

// Get advanced skills
export const getAdvancedSkills = () => {
	return skillsData.filter(
		(s) => s.level === "advanced" || s.level === "expert",
	);
};

// Calculate total years of experience
export const getTotalExperience = () => {
	const maxMonths = skillsData.reduce((max, skill) => {
		const currentMonths =
			skill.experience.years * 12 + skill.experience.months;
		return currentMonths > max ? currentMonths : max;
	}, 0);

	return {
		years: Math.floor(maxMonths / 12),
		months: maxMonths % 12,
	};
};
