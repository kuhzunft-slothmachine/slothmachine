import ArtistLabel from "./ArtistLabel";
import MuteButton from './MuteButton';

const Slotmachine = () => {
  return (
    <div className="slotmachine">
      <div className="slots">
        <div className="slots_photos">
          <div className="slot_photo" />
          <div className="slot_photo" />
          <div className="slot_photo" />
        </div>
        <div className="slots_frame">
          <img src="/media/images/photo-frame.png" alt="Slotmachine Frame" />
        </div>
      </div>

      <div className="tracks">
        <div className="track">
          <div className="track_title" id="track-0">forward</div>
          <MuteButton muted />
        </div>
        <div className="track">
          <div className="track_title" id="track-1">sea</div>
          <MuteButton />
        </div>
        <div className="track">
          <div className="track_title" id="track-2">vhf</div>
          <MuteButton />
        </div>
      </div>

      <div className="artists">
        <ArtistLabel artist="achim zepi" instruments="drumcomputer" />
        <ArtistLabel artist="achim zepi" instruments="drumcomputer" />
        <ArtistLabel artist="achim zepi" instruments="drumcomputer" />
      </div>
    </div>
  );
};

export default Slotmachine;
