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
			id: "d15f358e-6501-479a-a6ea-42e33bf0b09a",
			repository_url: "https://github.com/javier2484/skeleton-ddd-typescript",
		},
	],
};
