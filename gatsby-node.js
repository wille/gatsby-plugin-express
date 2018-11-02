const fs = require('fs');

exports.onPostBuild = async ({ store }, pluginOptions) => {
  const { redirects } = store.getState();
  await fs.writeFile(
    pluginOptions.output || 'redirects.json',
    JSON.stringify(redirects, null, 2)
  );
};
