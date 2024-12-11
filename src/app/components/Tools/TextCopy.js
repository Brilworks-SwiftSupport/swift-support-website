import { toast } from "react-toastify";

const CopyableText = ({ text }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    toast.success("Text copied to clipboard!", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div className="p-4 bg-white-100 rounded flex flex-col">
      <button
        onClick={handleCopy}
        className="mt-4 py-2 px-4 bg-black text-white rounded hover:bg-gray-800 transition duration-300"
      >
        Copy Output Text
      </button>
    </div>
  );
};

export default CopyableText;
