import Modal from "react-modal";
import YouTubePlayer from "./YoutubePlayer";

Modal.setAppElement("#root");

export const TrailerModal = ({
  isOpen,
  videoKey,
  isLoadingTrailer,
  errorTrailer,
  closeModal,
}) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={closeModal}
    className="modal-content"
    overlayClassName="modal-overlay"
  >
    {isLoadingTrailer ? (
      <div>
        <h6>Loading trailer...</h6>
      </div>
    ) : errorTrailer ? (
      <div style={{ padding: "30px", textAlign: "center" }}>
        <h6>{errorTrailer}</h6>
      </div>
    ) : videoKey ? (
      <YouTubePlayer videoKey={videoKey} />
    ) : (
      <div style={{ padding: "30px" }}>
        <h6>No trailer available. Try another movie.</h6>
      </div>
    )}
    <button className="close-modal" onClick={closeModal}>
      ✖
    </button>
  </Modal>
);

export default TrailerModal;
