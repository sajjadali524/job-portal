import React from "react";
const Loader = () => {
  return (
    <div className="flex items-center justify-center gap-2">
      <div className="w-5 h-5 rounded-full border-4 border-gray-300 border-t-purple-500 animate-spin"></div>
      <span>Please wait</span>
    </div>
  )
}

export default Loader;
