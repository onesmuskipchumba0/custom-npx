"use client";
import { useState } from "react";
import { SiNextdotjs, SiVite, SiReact } from "react-icons/si";
import { FaMobileAlt } from "react-icons/fa";

const templates = [
    {
        name: "Next.js",
        description: "Build server-side rendered apps with ease.",
        icon: SiNextdotjs,
        link: "#",
    },
    {
        name: "Vite",
        description: "Start fast with modern tooling and lightning builds.",
        icon: SiVite,
        link: "#",
    },
    {
        name: "React",
        description: "Create interactive UIs with React.",
        icon: SiReact,
        link: "#",
    },
    {
        name: "React Native",
        description: "Build mobile apps with React Native.",
        icon: FaMobileAlt,
        link: "#",
    },
];

export default function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
    const [projectName, setProjectName] = useState("");
    const [initGit, setInitGit] = useState(true);
    const [openVSCode, setOpenVSCode] = useState(true);

    const openModal = (template: any) => {
        setSelectedTemplate(template);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setProjectName("");
        setInitGit(false);
        setOpenVSCode(false);
        setSelectedTemplate(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Project Name:", projectName);
        console.log("Template:", selectedTemplate?.name);
        console.log("Initialize Git:", initGit);
        console.log("Open in VS Code:", openVSCode);
        closeModal();
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-lg w-full p-6">
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
                        {/* Selected template preview */}
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
                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded font-semibold"
                            >
                                Create Project
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
