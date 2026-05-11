import React from "react";

interface MarqueImgProps {
  img: string;
}

export const MarqueImg = ({ img }: MarqueImgProps) => {
  return (
    <div className="mx-8">
      <img src={img} alt="Marquee Logo" className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300" />
    </div>
  );
};
