import Image from "next/image";
import BgImage from "../../public/bg.jpg";
import { Button, Card } from "@nextui-org/react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1 className="text-4xl my-6 text-center font-extrabold">Ashoka RPL</h1>
      <p className="text-lg text-center ">
        Organised by Dhrthi Bhat and Uday Srivastava, this season will be taking
        place from the 21st to 23rd April, 2023. With increased team budgets of
        150 million (yes, 150), we are expecting more action, drama and
        competition from the get-go.
      </p>

      <div className="mt-6 grid md:grid-cols-3">
        <Link href="/players">
          <Card className="relative aspect-w-2 w-full aspect-h-3">
            <span className="absolute w-full h-full">
              <Image
                src={BgImage}
                placeholder="blur"
                fill={true}
                className="object-cover"
                alt="Dummy image"
              />
            </span>
            <div className="z-10 h-full">
              <h3 className="text-center text-3xl font-bold mt-4">PLAYERS</h3>
              <div className="w-full absolute bottom-0 flex flex-col backdrop-blur py-4 lg:py-2">
                <p className="text-center mb-2">
                  Players &#x2022; Tiers &#x2022; Prices
                </p>
                {/* <Link href="/players" className="text-center"> */}
                <Button
                  variant="ghost"
                  color="secondary"
                  radius={"full"}
                  className="mx-auto focus:text-black hover:text-black"
                >
                  PLAYERS
                </Button>
                {/* </Link> */}
              </div>

              {/* <h3 className="absolute left-1/2 bottom-0 "></h3> */}
            </div>
          </Card>
        </Link>
      </div>

      <p className="my-10">Hello</p>
    </>
  );
}
