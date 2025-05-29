"use client";
import { useState } from "react";
import { SiNextdotjs, SiVite, SiReact } from "react-icons/si";
import { FaMobileAlt, FaGithub, FaCode } from "react-icons/fa";
import { FiLoader, FiCheck, FiX, FiGitBranch, FiFolder } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const templates = [
    {
        name: "Next.js",
        description: "Build server-side rendered apps with ease.",
        icon: SiNextdotjs,
        color: "from-gray-900 to-black",
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
>>>>>>> backend
    },
    {
        name: "Vite",
        description: "Start fast with modern tooling and lightning builds.",
        icon: SiVite,
        color: "from-purple-600 to-blue-600",
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
>>>>>>> backend
    },
    {
        name: "React Native",
        description: "Build mobile apps with React Native.",
        icon: FaMobileAlt,
        color: "from-blue-500 to-cyan-500",
        variants: [
            {
                name: "React Native",
                description: "Universal React Native project with Expo",
                templatePath: "react-native-template",
            },
        ],
    },
];

export default function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
    const [selectedVariant, setSelectedVariant] = useState<any>(null);
    const [projectName, setProjectName] = useState("");
    const [initGit, setInitGit] = useState(true);
    const [openVSCode, setOpenVSCode] = useState(true);
    const [selectedVariant, setSelectedVariant] = useState<any>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [status, setStatus] = useState<string>("");

    const openModal = (template: any) => {
        setSelectedTemplate(template);
        setSelectedVariant(template.variants[0]);
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

    const handleSubmit = async () => {
        if (!projectName.trim()) return;
        
        setIsCreating(true);
        setStatus("Creating project...");

        try {
            const apiUrl = 'http://localhost:3001';
            
            try {
                await fetch(`${apiUrl}/health`);
            } catch (error) {
                throw new Error('API server is not running. Please start the API server first.');
            }

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

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    };

    const modalVariants = {
        hidden: { 
            opacity: 0, 
            scale: 0.8,
            y: 50
        },
        visible: { 
            opacity: 1, 
            scale: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 20
            }
        },
        exit: { 
            opacity: 0, 
            scale: 0.8,
            y: 50,
            transition: {
                duration: 0.2
            }
        }
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div 
                        className="absolute -top-4 -right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 dark:opacity-20"
                        animate={{ 
                            x: [0, 100, 0],
                            y: [0, -100, 0],
                        }}
                        transition={{ 
                            duration: 20,
                            repeat: Infinity,
                            repeatType: "reverse"
                        }}
                    />
                    <motion.div 
                        className="absolute -bottom-4 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 dark:opacity-20"
                        animate={{ 
                            x: [0, -100, 0],
                            y: [0, 100, 0],
                        }}
                        transition={{ 
                            duration: 25,
                            repeat: Infinity,
                            repeatType: "reverse"
                        }}
                    />
                </div>

                <motion.header 
                    className="py-16 text-center relative z-10"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ 
                            type: "spring",
                            stiffness: 100,
                            delay: 0.2
                        }}
                    >
                        <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                            Custom NPX
                        </h1>
                        <motion.div
                            className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: 96 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        />
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                            Quickly create your projects with your favorite frameworks using beautiful, modern templates.
                        </p>
                    </motion.div>
                </motion.header>

                <main className="container mx-auto px-4 py-8 relative z-10">
                    <motion.div 
                        className="flex flex-col md:flex-row lg:flex-row gap-8 justify-center items-center w-full"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {templates.map((template, index) => {
                            const Icon = template.icon;
                            return (
                                <motion.div
                                    key={template.name}
                                    variants={itemVariants}
                                    whileHover={{ 
                                        y: -10,
                                        transition: { type: "spring", stiffness: 400 }
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => openModal(template)}
                                    className="cursor-pointer group relative overflow-hidden"
                                >
                                    <div className="bg-white/80 backdrop-blur-lg dark:bg-gray-800/80 rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/50 p-8 transform transition-all duration-300 hover:shadow-2xl hover:border-blue-500/30 min-h-[280px] w-80">
                                        {/* Gradient overlay */}
                                        <div className={`absolute inset-0 bg-gradient-to-br ${template.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`} />
                                        
                                        <motion.div 
                                            className="flex justify-center mb-6"
                                            whileHover={{ rotate: [0, -10, 10, 0] }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <div className="p-4 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 group-hover:from-blue-100 group-hover:to-indigo-100 dark:group-hover:from-gray-600 dark:group-hover:to-gray-500 transition-all duration-300">
                                                <Icon size={48} className="text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                                            </div>
                                        </motion.div>
                                        
                                        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 text-center mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                                            {template.name}
                                        </h3>
                                        
                                        <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                                            {template.description}
                                        </p>

                                        <motion.div 
                                            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            initial={{ y: 10 }}
                                            whileHover={{ y: 0 }}
                                        >
                                            <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                                                {template.variants.length} variant{template.variants.length > 1 ? 's' : ''} available
                                            </div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </main>

                <motion.footer 
                    className="py-8 text-center text-gray-500 dark:text-gray-400 relative z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                >
                    &copy; {new Date().getFullYear()} Custom NPX. All rights reserved.
                </motion.footer>
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <>
                        {/* Background overlay */}
                        <motion.div 
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeModal}
                        />
                        
                        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                            <motion.div 
                                className="bg-white/95 backdrop-blur-xl dark:bg-gray-800/95 rounded-3xl shadow-2xl max-w-2xl w-full p-8 border border-white/20 dark:border-gray-700/50"
                                variants={modalVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">
                                    <motion.h2 
                                        className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        {selectedTemplate?.name} Setup
                                    </motion.h2>
                                    <motion.button
                                        onClick={closeModal}
                                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <FiX size={24} className="text-gray-600 dark:text-gray-300" />
                                    </motion.button>
                                </div>

                                {selectedTemplate && (
                                    <motion.div 
                                        className="flex items-center space-x-6 mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-2xl border border-blue-100 dark:border-gray-600"
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <motion.div 
                                            className="p-4 rounded-2xl bg-white dark:bg-gray-800 shadow-lg"
                                            whileHover={{ rotate: [0, -5, 5, 0] }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <selectedTemplate.icon size={40} className="text-blue-600 dark:text-blue-400" />
                                        </motion.div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                                                {selectedTemplate.name}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-300 text-sm">
                                                {selectedTemplate.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}

                                <div className="space-y-6">
                                    <motion.div
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-2 font-medium">
                                            <FiFolder className="text-blue-500" />
                                            Project Name
                                        </label>
                                        <input
                                            type="text"
                                            value={projectName}
                                            onChange={(e) => setProjectName(e.target.value)}
                                            placeholder="my-awesome-project"
                                            className="w-full px-4 py-3 text-gray-700 dark:text-gray-300 bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 backdrop-blur-sm"
                                            required
                                        />
                                    </motion.div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <motion.div
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: 0.4 }}
                                        >
                                            <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                                                Framework
                                            </label>
                                            <select
                                                value={selectedTemplate?.name}
                                                onChange={(e) =>
                                                    setSelectedTemplate(
                                                        templates.find((t) => t.name === e.target.value)
                                                    )
                                                }
                                                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 bg-white/50 dark:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 backdrop-blur-sm"
                                            >
                                                {templates.map((template) => (
                                                    <option key={template.name} value={template.name}>
                                                        {template.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </motion.div>

                                        <motion.div
                                            initial={{ x: 20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: 0.5 }}
                                        >
                                            <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                                                Template Variant
                                            </label>
                                            <select
                                                value={selectedVariant?.name}
                                                onChange={(e) => {
                                                    const variant = selectedTemplate.variants.find(
                                                        (v: any) => v.name === e.target.value
                                                    );
                                                    setSelectedVariant(variant);
                                                }}
                                                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 bg-white/50 dark:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 backdrop-blur-sm"
                                            >
                                                {selectedTemplate?.variants.map((variant: any) => (
                                                    <option key={variant.name} value={variant.name}>
                                                        {variant.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </motion.div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <motion.div 
                                            className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 flex-1"
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.6 }}
                                            whileHover={{ scale: 1.02 }}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={initGit}
                                                onChange={(e) => setInitGit(e.target.checked)}
                                                id="initGit"
                                                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                                            />
                                            <label htmlFor="initGit" className="flex items-center gap-2 text-gray-700 dark:text-gray-300 cursor-pointer">
                                                <FiGitBranch className="text-orange-500" />
                                                Initialize Git repository
                                            </label>
                                        </motion.div>

                                        <motion.div 
                                            className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 flex-1"
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.7 }}
                                            whileHover={{ scale: 1.02 }}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={openVSCode}
                                                onChange={(e) => setOpenVSCode(e.target.checked)}
                                                id="openVSCode"
                                                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                                            />
                                            <label htmlFor="openVSCode" className="flex items-center gap-2 text-gray-700 dark:text-gray-300 cursor-pointer">
                                                <FaCode className="text-blue-500" />
                                                Open in VS Code
                                            </label>
                                        </motion.div>
                                    </div>

                                    <motion.div 
                                        className="relative"
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.8 }}
                                    >
                                        <motion.button
                                            type="button"
                                            onClick={handleSubmit}
                                            disabled={isCreating}
                                            className={`w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl ${
                                                isCreating ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02]'
                                            }`}
                                            whileHover={!isCreating ? { scale: 1.02 } : {}}
                                            whileTap={!isCreating ? { scale: 0.98 } : {}}
                                        >
                                            {isCreating ? (
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                >
                                                    <FiLoader size={20} />
                                                </motion.div>
                                            ) : (
                                                <FiCheck size={20} />
                                            )}
                                            {isCreating ? 'Creating Project...' : 'Create Project'}
                                        </motion.button>

                                        <AnimatePresence>
                                            {status && (
                                                <motion.div 
                                                    className={`mt-4 text-center p-3 rounded-xl font-medium ${
                                                        status.includes('Error') 
                                                            ? 'text-red-600 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800' 
                                                            : status.includes('successfully') 
                                                                ? 'text-green-600 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
                                                                : 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
                                                    }`}
                                                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: -10, scale: 0.9 }}
                                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                                >
                                                    {status}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}