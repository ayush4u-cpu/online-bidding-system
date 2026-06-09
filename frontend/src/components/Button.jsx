import React from "react";

function Button({ color, logo, hover, text, navigate, path }) {
  return (
    <button
    onClick={() => {
        if (navigate && path) {
          navigate(path);
        }
      }}
      style={{
        backgroundColor: `${color}`,
      }}
      className={`text-white rounded-1 border-0 px-3 py-2 mx-1 btn-hover-${hover} d-flex justify-content-center w-100`}
    >
      <img src={logo} alt="" style={{ height: "25px" }} className="mx-2" />
      <div className="mx-2">{text}</div>
    </button>
  );
}

export default Button;
