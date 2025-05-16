
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Thong_bao_error() {
  const showToastMessage = () => {
    toast.error("them khong thanh cong", {
      position: "top-right"
    });
  };

  return (
    <div>
      <button onClick={showToastMessage}>them moi</button>
      <ToastContainer />
    </div>
  );
}

export default Thong_bao_error;