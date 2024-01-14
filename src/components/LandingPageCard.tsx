import Image, { StaticImageData } from "next/image";
import { Button } from "@nextui-org/button";
import { Card } from "@nextui-org/card";
import Link from "next/link";

type LandingPageCardProps = {
  href: string;
  title: string;
  keywords: string[];
  image: StaticImageData;
};

function LandingPageCard({
  href,
  title,
  keywords,
  image,
}: LandingPageCardProps) {
  return (
    <Link href={href}>
      <Card className="relative aspect-w-2 w-full aspect-h-3">
        <span className="absolute w-full h-full">
          <Image
            src={image}
            placeholder="blur"
            fill={true}
            className="object-cover"
            alt="Dummy image"
          />
        </span>
        <div className="z-10 h-full">
          <h3 className="text-center text-3xl font-bold mt-4">{title}</h3>
          <div className="w-full absolute bottom-0 flex flex-col backdrop-blur py-4 lg:py-2">
            <p
              className="text-center mb-2"
              dangerouslySetInnerHTML={{ __html: keywords.join(" &#x2022; ") }}
            >
              {/* Players &#x2022; Tiers &#x2022; Prices */}
            </p>
            {/* <Link href="/players" className="text-center"> */}
            <Button
              variant="ghost"
              color="secondary"
              radius={"full"}
              className="mx-auto focus:text-black hover:text-black"
            >
              {title}
            </Button>
            {/* </Link> */}
          </div>

          {/* <h3 className="absolute left-1/2 bottom-0 "></h3> */}
        </div>
      </Card>
    </Link>
  );
}

export default LandingPageCard;
