export class GItHubApiGitHubRepositoryRepository {
	private readonly endpoints [
			"https://api.github.com/repos/$organization/$name",
			"https://api.github.com/repos/$organization/$name/pulls",
			"https://api.github.com/repos/$organization/$name/actions/runs?page=1&per_page=1",
		];

	constructor(private readonly personaAccessToken: string) {
	}

	async search() {}
}
