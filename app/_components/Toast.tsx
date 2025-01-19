"use client";

import { cssTransition, ToastContainer } from "react-toastify";

function Toast() {
  const contextClasses: { [key: string]: string } = {
    success: "bg-white text-black",
    error: "bg-[#d95c5c] text-white",
  };

  const fade = cssTransition({
    enter: "toast-enter",
    exit: "toast-exit",
    collapse: false,
  });

  return (
    <ToastContainer
      position="top-center"
      autoClose={5000}
      closeButton={false}
      closeOnClick={false}
      icon={false}
      limit={1}
      draggable={false}
      pauseOnHover={false}
      transition={fade}
      toastClassName={(context) =>
        contextClasses[context?.type || "default"] +
        " flex items-center justify-center rounded-xl p-3 text-sm shadow-[0_0_8px_0_rgba(0,0,0,0.4)]"
      }
      hideProgressBar={true}
    />
  );
}

export default Toast;
