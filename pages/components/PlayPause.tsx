import { AppPlayPause } from "../../styles/AppPlayPause";

import { FiPlay, FiPause } from "react-icons/fi";

export default function PlayPause({ isPlaying, playToggle }) {
  return (
    <AppPlayPause onClick={() => playToggle(isPlaying)}>
      <button>
        {isPlaying ? (
          <FiPause fill="#fff" size={24} />
        ) : (
          <FiPlay fill="#fff" size={24} />
        )}
      </button>
    </AppPlayPause>
  );
}
