// scripts/install-template-deps.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const templatesDir = path.join(__dirname, '..', 'templates');

const installDeps = (templatePath) => {
  const packageJsonPath = path.join(templatePath, 'package.json');
  const nodeModulesPath = path.join(templatePath, 'node_modules');

  if (fs.existsSync(packageJsonPath)) {
    if (!fs.existsSync(nodeModulesPath)) {
      console.log(`📦 Installing dependencies for ${path.basename(templatePath)}...`);
      try {
        execSync('npm install', { cwd: templatePath, stdio: 'inherit' });
        console.log(`✅ Installed for ${path.basename(templatePath)}`);
      } catch (err) {
        console.error(`❌ Failed to install for ${path.basename(templatePath)}:`, err.message);
      }
    } else {
      console.log(`👍 Dependencies already installed for ${path.basename(templatePath)}`);
    }
  }
};

const scanTemplates = () => {
  if (!fs.existsSync(templatesDir)) {
    console.error('❌ Templates directory not found.');
    process.exit(1);
  }

  const dirs = fs.readdirSync(templatesDir);
  dirs.forEach(dir => {
    const templatePath = path.join(templatesDir, dir);
    if (fs.statSync(templatePath).isDirectory()) {
      installDeps(templatePath);
    }
  });
};

scanTemplates();
