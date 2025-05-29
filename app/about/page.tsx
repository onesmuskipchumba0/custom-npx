import React from 'react';
import { FaRocket, FaCog, FaMagic, FaTerminal } from 'react-icons/fa';

function About() {
  const features = [
    {
      icon: <FaRocket className="text-3xl text-blue-600" />,
      title: "Rapid Project Setup",
      description: "Create projects instantly with your favorite frameworks and libraries with just one command."
    },
    {
      icon: <FaTerminal className="text-3xl text-blue-600" />,
      title: "CLI Integration",
      description: "Seamless command-line interface that integrates with your existing workflow."
    },
    {
      icon: <FaCog className="text-3xl text-blue-600" />,
      title: "Customizable Templates",
      description: "Choose from a variety of templates or create your own for different project types."
    },
    {
      icon: <FaMagic className="text-3xl text-blue-600" />,
      title: "Smart Configuration",
      description: "Automatically configures best practices and essential tools for your projects."
    }
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'>
      <header className='py-20 text-center px-4'>
        <div className='max-w-4xl mx-auto'>
          <h1 className='text-5xl font-bold text-gray-900 dark:text-white mb-6'>
            About <span className='text-blue-600'>Custom NPX</span>
          </h1>
          <p className='text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed'>
            Custom NPX is a powerful tool designed to revolutionize your project initialization workflow. 
            It provides developers with a simple yet efficient way to bootstrap projects with all the 
            essential configurations and dependencies pre-configured.
          </p>
          <div className='bg-blue-600 text-white inline-block px-6 py-3 rounded-full font-medium'>
            Try it now: <code className='ml-2 bg-blue-700 px-3 py-1 rounded'>create-custom</code>
          </div>
        </div>
      </header>

      <main className='container mx-auto px-4 py-12'>
        <section className='max-w-6xl mx-auto'>
          <h2 className='text-3xl font-semibold text-center mb-12 text-gray-800 dark:text-white'>
            Why Choose Custom NPX?
          </h2>
          
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {features.map((feature, index) => (
              <div
                key={index}
                className='bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300'
              >
                <div className='flex justify-center mb-4'>
                  {feature.icon}
                </div>
                <h3 className='text-xl font-semibold text-center mb-3 text-gray-800 dark:text-white'>
                  {feature.title}
                </h3>
                <p className='text-gray-600 dark:text-gray-300 text-center'>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className='max-w-4xl mx-auto mt-20 bg-white dark:bg-gray-800 rounded-xl shadow-md p-8'>
          <h2 className='text-3xl font-semibold mb-6 text-gray-800 dark:text-white'>
            How It Works
          </h2>
          <div className='space-y-6'>
            {[
              {
                step: 1,
                title: "Run the Command",
                description: "Execute npx custom-npx in your terminal to start the process."
              },
              {
                step: 2,
                title: "Select Options",
                description: "Choose your framework, configuration options, and additional features through an interactive CLI."
              },
              {
                step: 3,
                title: "Project Generation",
                description: "Custom NPX automatically sets up your project with all selected configurations and dependencies."
              },
              {
                step: 4,
                title: "Start Developing",
                description: "Your project is ready to go with all the boilerplate code and configurations in place."
              }
            ].map((item, index) => (
              <div key={index} className='flex items-start'>
                <div className='flex-shrink-0 bg-blue-100 dark:bg-blue-900 p-2 rounded-lg mr-4'>
                  <span className='text-blue-600 dark:text-blue-400 font-bold'>{item.step}</span>
                </div>
                <div>
                  <h3 className='text-lg font-medium text-gray-800 dark:text-white mb-2'>{item.title}</h3>
                  <p className='text-gray-600 dark:text-gray-300'>
                    {item.description.includes('npx custom-npx') ? (
                      <>
                        Execute <code className='bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded'>npx custom-npx</code> in your terminal to start the process.
                      </>
                    ) : (
                      item.description
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className='py-12 text-center text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 mt-12'>
        <div className='container mx-auto px-4'>
          <p className='mb-2'>&copy; {new Date().getFullYear()} Custom NPX. All rights reserved.</p>
          <p className='text-sm'>Built with ❤️ for developers</p>
        </div>
      </footer>
    </div>
  )
}

export default About;