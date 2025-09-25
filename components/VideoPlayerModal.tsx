import React from 'react';

interface VideoPlayerModalProps {
  videoId: string;
  onClose: () => void;
}

const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({ videoId, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-center p-4 modal-overlay"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="modal-content w-full max-w-3xl bg-black rounded-xl shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 text-white bg-gray-800 hover:bg-gray-700 transition-colors w-10 h-10 flex items-center justify-center rounded-full focus:outline-none ring-2 ring-white shadow-lg"
          aria-label="Close video player"
        >
          <i className="fas fa-times text-xl"></i>
        </button>
      </div>
    </div>
  );
};

export default VideoPlayerModal;