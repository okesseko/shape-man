import React from "react";
import { useNavigate } from "react-router-dom";

const Notfound = () => {
  const navigate = useNavigate();
  return (
    <div id="layout" className="text-4xl">
      Oops, seems your missing.
      <button
        className="mt-8 rounded-lg border border-solid border-[#F1F7ED] bg-[#222] py-4 px-8"
        onClick={() => navigate("/")}
      >
        Here click me🖐
      </button>
    </div>
  );
};

export default Notfound;
