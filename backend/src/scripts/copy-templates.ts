import * as path from 'path';
import * as fse from 'fs-extra';

const srcDir = path.join(__dirname, 'src', 'modules', 'mail', 'templates');
const destDir = path.join(__dirname, 'dist/src/modules/mail', 'templates');

fse.copy(srcDir, destDir, (err: Error | null) => {
  if (err) {
    console.error('Error copying templates:', err);
  } else {
    console.log('Templates copied successfully.');
  }
});
