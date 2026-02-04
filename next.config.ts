import path from "path";
import CopyPlugin from "copy-webpack-plugin";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

export default {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: path.join(__dirname, "data/dataset.json"),
            to: path.join(__dirname, "public/data/dataset.json"),
            transform: (content, path) => {
              const dataset = JSON.parse(content as any);

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

initOpenNextCloudflareForDev();