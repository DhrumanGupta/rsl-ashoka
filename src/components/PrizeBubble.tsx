import cn from "@/lib/cn";
import Image, { StaticImageData } from "next/image";
import React from "react";

type PrizeBubbleProps = {
  src: StaticImageData | string;
  textClassName: string;
  prize: string;
};

function PrizeBubble({ src, textClassName, prize }: PrizeBubbleProps) {
  return (
    <div className="w-full aspect-1 relative md:p-4">
      <span className="w-full h-full block absolute z-20">
        <Image
          fill={true}
          alt="Bubble"
          src={src}
          className="object-contain z-20"
        />
      </span>
      <span className="absolute w-full h-full flex items-center justify-center">
        <h3 className={cn("text-3xl lg:text-4xl font-semibold", textClassName)}>
          &#x20B9;{prize}
        </h3>
      </span>
    </div>
  );
}

export default PrizeBubble;
