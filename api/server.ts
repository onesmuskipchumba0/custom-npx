import express from 'express';
import { exec } from 'child_process';
import path from 'path';
import fs from 'fs-extra';

const app = express();
app.use(express.json());

interface ProjectConfig {
  projectName: string;
  template: string;
  variant: string;
  initGit: boolean;
  openVSCode: boolean;
}

const templatesPath = path.join(__dirname, '../templates');

app.post('/api/create-project', async (req, res) => {
  try {
    const { projectName, template, variant, initGit, openVSCode }: ProjectConfig = req.body;
    const projectPath = path.join(process.cwd(), projectName);

    // Create project directory
    await fs.ensureDir(projectPath);

    // Copy template files
    const templatePath = path.join(templatesPath, template, variant);
    await fs.copy(templatePath, projectPath);

    // Initialize git if requested
    if (initGit) {
      exec('git init', { cwd: projectPath });
    }

    // Open VS Code if requested
    if (openVSCode) {
      exec('code .', { cwd: projectPath });
    }

    res.json({ success: true, message: `Project ${projectName} created successfully` });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ success: false, message: 'Error creating project' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});