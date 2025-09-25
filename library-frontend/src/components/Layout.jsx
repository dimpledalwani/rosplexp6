import React from "react";

const Layout = ({ children }) => {
    return (
        <>
            <nav className="bg-gray-800 p-4 text-white shadow-lg">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-xl font-bold">Library Management System</h1>
                    <ul className="flex space-x-6">
                        <li className="hover:text-gray-300"><a href="/">Home</a></li>
                        <li className="hover:text-gray-300"><a href="/login">Login</a></li>
                        <li className="hover:text-gray-300"><a href="/register">Register</a></li>
                        <li className="hover:text-gray-300"><a href="/user">User Dashboard</a></li>
                        <li className="hover:text-gray-300"><a href="/admin">Admin Dashboard</a></li>
                        <li className="hover:text-gray-300"><a href="/logout">Logout</a></li>
                    </ul>
                </div>
            </nav>
            <main className="p-6 bg-gray-100 min-h-screen">
                {children}
            </main>
        </>
    );
};

export default Layout;