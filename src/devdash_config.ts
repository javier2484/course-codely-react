export interface DevDashConfig {
	github_access_token: string;
	widgets: {
		id: string;
		repository_url: string;
	}[];
}

export const config: DevDashConfig = {
	github_access_token: process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN as string,
	widgets: [
		{
			id: "228d51b7-713a-42d3-a79c-662d3a9d8b19",
			repository_url: "https://github.com/javier2484/course-codely-react",
		},
		{
			id: "5e524353-7e52-4581-8c1c-b5db1b593fc7",
			repository_url: "https://github.com/javier2484/skeleton-ddd-typescript",
		},
	],
};
