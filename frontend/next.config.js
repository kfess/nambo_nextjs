const path = require("path");

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // root ディレクトリに対する alias を設定
    config.resolve.alias["@"] = path.resolve(__dirname, "src");

    return config;
  },
};
