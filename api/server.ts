import express from 'express';
import { exec } from 'child_process';
import path from 'path';
import fs from 'fs-extra';
import { promisify } from 'util';
import cors from 'cors';

const execAsync = promisify(exec);

const app = express();

// Configure CORS properly
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['POST'],
  credentials: true
}));

app.use(express.json());

// Add a health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

interface ProjectConfig {
    projectName: string;
    templatePath: string;
    initGit: boolean;
    openVSCode: boolean;
}

const templatesPath = path.join(__dirname, '..', 'templates');

app.post('/api/create-project', async (req, res) => {
    try {
        const { projectName, templatePath, initGit, openVSCode }: ProjectConfig = req.body;
        const targetDir = process.env.TARGET_DIR || process.cwd();

        // Validate project name
        if (!projectName.match(/^[a-zA-Z0-9-_]+$/)) {
            throw new Error('Invalid project name');
        }

        const projectPath = path.join(targetDir, projectName);

        // Check if directory already exists
        if (await fs.pathExists(projectPath)) {
            throw new Error('Project directory already exists');
        }

        // Create project directory
        await fs.ensureDir(projectPath);

        // Copy template files
        const sourcePath = path.join(templatesPath, templatePath);
        if (!await fs.pathExists(sourcePath)) {
            throw new Error('Template not found');
        }

        await fs.copy(sourcePath, projectPath);

        // Initialize git if requested
        if (initGit) {
            await execAsync('git init', { cwd: projectPath });
        }

        // Open VS Code if requested
        if (openVSCode) {
            await execAsync('code .', { cwd: projectPath });
        }

        res.json({ 
            success: true, 
            message: `Project ${projectName} created successfully` 
        });
    } catch (error: any) {
        console.error('Error creating project:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message || 'Error creating project' 
        });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});