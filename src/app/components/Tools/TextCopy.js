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
    <div className="bg-white-100 rounded flex flex-col">
      <button
        onClick={handleCopy}
        className="w-full mt-4 px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition duration-300 h-[60px]"
      >
        Copy Output Text
      </button>
    </div>
  );
};

export default CopyableText;
