import React from "react";

function Recommendations() {
  const recommendedBooks = ["The Alchemist", "Atomic Habits", "Sapiens"];

  return (
    <div className="p-6 bg-white rounded shadow">
      <h3 className="text-2xl font-semibold mb-4">Recommended Books</h3>
      <ul className="space-y-2">
        {recommendedBooks.map((book, index) => (
          <li key={index} className="text-gray-700">{book}</li>
        ))}
      </ul>
    </div>
  );
}

export default Recommendations;
