#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const open = require('open');
const fs = require('fs');

// Get npm executable path based on platform
const getNpmPath = () => {
    return process.platform === 'win32' ? 'npm.cmd' : 'npm';
};

// Start the Next.js development server
const startServer = () => {
    console.log('Starting create-custom...');
    
    const projectRoot = path.join(__dirname, '..');
    const npmPath = getNpmPath();
    const targetDir = process.cwd();

    // Verify package.json exists
    if (!fs.existsSync(path.join(projectRoot, 'package.json'))) {
        console.error('Error: package.json not found in', projectRoot);
        process.exit(1);
    }

    try {
        const serverProcess = spawn(npmPath, ['run', 'dev'], {
            cwd: projectRoot,
            stdio: 'inherit',
            shell: true,
            env: { 
                ...process.env,
                TARGET_DIR: targetDir 
            }
        });

        // Wait for server to start
        setTimeout(() => {
            open('http://localhost:3000', { app: { name: 'chrome' } });
        }, 3000);

        serverProcess.on('error', (err) => {
            console.error('Failed to start server:', err);
            process.exit(1);
        });

        // Handle cleanup
        process.on('SIGINT', () => {
            serverProcess.kill();
            process.exit();
        });

    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();