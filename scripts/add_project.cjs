const { projects } = require("../src/assets/projects.json");
const fs = require("fs");
const prompt = require("prompt");

prompt.start();

prompt.get(
  ["name", "description", "tags", "stream_date"],
  function (err, result) {
    if (err) {
      console.error(err);
    } else {
      const project = {
        name: result.name,
        description: result.description,
        tags: result.tags.split(","),
        stream_date: result.stream_date,
      };

      const newProjects = [...projects, project];

      console.log(project);

      prompt.get(["confirm"], function (err, result) {
        if (err) {
          console.error(err);
        } else {
          if (result.confirm === "y") {
            fs.writeFile(
              "./src/assets/projects.json",
              JSON.stringify({ projects: newProjects }),
              function (err) {
                if (err) {
                  console.error(err);
                } else {
                  console.log("Project added successfully!");
                }
              }
            );
          } else {
            console.log("Project not added.");
          }
        }
      });
    }
  }
);
