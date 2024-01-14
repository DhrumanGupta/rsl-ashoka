"use client";

import cn from "@/lib/cn";
import { useState } from "react";
import { Card, CardBody } from "@nextui-org/card";
import Image from "next/image";
import MaxWidthContainer from "@/components/MaxWidthContainer";

// Sample data
const players = [
  {
    name: "Anshul Tekriwal",
    imageUrl: "/img/AnshulTekriwal.jpg",
    sports: ["badminton", "tableTennis"],
    tier: 1,
  },
];

const icons: { [key: string]: string } = {
  badminton: "/img/badminton.svg",
  tableTennis: "/img/tt.webp",
  tennis: "/img/tennis.png",
  squash: "/img/squash.png",
};

const noTiers = 4;

function PlayerCard({ player }: { player: any }) {
  const sizeStyle = `w-[250px]`;

  return (
    <Card
      className={cn(
        `${sizeStyle} flex rounded-md bg-primary border-2`,
        player.tier === 1 && 'text-gold border-gold',
        player.tier === 2 && 'text-silver border-silver',
        player.tier === 3 && 'text-bronze border-bronze',
        player.tier === 4 && 'text-fourth border-fourth'
      )}>
      <Image
        src={player.imageUrl}
        alt={player.name}
        width={350}
        height={350}
        className={`mx-auto max-w-[250px] max-h-[250px] object-cover rounded-sm object-top`}
      />
      <CardBody>
        <div className="text-center justify-center overflow-hidden py-2 w-full shadow-small z-10">
          <p className="text-[24px] font-bold">{player.name}</p>
          <div className="max-w-fit flex items-center gap-2 mx-auto">
            {player.sports.map((sport: string) => {
              return (
                <Image
                  key={sport}
                  src={icons[sport]}
                  alt={sport}
                  width={20}
                  height={20}
                  className={`mx-auto max-w-[20px] max-h-[20px] object-cover rounded-sm object-top`}
                />
              );
            })}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

// Timeline Component
export default function Timeline() {
  const [tier, setTier] = useState(1);

  return (
    <div className='w-full items-center mb-8'>
      <MaxWidthContainer className='mt-20 text-center'>
        <h1 className='text-[40px] md:text-8xl my-4 text-center font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-300'>
          THE PLAYERS
        </h1>
        <p className='text-base md:text-lg'>See the players in each tier. Click on the tier to see the players in</p>

        <div className='mt-12 sm:mt-20 md:mt-24 lg:mt-32 mb-8 gap-4 sm:gap-8 md:gap-12 grid grid-cols-2 sm:grid-cols-4'>
          {
            // @ts-ignore
            [...Array(noTiers).keys()].map((tierNo) => {
              return (
                <button
                  key={tierNo}
                  onClick={() => setTier(tierNo + 1)}
                  className={cn(
                    `flex flex-col items-center justify-center text-center rounded-full py-[2px] px-4`,
                    tierNo === 0 && 'text-gold bg-gold/20',
                    tierNo === 1 && 'text-silver bg-silver/20',
                    tierNo === 2 && 'text-bronze bg-bronze/20',
                    tierNo === 3 && 'text-fourth bg-fourth/20'
                  )}>
                  <p className='text-lg font-medium'>Tier {tierNo + 1}</p>
                </button>
              );
            })
          }
        </div>
      </MaxWidthContainer>

      <div
        className={cn(
          'w-full py-8',
          tier === 1 && ' bg-gold/[0.25]',
          tier === 2 && ' bg-silver/[0.25]',
          tier === 3 && ' bg-bronze/[0.25]',
          tier === 4 && ' bg-fourth/[0.25]'
        )}>
        <p
          className={cn(
            'mb-6 font-semibold text-5xl mx-auto text-center',
            tier === 1 && 'text-gold',
            tier === 2 && 'text-silver',
            tier === 3 && 'text-bronze',
            tier === 4 && 'text-fourth'
          )}>
          TIER {tier}
        </p>

        <div className="flex flex-col mx-auto w-3/4 items-center">
          {players
            .filter((player: any) => player.tier == tier)
            .map((player: any) => {
              return <PlayerCard key={player.name} player={player} />;
            })}
        </div>
      </div>
    </div>
  );
}
