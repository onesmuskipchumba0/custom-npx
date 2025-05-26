import React from 'react'

function About() {
  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-gray-300'>
        <header className='py-16 text-center'>
            <h1 className='text-5xl font-bold text-gray-900 dark:text-white mb-4'>
            About Custom NPX
            </h1>
            <p className='text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto'>
            Custom NPX is a tool designed to streamline the process of creating new projects with your favorite frameworks. It provides a simple and efficient way to kickstart your development workflow.
            </p>
        </header>
        <main className='container mx-auto px-4 py-8'>
            <section className='max-w-2xl mx-auto'>
            <h2 className='text-3xl font-semibold mb-4'>Features</h2>
            <ul className='list-disc list-inside space-y-2'>
                <li>Quickly create projects with popular frameworks</li>
                <li>Easy to use command-line interface</li>
                <li>Customizable templates for different project types</li>
            </ul>
            </section>
        </main>
        <footer className='py-8 text-center text-gray-500 dark:text-gray-400'>
            &copy; {new Date().getFullYear()} Custom NPX. All rights reserved.
        </footer>
    </div>
  )
}

export default About
