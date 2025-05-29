"use client";
import { useState } from "react";
import { SiNextdotjs, SiVite, SiReact } from "react-icons/si";
import { FaMobileAlt } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";

const templates = [
    {
        name: "Next.js",
        description: "Build server-side rendered apps with ease.",
        icon: SiNextdotjs,
        variants: [
            {
                name: "Next.js (JavaScript)",
                description: "Next.js project with JavaScript configuration",
                templatePath: "next.js/javascript/next.js-javascript",
            },
            {
                name: "Next.js (TypeScript)",
                description: "Next.js project with TypeScript configuration",
                templatePath: "next.js/typescript/next.js-typescript",
            },
        ],
    },
    {
        name: "Vite",
        description: "Start fast with modern tooling and lightning builds.",
        icon: SiVite,
        variants: [
            {
                name: "Vite + React (JavaScript)",
                description: "Vite project with React and JavaScript",
                templatePath: "vite/react-js",
            },
            {
                name: "Vite + React (TypeScript)",
                description: "Vite project with React and TypeScript",
                templatePath: "vite/react-ts",
            },
            {
                name: "Vite + Vue (JavaScript)",
                description: "Vite project with Vue.js and JavaScript",
                templatePath: "vite/vue-js",
            },
            {
                name: "Vite + Vue (TypeScript)",
                description: "Vite project with Vue.js and TypeScript",
                templatePath: "vite/vue-ts",
            },
        ],
    },
    {
        name: "React Native",
        description: "Build mobile apps with React Native.",
        icon: FaMobileAlt,
        variants: [
            {
                name: "React Native",
                description: "Universal React Native project with Expo",
                templatePath: "react-native-template", // Updated to match the actual folder name
            },
        ],
    },
];

export default function Home() {
    // Checkboxes default to true
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
    const [projectName, setProjectName] = useState("");
    const [initGit, setInitGit] = useState(true);
    const [openVSCode, setOpenVSCode] = useState(true);
    const [selectedVariant, setSelectedVariant] = useState<any>(null); // New state for selected variant
    const [isCreating, setIsCreating] = useState(false);
    const [status, setStatus] = useState<string>("");

    const openModal = (template: any) => {
        setSelectedTemplate(template);
        setSelectedVariant(template.variants[0]); // Set first variant as default
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setProjectName("");
        setInitGit(true);
        setOpenVSCode(true);
        setSelectedTemplate(null);
        setSelectedVariant(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsCreating(true);
        setStatus("Creating project...");

        try {
            // First check if the API is available
            const apiUrl = 'http://localhost:3001';
            
            try {
                await fetch(`${apiUrl}/health`);
            } catch (error) {
                throw new Error('API server is not running. Please start the API server first.');
            }

            // Validate project name
            if (!projectName.match(/^[a-zA-Z0-9-_]+$/)) {
                throw new Error("Project name can only contain letters, numbers, hyphens and underscores");
            }

            setStatus("Setting up project structure...");
            const response = await fetch(`${apiUrl}/api/create-project`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    projectName,
                    templatePath: selectedVariant?.templatePath,
                    initGit,
                    openVSCode,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                throw new Error(errorData?.message || 'Failed to create project');
            }

            const data = await response.json();
            
            if (data.success) {
                setStatus("Project created successfully!");
                setTimeout(() => {
                    closeModal();
                }, 1500);
            } else {
                throw new Error(data.message || "Failed to create project");
            }
        } catch (error: any) {
            console.error('Error:', error);
            setStatus(`Error: ${error.message}`);
            setTimeout(() => {
                setStatus("");
            }, 3000);
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <>
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
                <header className="py-16 text-center">
                    <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-4">
                        Welcome to Custom NPX
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Quickly create your projects with your favorite frameworks.
                    </p>
                </header>
                <main className="container mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row lg:flex-row gap-8 justify-center items-center w-full">
                        {templates.map((template) => {
                            const Icon = template.icon;
                            return (
                                <div
                                    key={template.name}
                                    onClick={() => openModal(template)}
                                    className="cursor-pointer bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-blue-500"
                                >
                                    <div className="flex justify-center mb-4">
                                        <Icon size={64} className="text-blue-500" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 text-center">
                                        {template.name}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 text-center">
                                        {template.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </main>
                <footer className="py-8 text-center text-gray-500 dark:text-gray-400">
                    &copy; {new Date().getFullYear()} Custom NPX. All rights reserved.
                </footer>
            </div>

            {isModalOpen && (
                <>
                    {/* Background overlay */}
                    <div className="fixed inset-0 bg-black opacity-40 z-40 pointer-events-none"></div>
                    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-lg w-full p-6 pointer-events-auto relative">
                            <div className="flex justify-between items-center border-b pb-3 mb-4">
                                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                                    {selectedTemplate?.name} Setup
                                </h2>
                                <button
                                    onClick={closeModal}
                                    className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition text-2xl leading-none"
                                >
                                    &times;
                                </button>
                            </div>
                            {selectedTemplate && (
                                <div className="flex items-center space-x-4 mb-6 p-4 bg-gray-50 dark:bg-gray-600 rounded">
                                    <div className="p-3 rounded-full bg-blue-100">
                                        <selectedTemplate.icon size={36} className="text-blue-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                                            {selectedTemplate.name}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                                            {selectedTemplate.description}
                                        </p>
                                    </div>
                                </div>
                            )}
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label className="block text-gray-700 dark:text-gray-300 mb-1">
                                        Project Name
                                    </label>
                                    <input
                                        type="text"
                                        value={projectName}
                                        onChange={(e) => setProjectName(e.target.value)}
                                        placeholder="Enter project name"
                                        className="w-full px-4 py-2 text-gray-700 dark:text-gray-300 border rounded focus:outline-none focus:border-blue-500 transition"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 dark:text-gray-300 mb-1">
                                        Available Templates
                                    </label>
                                    <select
                                        value={selectedTemplate?.name}
                                        onChange={(e) =>
                                            setSelectedTemplate(
                                                templates.find((t) => t.name === e.target.value)
                                            )
                                        }
                                        className="w-full px-4 py-2 border rounded text-gray-700 dark:text-gray-300 focus:outline-none focus:border-blue-500 transition"
                                    >
                                        {templates.map((template) => (
                                            <option key={template.name} value={template.name}>
                                                {template.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-700 dark:text-gray-300 mb-1">
                                        Available Variants
                                    </label>
                                    <select
                                        value={selectedVariant?.name}
                                        onChange={(e) => {
                                            const variant = selectedTemplate.variants.find(
                                                (v: any) => v.name === e.target.value
                                            );
                                            setSelectedVariant(variant);
                                        }}
                                        className="w-full px-4 py-2 border rounded text-gray-700 dark:text-gray-300 focus:outline-none focus:border-blue-500 transition"
                                    >
                                        {selectedTemplate?.variants.map((variant: any) => (
                                            <option key={variant.name} value={variant.name}>
                                                {variant.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={initGit}
                                        onChange={(e) => setInitGit(e.target.checked)}
                                        id="initGit"
                                        className="mr-2 h-4 w-4"
                                    />
                                    <label htmlFor="initGit" className="text-gray-700 dark:text-gray-300">
                                        Initialize Git repository
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={openVSCode}
                                        onChange={(e) => setOpenVSCode(e.target.checked)}
                                        id="openVSCode"
                                        className="mr-2 h-4 w-4"
                                    />
                                    <label htmlFor="openVSCode" className="text-gray-700 dark:text-gray-300">
                                        Open in VS Code after creation
                                    </label>
                                </div>
                                <div className="relative">
                                    <button
                                        type="submit"
                                        disabled={isCreating}
                                        className={`w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded font-semibold ${
                                            isCreating ? 'opacity-70 cursor-not-allowed' : ''
                                        }`}
                                    >
                                        {isCreating && <FiLoader className="animate-spin" />}
                                        {isCreating ? 'Creating Project...' : 'Create Project'}
                                    </button>

                                    {status && (
                                        <div className={`mt-3 text-center text-sm ${
                                            status.includes('Error') 
                                                ? 'text-red-500' 
                                                : status.includes('successfully') 
                                                    ? 'text-green-500' 
                                                    : 'text-blue-500'
                                        }`}>
                                            {status}
                                        </div>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
