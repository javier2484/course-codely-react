import { render } from "@testing-library/react";

import { githubApiResponses } from "../src/git_hub_api_responses";
import { GitHubApiGitHubRepositoryRepository } from "../src/infrastructure/GitHubApiGitHubRepositoryRepository";
import { Dashboard } from "../src/sections/dashboard/Dashboard";

jest.mock("../src/infrastructure/GitHubApiGitHubRepositoryRepository.ts");
const mockRepository =
	GitHubApiGitHubRepositoryRepository as jest.Mock<GitHubApiGitHubRepositoryRepository>;
describe("Dashboard section", () => {
	// eslint-disable-next-line @typescript-eslint/require-await
	it("show all widgets", async () => {
		mockRepository.mockImplementationOnce(() => {
			return {
				search: () => Promise.resolve(githubApiResponses),
			} as unknown as GitHubApiGitHubRepositoryRepository;
		});
		render(<Dashboard />);
	});
});
