import React from 'react';

const HomePage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-300 p-6">
            {/* Animated Headline */}
            <h2 className="text-5xl font-extrabold mb-4 text-gray-800 animate-bounce">
                Welcome to eLibrary Hub
            </h2>
            <p className="text-lg text-gray-700 mb-8 text-center max-w-2xl">
                Organize, manage, and access your library like never before. Whether you're an admin or a user, eLibrary Hub offers the best tools to keep your library efficient and accessible.
            </p>

            {/* Key Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                <div className="bg-white p-6 rounded-lg shadow-md max-w-xs text-center hover:shadow-xl transition duration-300">
                    <h3 className="text-2xl font-semibold text-gray-800">📚 10,000+ Books</h3>
                    <p className="text-gray-600">An extensive collection from various genres and authors.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md max-w-xs text-center hover:shadow-xl transition duration-300">
                    <h3 className="text-2xl font-semibold text-gray-800">👥 5,000+ Members</h3>
                    <p className="text-gray-600">Join our community of avid readers and learners.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md max-w-xs text-center hover:shadow-xl transition duration-300">
                    <h3 className="text-2xl font-semibold text-gray-800">🚀 99% Efficiency</h3>
                    <p className="text-gray-600">Manage library tasks with unparalleled speed and accuracy.</p>
                </div>
            </div>

            {/* Call to Action */}
            <a 
                href="/login" 
                className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-700 transition transform hover:scale-105"
            >
                Get Started
            </a>

            {/* Testimonial */}
            <div className="mt-12 text-center">
                <p className="italic text-gray-600">"The best library management experience I've ever had!"</p>
                <p className="font-semibold text-gray-800">- A Happy User</p>
            </div>
        </div>
    );
};

export default HomePage;
