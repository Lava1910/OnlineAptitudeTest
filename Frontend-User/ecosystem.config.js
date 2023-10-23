module.exports = {
  name: "QUIZZ_APP",
  script: "serve",
  env: {
    PM2_SERVE_PATH: "./build",
    PM2_SERVE_PORT: 1800,
    PM2_SERVE_SPA: "true",
  },
};
