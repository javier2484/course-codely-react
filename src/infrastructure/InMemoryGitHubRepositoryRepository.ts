import { githubApiResponses } from "../git_hub_api_responses";

export class InMemoryGitHubRepositoryRepository {
	search(): typeof githubApiResponses {
		return githubApiResponses;
	}
}
