// Not transpiled with TypeScript or Babel, so use plain Es6/Node.js!
module.exports = {
  // This function will run for each entry/format/env combination
  rollup(config, options) {
    if (config.output.format === 'esm') {
      // 将xxx.esm.js 修改为 xxx.mjs
      config.output.file = config.output.file.replace('.esm.', '.m');
    }
    return config; // always return a config.
  },
};
