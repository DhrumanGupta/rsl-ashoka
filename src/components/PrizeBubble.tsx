import cn from "@/lib/cn";
import Image, { StaticImageData } from "next/image";
import React from "react";

type PrizeBubbleProps = {
  src: StaticImageData | string;
  textClassName: string;
  className?: string;
  prize: string;
  description: string;
};

function PrizeBubble({
  src,
  textClassName,
  prize,
  className,
  description,
}: PrizeBubbleProps) {
  return (
    <div className={cn("w-full aspect-1 relative", className)}>
      <span className="w-full h-full block absolute z-20">
        <Image
          fill={true}
          alt="Bubble"
          src={src}
          className="object-contain z-20"
        />
      </span>
      <span className="absolute w-full h-full flex flex-col items-center justify-center">
        <h3 className={cn("text-3xl lg:text-4xl font-semibold", textClassName)}>
          &#x20B9;{prize}
        </h3>
        <p className={textClassName}>{description}</p>
      </span>
    </div>
  );
}

export default PrizeBubble;
