#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const open = require('open');

// Start the Next.js development server
const startServer = () => {
    const serverProcess = spawn('npm', ['run', 'dev'], {
        cwd: path.join(__dirname, '..'),
        stdio: 'inherit'
    });

    // Wait a bit for the server to start, then open Chrome
    setTimeout(() => {
        open('http://localhost:3000', { app: { name: 'chrome' } });
    }, 3000);

    serverProcess.on('error', (err) => {
        console.error('Failed to start server:', err);
        process.exit(1);
    });
};

startServer();