const axios = require("axios");

const checkSonarStatus = async () => {
  await axios(
    `${process.env.SONAR_SERVER_URL}/api/qualitygates/project_status?projectKey=${process.env.SONAR_PROJECT_KEY}`,
    {
      headers: {
        Authorization: process.env.SONAR_BASIC_AUTH,
      },
    }
  )
    .then((res) => {
      const { projectStatus } = res.data;
      if (projectStatus.status === "ERROR") {
        console.log(
          "Failed to pass the following conditions:",
          projectStatus.conditions
        );
        process.exit(1);
      } else {
        console.log("Passed sonar checks");
      }
    })
    .catch((e) => {
      console.error("ERROR:", e.message);
      process.exit(1);
    });
};

setTimeout(checkSonarStatus, 2000);
