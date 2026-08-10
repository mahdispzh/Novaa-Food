"use client";

import Image from "next/image";

import type { FollowButtonProps } from "./follow-button.types";

// Traced directly from the reference frame SVG (viewBox 186x211): this path
// cuts the bottom-left "notch" the avatar clips into; the follow button sits
// inside the notch's circle (cx 28, cy 182.6455, r 28).
const AVATAR_CLIP_PATH =
  "path('M164.5 0H21C18.2422 0 15.5115 0.543181 12.9637 1.59853C10.4158 2.65388 8.1008 4.20073 6.15077 6.15076C4.20073 8.10079 2.65387 10.4158 1.59853 12.9636C0.543167 15.5115 0 18.2422 0 21V115.5C0 123.854 3.31874 131.866 9.22614 137.774C15.1335 143.681 23.1457 147 31.5 147C39.8543 147 47.8665 150.319 53.7739 156.226C59.6813 162.134 63 170.146 63 178.5C63 186.854 66.3187 194.866 72.2261 200.774C78.1335 206.681 86.1457 210 94.5 210H164.5C170.07 210 175.411 207.787 179.349 203.849C183.288 199.911 185.5 194.57 185.5 189V21C185.5 15.4305 183.288 10.089 179.349 6.15076C175.411 2.21249 170.07 0 164.5 0Z')";

const NATIVE_WIDTH = 186;
const NATIVE_HEIGHT = 211;
const SCALE = 0.75;
const FRAME_WIDTH = NATIVE_WIDTH * SCALE;
const FRAME_HEIGHT = NATIVE_HEIGHT * SCALE;
const BUTTON_DIAMETER = 56 * SCALE; // ellipse rx/ry * 2
const BUTTON_CENTER_X = 28 * SCALE; // ellipse cx
const BUTTON_CENTER_Y = 182.6455 * SCALE; // ellipse cy

export default function FollowButton({
  avatarSrc,
  alt,
  isFollowing,
  onToggleFollow,
}: FollowButtonProps) {
  return (
    <div
      className="relative shrink-0"
      style={{ width: FRAME_WIDTH, height: FRAME_HEIGHT }}
    >
      <div
        className="absolute top-0 left-0 overflow-hidden bg-secondary"
        style={{
          clipPath: AVATAR_CLIP_PATH,
          WebkitClipPath: AVATAR_CLIP_PATH,
          width: NATIVE_WIDTH,
          height: NATIVE_HEIGHT,
          transform: `scale(${SCALE})`,
          transformOrigin: "top left",
        }}
      >
        <Image fill alt={alt} className="object-cover" src={avatarSrc} />
      </div>

      {/* follow button circle sitting in the notch */}
      <button
        className="absolute flex flex-col items-center justify-center rounded-full bg-[var(--color-primary)] text-center text-[9px] leading-tight font-medium text-white transition hover:opacity-90"
        style={{
          width: BUTTON_DIAMETER,
          height: BUTTON_DIAMETER,
          left: BUTTON_CENTER_X,
          top: BUTTON_CENTER_Y,
          transform: "translate(-50%, -50%)",
        }}
        type="button"
        onClick={onToggleFollow}
      >
        {isFollowing ? (
          <>
            <span>دنبال</span>
            <span>شده</span>
          </>
        ) : (
          <>
            <span>دنبال</span>
            <span>کردن</span>
          </>
        )}
      </button>
    </div>
  );
}
