import PropTypes from "prop-types";

export default function Modal({ title, message, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full mx-4">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">{title}</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
            onClick={onClose}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}


Modal.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};