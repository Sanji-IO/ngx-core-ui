const fs = require('fs');

const distPackageJson = JSON.parse(fs.readFileSync('dist/package.json'));
const packageJson = JSON.parse(fs.readFileSync('package.json'));
distPackageJson.version = packageJson.version;
fs.writeFileSync('dist/package.json', JSON.stringify(distPackageJson, undefined, 2));
