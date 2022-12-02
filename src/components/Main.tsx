import ProjectList from "./Project/ProjectList";
import MainStyles from "../style/Main.module.css";
import ProjectFile from "../assets/projects.json";

const { projects } = ProjectFile;

function Main() {
  return (
    <div className={MainStyles.container}>
      <h1 className={MainStyles.heading}>ZvoneCodes{"'"} Stream Projects</h1>
      <ProjectList projects={projects} />
    </div>
  );
}

export default Main;
