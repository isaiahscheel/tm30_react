/**
 * Project's customized Webpack Configuration Extension
 * ----------------------------------------------------
 * You can use this to extend/override `create-react-app` default config.
 *
 */
const path = require('path');

// strip out unused plugins for components
function removeUnusedPlugins(plugins) {
  return plugins.filter(p => {
    return p.constructor.name !== 'ManifestPlugin' &&
      p.constructor.name !== 'GenerateSW';
  })
}

module.exports = (webpackConfig, env, { paths }) => {
  const config = webpackConfig(env);
  config.plugins = removeUnusedPlugins(config.plugins);

  // alias config so imports don't need to specify the full path to config file
  // config.resolve.alias = Object.assign({}, config.resolve.alias, {
  //   config: path.resolve(__dirname, './src/config')
  // });

  return config;
}
