// next.config.js
const DotEnv = require("dotenv-webpack");
const withTypescript = require("@zeit/next-typescript");

const config = {
  target: "serverless",
  webpack: config => {
    config.plugins.push(new DotEnv());
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto"
    });
    return config;
  }
};

module.exports = withTypescript(config);

// const { PHASE_PRODUCTION_SERVER } =
//   process.env.NODE_ENV === "development"
//     ? {} // We're never in "production server" phase when in development mode
//     : !process.env.NOW_REGION
//     ? require("next/constants") // Get values from `next` package when building locally
//     : require("next-server/constants"); // Get values from `next-server` package when building on now v2

// module.exports = (phase, { defaultConfig }) => {
//   if (phase === PHASE_PRODUCTION_SERVER) {
//     // Config used to run in production.
//     return {
//       // target: "serverless"
//     };
//   }

//   return withTypescript();
// };
