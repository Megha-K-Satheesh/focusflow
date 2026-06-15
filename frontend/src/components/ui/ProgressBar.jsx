import React from "react";

function ProgressBar({ progress, completedTasks, totalTasks }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 mb-6">

      <h2 className="text-2xl font-bold text-purple-700">
        Progress Overview
      </h2>

      <div className="flex gap-6 mt-3 text-gray-700">
        <p>Completed: {completedTasks}</p>
        <p>Total: {totalTasks}</p>
        <p>Progress: {progress}%</p>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
        <div
          className="bg-purple-600 h-3 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

    </div>
  );
}

export default React.memo(ProgressBar);
