import { useState, useEffect, useRef } from "react";
import "./HeartParachute.css";
import { useNavigate } from "react-router-dom";
import parachuteHeart from "./heartpara.png";
import bgMusic from "./bgsong.mp3";
// Polaroid images
import img1 from "./1.jpeg";
import img2 from "./2.jpeg";
import img3 from "./3.jpeg";
import img4 from "./4.jpeg";
import img5 from "./5.jpeg";
import img6 from "./6.jpeg"; 


const FirstPage = () => {
  const [opened, setOpened] = useState(false); // 🎁 gate
  const [openLetter, setOpenLetter] = useState(false);
  const audioRef = useRef(null);

  /* 🎈 Mouse parallax (only after reveal) */
  useEffect(() => {
    if (!opened) return;

    const handleMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;

      document.documentElement.style.setProperty("--mx", `${x}px`);
      document.documentElement.style.setProperty("--my", `${y}px`);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [opened]);
const navigate = useNavigate();

  /* 🎵 Start music on gift open (browser-safe) */
  const openGift = () => {
    setOpened(true);

    if (audioRef.current) {
      audioRef.current.volume = 0.65;
      audioRef.current.muted = false;
      audioRef.current.play().catch(() => {});
    }
  };

  return (
    <div className="mail-page">
      {/* 🎵 Background music */}
      <audio ref={audioRef} src={bgMusic} loop />

      {/* 🎁 GIFT GATE */}
      {!opened && (
        <div className="gift-backdrop">
          <div className="gift-box" onClick={openGift}>
            <div className="gift-icon">🎁</div>
            <p className="gift-text">Tap to open</p>
          </div>
        </div>
      )}

      {/* EVERYTHING BELOW IS HIDDEN UNTIL GIFT OPENS */}
      {opened && (
        <>
          <div className="particles" />

          {/* 🖼️ Polaroid wall */}
          <div className={`polaroid-wall ${openLetter ? "paused" : ""}`}>
            <div className="string row row-1">
              <div className="polaroid"><img src={img1} alt="" /></div>
              <div className="polaroid"><img src={img3} alt="" /></div>
              <div className="polaroid"><img src={img2} alt="" /></div>
            </div>

            <div className="string row row-2">
              <div className="polaroid"><img src={img4} alt="" /></div>
              <div className="polaroid"><img src={img5} alt="" /></div>
              <div className="polaroid"><img src={img6} alt="" /></div>
              
            </div>
          </div>

          {/* 💌 Center */}
          <div className="mail-content">
            <div className="center-highlight">
              <div
                className="heart-balloon clickable"
                onClick={() => setOpenLetter(true)}
              >
                <img src={parachuteHeart} alt="" className="parachute-heart" />
                <div className="balloon-hint">This heart is carrying a secret…</div>
              </div>

              <h1 className="mail-text">
                Hey Kavin,
                <br />
                <span className="sub-line">Happie-Jappie Birthdayyyyy !</span>
              </h1>
            </div>
          </div>
        </>
      )}

      {/* 💖 Letter Modal */}
      {openLetter && (
        <div className="modal-backdrop" onClick={() => setOpenLetter(false)}>
          <div
            className="letter-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Kavin,</h2>
            <p>
              Happy Birthday to the most amazing person I know! 🎉🎂 I hope your day is filled with love, laughter, and all the things that make you happiest. You deserve nothing but the best today and always. May this year bring you closer to your dreams and fill your life with endless joy. 💖
              And there is something special waiting for you in the next page, just click the button below to see it! 🌟
            </p>
            <p className="signature_a">— Yours, Eruma 💗</p>
            <button
  onClick={() => {
    setOpenLetter(false);
    navigate("/letter");
  }}
>
  Lezz Go
</button>

          </div>
        </div>
      )}
    </div>
  );
};

export default FirstPage;
