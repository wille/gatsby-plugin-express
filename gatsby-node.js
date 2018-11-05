const fs = require('fs');
const path = require('path');

exports.onPostBuild = ({ store }, pluginOptions) => {
  const { redirects, pages } = store.getState();

  const p = [];
  for (const page of pages.values()) {
    p.push({
      path: page.path,
      matchPath: page.matchPath,
    });
  }

  const data = {
    redirects,
    pages: p,
  };

  fs.writeFileSync(
    path.resolve(pluginOptions.output || 'gatsby-express.json'),
    JSON.stringify(data, null, 2)
  );
};
