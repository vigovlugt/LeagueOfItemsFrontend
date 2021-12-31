const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: path.join(__dirname, "data/dataset.json"),
            to: path.join(__dirname, "public/data/dataset.json"),
            transform: (content, path) => {
              const dataset = JSON.parse(content);

              return JSON.stringify({
                items: dataset.items.map(({ id, name }) => ({ id, name })),
                runes: dataset.runes.map(({ id, name }) => ({ id, name })),
                champions: dataset.champions.map(({ id, name }) => ({
                  id,
                  name,
                })),
              });
            },
          },
        ],
      })
    );

    return config;
  },
};
