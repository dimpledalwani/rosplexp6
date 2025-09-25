import React from "react";

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white p-8">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-4 drop-shadow-sm">
          Welcome to <span className="text-indigo-600">eLibrary Hub</span>
        </h1>
        <p className="text-xl text-gray-700 mb-6">
          Discover a world of knowledge. Browse, read, and manage books all in one place.
        </p>
        <a
          href="/dashboard"
          className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-full shadow hover:bg-indigo-700 transition duration-300"
        >
          📚 Go to Dashboard
        </a>
      </div>
    </div>
  );
}

export default HomePage;
