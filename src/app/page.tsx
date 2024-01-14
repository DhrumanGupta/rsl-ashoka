import LandingPageCard from "@/components/LandingPageCard";
import BgImage from "../../public/bg.jpg";
import MaxWidthContainer from "@/components/MaxWidthContainer";
import Image from "next/image";
import squash from "@/../public/hero_main.png";

const Images: HeroImage[] = [
  { src: "/hero0.webp", alt: "A picture of me next to a sunset", base64: "" },
  { src: "/hero1.webp", alt: "Me on the beach", base64: "" },
];

export default function Home() {
  return (
    <main>
      <div className="h-hero relative">
        <div className="absolute w-full h-full">
          <Image
            src={bg}
            alt="Picture of tennis court"
            className="opacity-50 object-cover"
            fill={true}
          />
        </div>
        <div className="flex w-full h-full items-center justify-center child:z-10">
          <MaxWidthContainer>
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl my-6 text-center font-extrabold">
              Ashoka Racket Sports League
            </h1>
          </MaxWidthContainer>
        </div>
      </div>
      <MaxWidthContainer>
        <p className="text-lg text-center ">
          Organised by Dhrthi Bhat and Uday Srivastava, this season will be
          taking place from the 21st to 23rd April, 2023. With increased team
          budgets of 150 million (yes, 150), we are expecting more action, drama
          and competition from the get-go.
        </p>
        <div className="mt-6 grid md:grid-cols-3 gap-8">
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
        </div>
        <p className="my-10">Hello</p>
      </MaxWidthContainer>
    </main>
  );
}
