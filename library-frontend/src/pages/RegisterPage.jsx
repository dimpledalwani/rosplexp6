import React from 'react';

const RegisterPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-300 p-6">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Register for eLibrary Hub</h2>
                <form>
                    <label className="block mb-2 text-gray-700">Full Name</label>
                    <input
                        type="text"
                        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Your full name"
                    />
                    <label className="block mb-2 text-gray-700">Username</label>
                    <input
                        type="text"
                        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Choose a username"
                    />
                    <label className="block mb-2 text-gray-700">Password</label>
                    <input
                        type="password"
                        className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Create a password"
                    />
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
