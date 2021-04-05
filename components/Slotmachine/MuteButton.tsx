interface MuteButtonProps {
  onClick?: () => void;
  muted?: boolean;
}
const MuteButton = ({ muted }: MuteButtonProps) => {
  return (
    <button className="track_mute">
      <img
        className={muted ? "track_is-muted" : ""}
        src="/media/images/mute.png"
        alt="Mute track"
      />
    </button>
  );
};

export default MuteButton;
