import { ToastContainer } from "react-toastify";

function Toaster() {
  return (
    <ToastContainer
      position="bottom-left"
      autoClose={2000}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
  );
}

export default Toaster;
