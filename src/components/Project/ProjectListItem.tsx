import { FC, useMemo } from "react";
import { Project } from "../../types/Project";
import ProjectListItemStyles from "../../style/Project/ProjectListItem.module.css";
import ProjectTag from "./ProjectTag";

interface ProjectListItemProps {
  project: Project;
}

const openUrl = (url: string) => {
  window.open(url, "_blank");
};

const ProjectListItem: FC<ProjectListItemProps> = ({ project }) => {
  const streamDateClass = useMemo(() => {
    const streamDate = new Date(project.stream_date);
    const today = new Date();

    // If it's today, return the today class
    if (
      streamDate.getDate() === today.getDate() &&
      streamDate.getMonth() === today.getMonth() &&
      streamDate.getFullYear() === today.getFullYear()
    ) {
      return "today";
    }

    // If it's in the future, return the future class
    if (streamDate > today) {
      return "future";
    }

    // Otherwise, return the past class
    return "past";
  }, [project.stream_date]);

  const isToday = streamDateClass === "today";
  const isStreamingCurrently = useMemo(() => {
    if (!isToday) {
      return false;
    }

    const currentTime = new Date();

    const startTime = new Date();
    startTime.setHours(16);
    startTime.setMinutes(30);

    const endTime = new Date();
    endTime.setHours(18);
    endTime.setMinutes(30);

    return currentTime >= startTime && currentTime <= endTime;
  }, [isToday]);

  const tags = useMemo(
    () => project.tags.map((tag) => <ProjectTag key={tag} tag={tag} />),
    [project.tags]
  );

  return (
    <div
      className={`${ProjectListItemStyles.container} ${ProjectListItemStyles[streamDateClass]}`}
      onClick={() => isToday && openUrl("https://www.twitch.tv/zvonecodes/")}
    >
      <div className={ProjectListItemStyles.title}>{project.name}</div>
      <div className={ProjectListItemStyles.date}>
        {new Date(project.stream_date).toLocaleDateString()} - 4:30pm
      </div>
      {!isStreamingCurrently && (
        <iframe
          className={ProjectListItemStyles.embedded}
          src="https://player.twitch.tv/?channel=zvonecodes&parent=zvonecodes-schedule.netlify.app"
        />
      )}
      <div className={ProjectListItemStyles.description}>
        {project.description}
      </div>
      <div className={ProjectListItemStyles.tags}>{tags}</div>
    </div>
  );
};

export default ProjectListItem;
