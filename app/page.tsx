import Navbar from "../components/Navbar";
import { SiNextdotjs, SiVite, SiReact } from "react-icons/si";
import { FaMobileAlt } from "react-icons/fa";

const templates = [
	{
		name: "Next.js",
		description: "Build server-side rendered apps with ease.",
		icon: SiNextdotjs,
		link: "#", // Update with your creation logic
	},
	{
		name: "Vite",
		description: "Start fast with modern tooling and lightning builds.",
		icon: SiVite,
		link: "#", // Update with your creation logic
	},
	{
		name: "React",
		description: "Create interactive UIs with React.",
		icon: SiReact,
		link: "#", // Update with your creation logic
	},
	{
		name: "React Native",
		description: "Build mobile apps with React Native.",
		icon: FaMobileAlt,
		link: "#", // Update with your creation logic
	},
];

export default function Home() {
	return (
		<>
			<div className="min-h-screen bg-gray-50 dark:bg-gray-900">
				<header className="py-16 text-center">
					<h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
						Welcome to Custom NPX
					</h1>
					<p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
						Quickly create your projects with your favorite frameworks.
					</p>
				</header>
				<main className="container mx-auto px-4 py-8">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 ml-12 mr-12">
						{templates.map((template) => {
							const Icon = template.icon;
							return (
								<a
									key={template.name}
									href={template.link}
									className="block bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6 transform transition duration-300 hover:scale-105 hover:shadow-xl hover:border-blue-400"
								>
									<div className="flex justify-center mb-4">
										<Icon size={64} className="dark:invert" />
									</div>
									<h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2 text-center">
										{template.name}
									</h3>
									<p className="text-gray-600 dark:text-gray-300 text-center">
										{template.description}
									</p>
								</a>
							);
						})}
					</div>
				</main>
				<footer className="py-8 text-center text-gray-500 dark:text-gray-400">
					&copy; {new Date().getFullYear()} Custom NPX. All rights reserved.
				</footer>
			</div>
		</>
	);
}
