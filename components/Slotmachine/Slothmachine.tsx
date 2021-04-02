const Slotmachine = () => {
  return (
    <div className="inline main_windows">
      <div
        className="foto"
        id="machine1"
        data-id="1"
        style={{ overflow: "hidden" }}
      />
      <div
        className="foto"
        id="machine2"
        data-id="2"
        style={{ overflow: "hidden" }}
      />
      <div
        className="foto"
        id="machine3"
        data-id="3"
        style={{ overflow: "hidden" }}
      />
      <img className="img_frame" src="/media/images/photo-frame.png" alt="" />

      <div className="main_songtitle">
        <div className="tracks">
          <div className="track_title inline ">
            <div id="track-0">forward</div>
            <img
              className="mute"
              data-id="1"
              src="../media/images/mute.png"
              alt=""
            />
          </div>
          <div className="track_title inline">
            <div id="track-1">sea</div>
            <img
              className="mute"
              data-id="2"
              src="../media/images/mute.png"
              alt=""
            />
          </div>
          <div className="track_title inline">
            <div id="track-2">vhf</div>
            <img
              className="mute"
              data-id="3"
              src="../media/images/mute.png"
              alt=""
            />
          </div>
        </div>
        <img src="/media/images/songtitle-frame.png" />
      </div>
    </div>
  );
};

export default Slotmachine;
