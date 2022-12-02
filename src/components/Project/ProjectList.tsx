import { FC } from "react";
import { Project } from "../../types/Project";
import ProjectListStyles from "../../style/Project/ProjectList.module.css";
import ProjectListItem from "./ProjectListItem";

interface ProjectListProps {
  projects: Project[];
}

const ProjectList: FC<ProjectListProps> = ({ projects }) => {
  if (projects.length === 0) {
    return (
      <div className={ProjectListStyles.noProjects}>No projects found :(</div>
    );
  }

  return (
    <div>
      {projects.map((project) => (
        <ProjectListItem key={project.name} project={project} />
      ))}
    </div>
  );
};

export default ProjectList;
