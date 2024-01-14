import LandingPageCard from "@/components/LandingPageCard";
import BgImage from "../../public/bg.jpg";
import MaxWidthContainer from "@/components/MaxWidthContainer";
import Image from "next/image";
import { THeroImage } from "@/types";
import HeroImage from "@/components/HeroImage";
import { getPlaceholderLocal } from "@/lib/getPlaiceholder";

import bubbles from "@/../public/bubbles.png";
import PrizeBubble from "@/components/PrizeBubble";

const Images: THeroImage[] = [
  { src: "/hero_squash.webp", alt: "Squash Court", base64: "" },
  { src: "/hero_tennis.webp", alt: "Tennis Court", base64: "" },
  { src: "/hero_tt.webp", alt: "Table Tennis Court", base64: "" },
  { src: "/hero_badminton.webp", alt: "Badminton Court", base64: "" },
];

export default async function Home() {
  for (const image of Images) {
    image.base64 = await getPlaceholderLocal(image.src);
  }

  return (
    <main>
      <div className="h-hero relative">
        <div className="absolute w-full h-full">
          <HeroImage images={Images} />
        </div>
        <div className="flex w-full h-full items-center justify-center child:z-10">
          <MaxWidthContainer>
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl my-6 text-center font-extrabold">
              Ashoka Racquet Sports League
            </h1>
          </MaxWidthContainer>
        </div>
      </div>
      <MaxWidthContainer className="mt-16">
        <p className="text-lg text-center text-content">
          Welcome to the Ashoka Racquet Sports League, where badminton, tennis,
          squash, and table tennis come together for a dynamic sporting
          experience. Join us in celebrating the joy of play and friendly
          competition in this one-of-a-kind league!
        </p>

        <h2 className="text-center mt-16 mb-12 text-gold">Prizes</h2>

        <div className="max-w-[40ch] mx-auto lg:max-w-none lg:grid lg:grid-cols-3 mb-12">
          <PrizeBubble
            className="w-[95%] lg:w-full lg:left-[100%]"
            src={bubbles}
            prize="25,000"
            textClassName="text-gold"
            description="1st Place"
          />

          <PrizeBubble
            className="ml-auto -mr-4 -mt-8 w-[90%] lg:w-[95%] lg:right-[90%] lg:mt-16"
            src={bubbles}
            prize="12,500"
            textClassName="text-silver"
            description="2nd Place"
          />

          <PrizeBubble
            className="-ml-4 -mt-8 w-[85%] lg:w-[90%] lg:mt-24 lg:-ml-12"
            src={bubbles}
            prize="7,500"
            textClassName="text-bronze"
            description="3rd Place"
          />
        </div>

        {/* <h3 className="my-10 font-bold text-xl lg:text-2xl text-center">
          Coming Soon!
        </h3> */}

        {/* <div className="mt-6 grid md:grid-cols-3 gap-8">
          <LandingPageCard
            image={BgImage}
            title="Players"
            href="/players"
            keywords={["Players", "Tiers", "Prices"]}
          />
          <LandingPageCard
            image={BgImage}
            title="Lorem Ipsum"
            href="/players"
            keywords={["Players", "Tiers", "Prices"]}
          />
          <LandingPageCard
            image={BgImage}
            title="Lorem Ipsum"
            href="/players"
            keywords={["Players", "Tiers", "Prices"]}
          />
        </div> */}
      </MaxWidthContainer>
    </main>
  );
}
