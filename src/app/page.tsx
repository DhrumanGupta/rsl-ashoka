import LandingPageCard from "@/components/LandingPageCard";
import BgImage from "../../public/bg.jpg";

export default function Home() {
  return (
    <>
      <h1 className="text-4xl my-6 text-center font-extrabold">Ashoka RSL</h1>
      <p className="text-lg text-center ">
        Organised by Dhrthi Bhat and Uday Srivastava, this season will be taking
        place from the 21st to 23rd April, 2023. With increased team budgets of
        150 million (yes, 150), we are expecting more action, drama and
        competition from the get-go.
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
    </>
  );
}
