const manifestjs = {
  manifest_version: 2,
  name: 'js(tab)',
  description: 'js emit in input',
  run_at: 'document_start',
  permissions: [
    'activeTab',
  ],
  icons: {
    48: 'icon64.png',
  },
  background: {
    scripts: [
      'background.js',
    ],
    persistent: true,
  },
  content_scripts: [
    {
      matches: ['<all_urls>'],
      js: ['contentscript.js'],
    },
  ],
  content_security_policy: "script-src 'self' 'unsafe-eval'; object-src 'self'",
  web_accessible_resources: [
    '/tabjs.js',
  ],
};

module.exports = manifestjs;
