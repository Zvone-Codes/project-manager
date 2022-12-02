import { FC } from "react";
import ProjectTagStyles from "../../style/Project/ProjectTag.module.css";

interface ProjectTagProps {
  tag: string;
}

const ProjectTag: FC<ProjectTagProps> = ({ tag }) => {
  return <div className={ProjectTagStyles.container}>#{tag}</div>;
};

export default ProjectTag;
