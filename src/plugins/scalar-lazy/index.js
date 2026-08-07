// Local fork of @scalar/docusaurus (MIT) that does NOT inject the ~1 MB
// api-reference bundle globally. Upstream's injectHtmlTags() adds the script
// to every page of the site; here the route component lazy-loads the vendored
// bundle on first mount instead, so only /api visitors pay for it.
// Options: { route, configuration, bundle } — see docusaurus.config.ts.
const path = require('node:path');
const {normalizeUrl} = require('@docusaurus/utils');

module.exports = function scalarLazy(context, options) {
  return {
    name: 'scalar-lazy',
    loadContent() {
      return options;
    },
    contentLoaded({content, actions}) {
      actions.addRoute({
        path: normalizeUrl([context.siteConfig.baseUrl, options.route ?? '/api']),
        component: path.resolve(__dirname, './ScalarLazy.js'),
        exact: true,
        ...content,
      });
    },
  };
};
