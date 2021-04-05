interface ArtistLabelProps {
  artist: string;
  instruments: string;
}

const ArtistLabel = ({ artist, instruments }: ArtistLabelProps) => {
  const label = `${artist} - ${instruments}`;

  return (
    <div className="artist">
      <div className="artist_up">
        <img src="/media/images/arrowup.png" alt="Artist up" />
      </div>
      <div className="artist_label">
        <h4 data-index="1" data-id="28" data-title={label} className="active">
          {label}
        </h4>
      </div>
      <div className="artist_down">
        <img src="/media/images/arrowdown.png" alt="Artist down" />
      </div>
      <img src="/media/images/inst_choice-frame_left.png" alt="" />
    </div>
  );
};

export default ArtistLabel;
