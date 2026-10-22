import React, { useState, useEffect } from "react";
import { getGuestDisplayName } from "../guest";
import { GoldSprig, LotusBud, LotusDivider, LotusFlower, LotusIcon, LotusLeaf } from "./LotusArt";

export function EnvelopeOpening({ onComplete, onMusicStart }: { onComplete: () => void, onMusicStart?: () => void }) {
  const [opened, setOpened] = useState(false);

  const guestName = getGuestDisplayName();

  useEffect(() => {
    if (opened) {
      if (onMusicStart) onMusicStart();
      const timer = setTimeout(() => {
        onComplete();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [opened, onComplete, onMusicStart]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Pinyon+Script&family=Montserrat:wght@300;400;500&display=swap');

        * {
          box-sizing: border-box;
        }

        html, body, #root {
          width: 100%;
          min-height: 100%;
          margin: 0;
          background: #FAF9F6;
        }

        .scene {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px 20px 80px;
          background: radial-gradient(ellipse at 30% 20%, #FFFFFF 0%, #FAF9F6 40%, #EAE3D2 100%);
          perspective: 1500px;
          overflow: hidden;
          font-family: "Cormorant Garamond", serif;
        }

        /* Ambient floating orbs */
        .scene::before,
        .scene::after {
          content: '';
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(80px);
        }
        .scene::before {
          width: 400px;
          height: 400px;
          top: -100px;
          right: -100px;
          background: radial-gradient(circle, rgba(233,163,172,0.25) 0%, transparent 70%);
        }
        .scene::after {
          width: 300px;
          height: 300px;
          bottom: -80px;
          left: -80px;
          background: radial-gradient(circle, rgba(194,154,75,0.2) 0%, transparent 70%);
        }

        /* 2:3 card, sized to fit both width and height of the screen */
        .envelope-container {
          position: relative;
          width: min(460px, calc(100vw - 40px), calc(82vh * 2 / 3));
          aspect-ratio: 2 / 3;
          cursor: pointer;
          transition: transform 0.6s ease;
          transform-style: preserve-3d;
        }

        .envelope-container:not(.is-open):hover {
          transform: scale(1.02);
        }

        /* Envelope Back Base */
        .envelope-base {
          position: absolute;
          inset: 0;
          background: linear-gradient(145deg, #722F37, #3B1C22);
          border-radius: 6px;
          box-shadow: 0 30px 60px -15px rgba(59,28,34,0.3), 0 0 0 1px rgba(212,175,55,0.4);
          z-index: 1;
        }

        /* ---------- Lotus invitation card ---------- */
        .card-container {
          position: absolute;
          inset: 0;
          container-type: inline-size;
          border-radius: 6px;
          z-index: 2;
          overflow: hidden;
          background:
            radial-gradient(ellipse 45% 30% at 8% 12%, rgba(240,196,196,0.45), transparent 70%),
            radial-gradient(ellipse 40% 35% at 96% 45%, rgba(240,190,195,0.40), transparent 70%),
            radial-gradient(ellipse 35% 25% at 4% 62%, rgba(240,200,200,0.35), transparent 70%),
            radial-gradient(ellipse 50% 30% at 90% 95%, rgba(236,186,190,0.35), transparent 70%),
            linear-gradient(180deg, #FCF9F4 0%, #F9F3EC 100%);
          box-shadow: inset 0 0 30px rgba(194,154,75,0.12);
          transform: scale(1);
          transition: transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .envelope-container.is-open .card-container {
          transform: scale(1.03);
          z-index: 4;
        }

        .lotus-frame {
          position: absolute;
          inset: 3.2cqw;
          border: 1px solid rgba(194,154,75,0.75);
          pointer-events: none;
          z-index: 3;
        }
        .lotus-frame::before {
          content: '';
          position: absolute;
          inset: 0.9cqw;
          border: 0.5px solid rgba(194,154,75,0.5);
        }

        .lotus-art {
          position: absolute;
          pointer-events: none;
          z-index: 1;
        }
        .art-tl     { width: 46%; top: -5%;   left: -14%;  transform: rotate(-28deg); opacity: 0.45; }
        .art-sprig  { width: 18%; top: 44%;   left: -2%;   opacity: 0.8; }
        .art-leaf-l { width: 40%; bottom: -10%; left: -14%; transform: rotate(200deg); opacity: 0.8; }
        .art-lotus-r{ width: 44%; top: 30%;   right: -21%; transform: rotate(-12deg); }
        .art-bud    { width: 11%; top: 52%;   right: 2%;   }
        .art-leaf-r { width: 32%; top: 62%;   right: -18%; transform: rotate(-30deg); opacity: 0.75; }
        .art-lotus-b{ width: 46%; bottom: -4%; right: -20%; transform: rotate(-6deg); }

        .lotus-content {
          position: absolute;
          inset: 6cqw 15cqw 6cqw 15cqw;
          z-index: 4;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: #3F332D;
          font-family: "Cormorant Garamond", serif;
          font-variant-numeric: lining-nums;
        }

        .lotus-top { width: 32cqw; display: flex; align-items: center; gap: 2cqw; }
        .lotus-top span { flex: 1; height: 1px; background: linear-gradient(90deg, transparent, #C29A4B); }
        .lotus-top span:last-child { background: linear-gradient(270deg, transparent, #C29A4B); }
        .lotus-top svg { width: 11cqw; flex-shrink: 0; }

        .lotus-name {
          font-family: "Pinyon Script", cursive;
          font-size: 11.5cqw;
          line-height: 1.05;
          color: #B48A3C;
          margin: 0.6cqw 0 0.4cqw;
          font-weight: 400;
          text-shadow: 0 1px 1px rgba(180,138,60,0.15);
        }

        .lotus-caps {
          font-size: 2.5cqw;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          line-height: 1.45;
          font-weight: 500;
        }
        .lotus-parents {
          font-size: 2.9cqw;
          letter-spacing: 0.08em;
          font-weight: 600;
        }
        .lotus-with { margin: 1.6cqw 0 0.4cqw; }

        .lotus-divider { display: flex; align-items: center; gap: 1.5cqw; width: 52cqw; margin: 1cqw 0; }
        .lotus-divider span { flex: 1; height: 1px; background: rgba(194,154,75,0.7); }
        .lotus-divider-icon { width: 6cqw; flex-shrink: 0; }

        .lotus-guest {
          font-family: "Cormorant Garamond", serif;
          font-size: 3.4cqw;
          font-style: italic;
          font-weight: 600;
          color: #8A5A3A;
          letter-spacing: 0.02em;
          text-transform: none;
        }

        .lotus-month {
          font-size: 3cqw;
          letter-spacing: 0.4em;
          margin: 0.8cqw 0 0.2cqw;
          padding-left: 0.4em;
        }
        .lotus-date {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 2.5cqw;
          width: 60cqw;
        }
        .lotus-date-side {
          border-top: 1px solid rgba(63,51,45,0.55);
          border-bottom: 1px solid rgba(63,51,45,0.55);
          padding: 0.8cqw 0;
          font-size: 2.9cqw;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-weight: 500;
        }
        .lotus-day {
          font-size: 10cqw;
          line-height: 1;
          color: #B48A3C;
          font-weight: 500;
        }

        .lotus-venue {
          font-family: "Cinzel", serif;
          font-size: 4.3cqw;
          color: #B48A3C;
          letter-spacing: 0.06em;
          line-height: 1.2;
          margin-top: 0.4cqw;
        }

        .lotus-phones {
          margin-top: 2.2cqw;
          font-size: 2.7cqw;
          letter-spacing: 0.1em;
          font-weight: 600;
          line-height: 1.5;
        }

        .gap-s { margin-top: 1.2cqw; }

        /* Envelope Fold (Left Flap) */
        .flap-left {
          position: absolute;
          top: 0;
          left: 0;
          width: 66%;
          height: 100%;
          background: linear-gradient(135deg, #097969 0%, #722F37 50%, #3B1C22 100%);
          background-image: url("https://www.transparenttextures.com/patterns/cream-paper.png");
          border-right: 1px solid rgba(212,175,55,0.3);
          box-shadow: 10px 0 30px -10px rgba(59,28,34,0.2);
          transform-origin: left center;
          transform: rotateY(0deg);
          transition: transform 1.5s cubic-bezier(0.25, 1, 0.3, 1), box-shadow 1.5s ease;
          z-index: 5;
          border-top-right-radius: 2px;
          border-bottom-right-radius: 2px;
        }

        .flap-left::after {
          content: '';
          position: absolute;
          inset: 0;
          box-shadow: inset -3px 0 8px rgba(0,0,0,0.04);
          pointer-events: none;
        }

        .envelope-container.is-open .flap-left {
          transform: rotateY(-140deg);
          box-shadow: -15px 0 25px -10px rgba(0,0,0,0.15);
        }

        /* Satin Ribbon */
        .ribbon-wrap {
          position: absolute;
          top: 55%;
          transform: translateY(-50%);
          width: 100%;
          z-index: 6;
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .envelope-container.is-open .ribbon-wrap {
          opacity: 0;
          transform: translateY(-50%) scale(1.05);
          pointer-events: none;
        }

        .ribbon-band {
          width: 100%;
          height: 54px;
          background: linear-gradient(
            to bottom,
            #F0F0F0 0%,
            #FFFFFF 25%,
            #E8E8E8 50%,
            #FFFFFF 75%,
            #DCDCDC 100%
          );
          box-shadow: 0 4px 6px rgba(0,0,0,0.1), inset 0 1px rgba(255,255,255,0.5);
        }

        /* Bow Container */
        .bow-center {
          position: absolute;
          top: 27px;
          left: 55%;
          transform: translate(-50%, -50%);
          width: 160px;
          height: 100px;
        }

        /* Image Bow styling */
        .bow-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          mix-blend-mode: multiply;
          filter: drop-shadow(0 6px 8px rgba(0,0,0,0.15)) contrast(1.05);
          transform: scale(1.6);
        }

        .instruction-toast {
          position: absolute;
          bottom: -60px;
          left: 50%;
          transform: translateX(-50%);
          color: #3B1C22;
          font-family: "Montserrat", sans-serif;
          font-size: 10px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          opacity: 1;
          transition: opacity 0.5s;
          white-space: nowrap;
          font-weight: 400;
        }

        .envelope-container.is-open .instruction-toast {
          opacity: 0;
        }

        @media (max-width: 600px) {
          .bow-center {
            width: 140px;
            height: 90px;
          }
        }
      `}</style>

      <div className="scene">
        <div
          className={`envelope-container ${opened ? 'is-open' : ''}`}
          onClick={() => {
            if (!opened) setOpened(true);
          }}
        >
          {/* Base shadow behind the card */}
          <div className="envelope-base"></div>

          {/* Inner Card — lotus invitation */}
          <div className="card-container">
            <LotusFlower line className="lotus-art art-tl" />
            <GoldSprig className="lotus-art art-sprig" />
            <LotusLeaf className="lotus-art art-leaf-l" />
            <LotusFlower className="lotus-art art-lotus-r" />
            <LotusBud className="lotus-art art-bud" />
            <LotusLeaf className="lotus-art art-leaf-r" />
            <LotusFlower className="lotus-art art-lotus-b" />

            <div className="lotus-frame" />

            <div className="lotus-content">
              <div className="lotus-top">
                <span />
                <LotusIcon />
                <span />
              </div>

              <h1 className="lotus-name">Amindu</h1>
              <div className="lotus-caps">Loving son of<br />Mr. &amp; Mrs.</div>
              <div className="lotus-caps lotus-parents">A.J.A.S. Rajapaksha</div>

              <div className="lotus-caps lotus-with">With</div>
              <LotusDivider />

              <h1 className="lotus-name">Ushera</h1>
              <div className="lotus-caps">Loving daughter of<br />Mr. &amp; Mrs.</div>
              <div className="lotus-caps lotus-parents">P.A. Nalin Wimal Janaka</div>

              <div className="lotus-caps gap-s">
                Request the honour of the presence of<br />
                {guestName ? (
                  <span className="lotus-guest">{guestName}</span>
                ) : (
                  'Mr. / Mr. & Mrs. / Miss / Family'
                )}
              </div>

              <LotusDivider />

              <div className="lotus-caps">On the occasion of their marriage</div>

              <div className="lotus-caps lotus-month">December</div>
              <div className="lotus-date">
                <span className="lotus-date-side">Thursday</span>
                <span className="lotus-day">10</span>
                <span className="lotus-date-side">2026</span>
              </div>

              <div className="lotus-caps gap-s">From 10.00 a.m to 4.00 p.m<br />at</div>
              <div className="lotus-venue">The Grand Silveray</div>
              <div className="lotus-caps">Rathnapura</div>
              <div className="lotus-caps">(Poruwa ceremony at 9.00 am)</div>

              <div className="lotus-caps lotus-phones">
                071 398 8073 &nbsp;·&nbsp; 070 273 9670
              </div>
            </div>
          </div>

          {/* Opening Left Flap */}
          <div className="flap-left"></div>

          {/* Ribbon Wrapper */}
          <div className="ribbon-wrap">
            <div className="ribbon-band"></div>
            <div className="bow-center">
              {/* Photorealistic Satin Bow Image */}
              <img src="/ivory_satin_bow-removebg-preview.png" alt="Satin Bow" className="bow-image" />
            </div>
          </div>

          <div className="instruction-toast">Click to unwrap</div>
        </div>
      </div>
    </>
  );
}
