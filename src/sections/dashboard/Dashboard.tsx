import { useEffect, useState } from "react";

import { config } from "../../devdash_config";
import { GitHubApiGitHubRepositoryRepository } from "../../infrastructure/GitHubApiGitHubRepositoryRepository";
import { GitHubApiResponses } from "../../infrastructure/GitHubApiResponse";
import { ReactComponent as Brand } from "./brand.svg";
import { ReactComponent as Check } from "./check.svg";
import styles from "./Dashboard.module.scss";
import { ReactComponent as Error } from "./error.svg";
import { ReactComponent as PullRequests } from "./git-pull-request.svg";
import { ReactComponent as IssueOpened } from "./issue-opened.svg";
import { ReactComponent as Lock } from "./lock.svg";
import { ReactComponent as Forks } from "./repo-forked.svg";
import { ReactComponent as Start } from "./star.svg";
import { ReactComponent as Unlock } from "./unlock.svg";
import { ReactComponent as Watchers } from "./watchers.svg";

const isoToReadableDate = (lastUpdate: string): string => {
	const lastUpdateDate = new Date(lastUpdate);
	const currentDate = new Date();
	const diffDays = currentDate.getDate() - lastUpdateDate.getDate();

	if (diffDays === 0) {
		return "today";
	}

	if (diffDays > 30) {
		return "more than a month ago";
	}

	return `${diffDays} days ago`;
};

const repository = new GitHubApiGitHubRepositoryRepository(config.github_access_token);

export function Dashboard() {
	const [gitHubApiResponses, setGitHubApiResponses] = useState<GitHubApiResponses[]>([]);
	useEffect(() => {
		void repository
			.search(config.widgets.map((widget) => widget.repository_url))
			.then((responses) => {
				setGitHubApiResponses(responses);
			});
	}, []);

	return (
		<>
			<header className={styles.header}>
				<section className={styles.header__container}>
					<Brand />
					<h1 className={styles.app__brand}>DevDash_</h1>
				</section>
			</header>
			<section className={styles.container}>
				{gitHubApiResponses.map((widget) => (
					<article className={styles.widget} key={widget.repositoryData.id}>
						<header className={styles.widget__header}>
							<a
								className={styles.widget__title}
								href={widget.repositoryData.html_url}
								target="_blank"
								title={`${widget.repositoryData.owner.login}/${widget.repositoryData.name}`}
								rel="noreferrer"
							>
								{widget.repositoryData.owner.login}/{widget.repositoryData.name}
							</a>
							{widget.repositoryData.private ? <Lock /> : <Unlock />}
						</header>
						<div className={styles.widget__body}>
							<div className={styles.widget__status}>
								<p>Last update {isoToReadableDate(widget.repositoryData.updated_at)}</p>
								{widget.ciStatus.workflow_runs.length > 0 && (
									<div>
										{widget.ciStatus.workflow_runs[0].status === "completed" ? (
											<Check />
										) : (
											<Error />
										)}
									</div>
								)}
							</div>
							<p className={styles.widget__description}>{widget.repositoryData.description}</p>
						</div>
						<footer className={styles.widget__footer}>
							<div className={styles.widget__stat}>
								<Start />
								<span>{widget.repositoryData.stargazers_count}</span>
							</div>
							<div className={styles.widget__stat}>
								<Watchers />
								<span>{widget.repositoryData.watchers_count}</span>
							</div>
							<div className={styles.widget__stat}>
								<Forks />
								<span>{widget.repositoryData.forks_count}</span>
							</div>
							<div className={styles.widget__stat}>
								<IssueOpened />
								<span>{widget.repositoryData.open_issues_count}</span>
							</div>
							<div className={styles.widget__stat}>
								<PullRequests />
								<span>{widget.pullRequests.length}</span>
							</div>
						</footer>
					</article>
				))}
			</section>
		</>
	);
}
