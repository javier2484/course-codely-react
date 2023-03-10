import { githubApiResponses } from "../../git_hub_api_responses";
import style from "./Dashboard.module.scss";

export function Dashboard() {
	const title = "DevDash_";

	return (
		<>
			<header className={style.container}>
				<h1>{title}</h1>
			</header>

			<section className={style.container}>
				<ul>
					{githubApiResponses.map((widget) => (
						<article className={style.widget} key={widget.repositoryData.id}>
							<header className={style.widget__header}>
								<a
									className={style.widget__title}
									target="_blank"
									href={widget.repositoryData.url}
									title={`${widget.repositoryData.organization.login}/${widget.repositoryData.name}`}
									rel="noreferrer"
								>
									{widget.repositoryData.organization.login}/{widget.repositoryData.name}
								</a>
								{/*{widget.repositoryData.private ? <Lock /> : <Unlock />}*/}
							</header>
						</article>
					))}
				</ul>
			</section>
		</>
	);
}
