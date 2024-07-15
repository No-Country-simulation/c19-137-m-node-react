const path = require('path');
const fse = require('fs-extra');

const srcDir = path.join(__dirname, '..', 'modules', 'mail', 'templates');
const destDir = path.join(__dirname, '..', '..', 'dist', 'src', 'modules', 'mail', 'templates');

fse.copy(srcDir, destDir, (err) => {
  if (err) {
    console.error('Error copying templates:', err);
  } else {
    console.log('Templates copied successfully.');
  }
});
