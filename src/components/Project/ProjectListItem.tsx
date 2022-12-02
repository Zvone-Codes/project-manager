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
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();

    const streamStartTime = [16, 30];
    const streamEndTime = [18, 30];

    // If the current time is between the start and end times, return true
    if (
      currentHour >= streamStartTime[0] &&
      currentHour <= streamEndTime[0] &&
      currentMinute >= streamStartTime[1] &&
      currentMinute <= streamEndTime[1]
    ) {
      return true;
    }

    return false;
  }, [isToday]);

  const tags = useMemo(
    () => project.tags.map((tag) => <ProjectTag key={tag} tag={tag} />),
    [project.tags]
  );

  return (
    <div
      className={`${ProjectListItemStyles.container} ${ProjectListItemStyles[streamDateClass]}`}
      onClick={() =>
        isStreamingCurrently && openUrl("https://www.twitch.tv/zvonecodes/")
      }
    >
      <div className={ProjectListItemStyles.title}>{project.name}</div>
      <div className={ProjectListItemStyles.date}>
        {new Date(project.stream_date).toLocaleDateString()} - 4:30pm
      </div>
      {isToday && (
        <iframe
          className={ProjectListItemStyles.embedded}
          src="https://player.twitch.tv/?channel=zvonecodes"
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
