const path = require('path');

const projectPath = path.resolve(__dirname, '..');

module.exports = {
  stories: ['../stories/**/*.stories.js'],
  addons: [],
  webpackFinal: async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      _src: path.resolve(projectPath, "src"),
      _stories: path.resolve(projectPath, "stories"),
    };
    return config;
  },
};
