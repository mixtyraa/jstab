const ChromeExtensionReloader = require('webpack-chrome-extension-reloader');
const WebpackExtensionManifestPlugin = require('webpack-extension-manifest-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const baseManifest = require('./manifest.js');
const pkg = require('./package.json');

module.exports = {
  mode: 'development', // The plugin is activated only if mode is set to development
  watch: true,
  entry: {
    contentscript: './src/content/index.js',
    background: './src/background/index.js',
    tabjs: './src/inject/index.js',
  },

  plugins: [
    new ChromeExtensionReloader({
      port: 9090, // Which port use to create the server
      reloadPage: true, // Force the reload of the page also
      entries: { // The entries used for the content/background scripts
        contentScript: 'contentscript', // Use the entry names, not the file name or the path
        background: 'background', // *REQUIRED
        tabjs: 'tabjs',
      },
    }),
    new WebpackExtensionManifestPlugin({
      config: {
        base: baseManifest,
        extend: {
          version: pkg.version,
        },
      },
    }),
    new CopyPlugin([
      { from: 'src/icons' },
    ]),
  ],
  module: {
    rules: [{
      test: /\.(png|svg|jpg|gif)$/,
      use: [
        'file-loader',
      ],
    }],
  },
};
