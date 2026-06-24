import { useEffect, useRef, useState } from "react";
import "./FullLetter.css";

export default function LetterGlassPage() {


  const signatureRef = useRef(null);
  const audioRef = useRef(null);

  const [fadeOut, setFadeOut] = useState(false);


  /* ✨ Signature Reveal */
  useEffect(() => {

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("signature-visible");
        }
      },
      { threshold: 0.6 }
    );

    if (signatureRef.current) {
      observer.observe(signatureRef.current);
    }

    return () => observer.disconnect();

  }, []);



  /* 🎵 Cinematic Audio */
 useEffect(() => {
  const audio = audioRef.current;
  if (!audio) return;

  let unlockHandler;

  const tryPlay = async () => {
    try {
      audio.playbackRate = 0.92;
      await audio.play();
    } catch {
      unlockHandler = () => {
        audio.play().catch(() => {});
        window.removeEventListener("pointerdown", unlockHandler);
      };

      window.addEventListener("pointerdown", unlockHandler);
    }
  };

  tryPlay();

  return () => {
    audio.pause();
    audio.currentTime = 0;

    if (unlockHandler) {
      window.removeEventListener("pointerdown", unlockHandler);
    }
  };
}, []);

  /* 🌙 CTA Click → Fade → Navigate */
  


  return (
    <div className={`glass-page ${fadeOut ? "page-fade-out" : ""}`}>

      {/* 🎵 Music */}


      <div className="glass-wrapper">
        <div className="glass-letter">

          <h1 className="letter-title">
            Birthday Wishes for Kavineyyy
          </h1>

          <div className="letter-body">

           <p>Happy Birthday Kavineyyy , my biggest blessing, and one of the most important people in my life. ❤️</p>
<p>
I honestly don’t know where I’d be without you. Thank you for always standing by me through every laugh, every tear, every success, and every difficult moment. You’ve been my safe place, my biggest supporter, and the person who understands me even when I don’t have the right words.
</p>
<p>
Life has given us so many beautiful memories together, and I cherish every single one of them. No matter how busy life gets or where it takes us, I hope we always stay this close. Your friendship is something I’ll never take for granted.
</p>
<p>
You have such a beautiful heart, and you deserve all the happiness, love, success, and peace this world has to offer. I pray that this new year of your life brings you countless reasons to smile, endless opportunities, good health, unforgettable adventures, and all your dreams coming true. May every challenge make you stronger, every blessing make you grateful, and every day remind you of how amazing you truly are.
</p>
<p>
Thank you for being the incredible person you are. Thank you for believing in me, encouraging me, and making even ordinary days feel special. I’m so lucky to call you my best friend, and I promise to always be there for you just like you’ve always been there for me.
</p>
<p>
May this birthday be as wonderful, kind, and unforgettable as you are. Here’s to many more birthdays, crazy memories, late-night conversations, endless laughter, and a lifetime of friendship together.
</p>
<p>
Happy Birthday once again Kavineyyy,,,!!! I hope today is everything you’ve wished for and so much more. Have the most amazing year ahead! 🎉🎂🥳❤️</p>

<p ref={signatureRef} className="signature">
  Once again, Happy Birthday Kavin! 🎉🎂🥳
  
</p>
            

          </div>
        </div>
      </div>
    </div>
  );
}
