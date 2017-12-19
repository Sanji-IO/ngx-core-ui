const cpx = require('cpx');
const fs = require('fs');

cpx.copy('LICENSE', 'dist');
cpx.copy('README.md', 'dist');
cpx.copy('CHANGELOG.md', 'dist');

const packageJson = JSON.parse(fs.readFileSync('package.json'));
packageJson.peerDependencies = { ...packageJson.dependencies };
delete packageJson['devDependencies'];
delete packageJson['dependencies'];
delete packageJson['scripts'];
delete packageJson['private'];
delete packageJson['config'];
delete packageJson['jest'];
fs.writeFileSync('dist/package.json', JSON.stringify(packageJson, undefined, 2));
