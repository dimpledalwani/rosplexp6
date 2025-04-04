import React from "react";

function Notification({ message }) {
  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
      {message}
    </div>
  );
}

export default Notification;
