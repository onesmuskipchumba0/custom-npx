#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const open = require('open');
const fs = require('fs');

// Get the available package manager: pnpm > yarn > npm
const detectPackageManager = () => {
  if (fs.existsSync(path.join(process.cwd(), 'pnpm-lock.yaml'))) return 'pnpm';
  if (fs.existsSync(path.join(process.cwd(), 'yarn.lock'))) return 'yarn';
  return process.platform === 'win32' ? 'npm.cmd' : 'npm';
};

const installTemplateDependencies = async () => {
  const templatesDir = path.join(__dirname, '..', 'templates');
  if (!fs.existsSync(templatesDir)) {
    console.log('⚠️ No templates directory found.');
    return;
  }

  const templateFolders = fs.readdirSync(templatesDir);

  for (const folder of templateFolders) {
    const templatePath = path.join(templatesDir, folder);
    const packageJsonPath = path.join(templatePath, 'package.json');
    const nodeModulesPath = path.join(templatePath, 'node_modules');

    if (fs.existsSync(packageJsonPath) && !fs.existsSync(nodeModulesPath)) {
      const manager = detectPackageManager();
      console.log(`📦 Installing dependencies for template "${folder}" using ${manager}...`);

      await new Promise((resolve, reject) => {
        const install = spawn(manager, ['install'], {
          cwd: templatePath,
          stdio: 'inherit',
          shell: true
        });

        install.on('exit', (code) => {
          if (code === 0) {
            console.log(`✅ Dependencies installed for "${folder}".`);
            resolve();
          } else {
            console.error(`❌ Failed to install dependencies for "${folder}".`);
            reject();
          }
        });
      });
    } else {
      console.log(`✅ "${folder}" already has dependencies or missing package.json. Skipping.`);
    }
  }
};

const startDevServer = () => {
  const rootDir = path.join(__dirname, '..');
  const manager = detectPackageManager();
  const devCommand = manager === 'yarn' ? ['dev'] : ['run', 'dev'];

  console.log('🚀 Starting dev server...');
  const dev = spawn(manager, devCommand, {
    cwd: rootDir,
    stdio: 'inherit',
    shell: true
  });

  setTimeout(() => {
    open('http://localhost:3000', { app: { name: 'chrome' } });
  }, 3000);

  dev.on('error', (err) => {
    console.error('❌ Dev server failed to start:', err);
    process.exit(1);
  });

  process.on('SIGINT', () => {
    dev.kill();
    process.exit();
  });
};

(async () => {
  try {
    await installTemplateDependencies();
    startDevServer();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
