"use client";

import cn from "@/lib/cn";
import { useState, useRef } from "react";
import { Card, CardBody } from "@nextui-org/card";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import MaxWidthContainer from "@/components/MaxWidthContainer";
import players from "@/data/players.json";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import BadmintonSVG from "@/../public/img/badminton.svg";
import TableTennisSVG from "@/../public/img/tt.svg";
import TennisSVG from "@/../public/img/tennis.svg";
import SquashSVG from "@/../public/img/squash.svg";
import Link from "next/link";
import { getGoogleDriveImageLink } from "@/lib/image";

const sortedPlayers = players.sort((a: any, b: any) => {
  if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
  else if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
  else return 0;
});

const icons: { [key: string]: any } = {
  badminton: BadmintonSVG,
  tableTennis: TableTennisSVG,
  tennis: TennisSVG,
  squash: SquashSVG,
};

const sportNames: { [key: string]: string } = {
  badminton: "Badminton",
  tableTennis: "Table Tennis",
  tennis: "Tennis",
  squash: "Squash",
};
const noTiers = 5;

const tierNumber_to_tierName: { [key: string]: string } = {
  "1": "Marquee",
  "2": "1",
  "3": "2",
  "4": "3",
  "5": "4",
};

function PlayerCard({ player, openModal }: { player: any; openModal: any }) {
  return (
    <div className="z-[2] w-full aspect-w-10 aspect-h-13 hover:scale-[1.05] transition-all duration-300 ease-in-out">
      <Card
        className={cn(
          `!absolute w-full rounded-md bg-primary border-2`,
          player.tier === "Marquee" && "text-marquee border-marquee",
          player.tier === "1" && "text-gold border-gold",
          player.tier === "2" && "text-silver border-silver",
          player.tier === "3" && "text-bronze border-bronze",
          player.tier === "4" && "text-fourth border-fourth"
        )}
        isPressable
        isHoverable={false}
        onClick={openModal}>
        <Image
          src={getGoogleDriveImageLink(player.photo)}
          blurDataURL={getGoogleDriveImageLink(player.photo, 144)}
          alt={player.name}
          placeholder="blur"
          width={500}
          height={500}
          className={cn(
            `mx-auto w-full aspect-1 object-cover rounded-sm`,
            player.imagePosition === "c" && `object-center`,
            player.imagePosition === "l" && `object-left`,
            player.imagePosition === "r" && `object-right`,
            player.imagePosition === "t" && `object-top`,
            player.imagePosition === "b" && `object-bottom`
          )}
        />
        <CardBody>
          <div className="text-center justify-center overflow-hidden my-auto w-full z-10">
            <p className="text-[20px] font-bold capitalize">{player.name}</p>
            <div className="max-w-fit flex items-center gap-2 mx-auto">
              {player.sports.map(
                (sport: string) =>
                  sport && (
                    <Image
                      key={sport}
                      src={icons[sport]}
                      alt={sport}
                      width={20}
                      height={20}
                      className={`mx-auto max-w-[20px] max-h-[20px] object-cover rounded-sm`}
                    />
                  )
              )}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

function PlayerModal({ player, isOpen, onOpenChange }: { player: any; isOpen: boolean; onOpenChange: any }) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" placement="center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <p className="underline underline-offset-[3px]">
                {player.name} ({player.category})
              </p>
              {player.team !== "" && player.price > 0 && (
                <p className="!font-normal  text-base">
                  Sold to <span className="font-semibold">{player.team}</span> for{" "}
                  <span className="font-semibold text-[#118C4F]">${player.price}M</span>
                </p>
              )}
            </ModalHeader>
            <ModalBody>
              <p className="leading-1">
                <span className="font-semibold">About Me</span> <br></br>
                {player.bio}
              </p>
              <hr />
              <p className="font-semibold">Preferences</p>
              {player.sports.map((sport: string, i: number) => {
                const preferenceNo = ["1st", "2nd", "3rd"][i];
                return (
                  <p className="leading-[0.5rem]" key={sport}>
                    <span className="font-medium">{preferenceNo}:</span> {sportNames[sport]}
                  </p>
                );
              })}
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

// Players Page Component
export default function Players() {
  const [player, setPlayer] = useState(players[0]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Add refs for each tier
  const tierRefs = [...Array(noTiers)].map(() => useRef<HTMLDivElement>(null));

  const scrollToTier = (index: number) => {
    const element = tierRefs[index]?.current;
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - 80; // 100px offset
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div className="fixed hidden max-w-fit max-h-fit z-20 min-[1080px]:flex flex-col gap-10 mr-12 min-[1280px]:mr-16 inset-y-0 right-0 my-auto">
        {
          // @ts-ignore
          [...Array(noTiers).keys()].map((tier) => {
            tier++;
            const tierName = tierNumber_to_tierName[tier].length > 1 ? tierNumber_to_tierName[tier] : `Tier ${tierNumber_to_tierName[tier]}`;
            return (
              <button
                key={tier}
                onClick={() => scrollToTier(tier - 1)}
                className={cn(
                  "relative text-center text-base font-semibold rounded-full px-2 py-2 md:px-6 md:py-3 transform transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg active:translate-y-0 backdrop-blur-sm bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2",
                  tier == 1 && "text-white bg-sky-200 focus:ring-marquee/50",
                  tier == 2 && "text-gold bg-amber-600 focus:ring-amber-600/50",
                  tier == 3 && "text-silver bg-gray-500 focus:ring-gray-500/50",
                  tier == 4 && "text-bronze bg-amber-800 focus:ring-amber-800/50",
                  tier == 5 && "text-fourth bg-cyan-800 focus:ring-cyan-800/50"
                )}>
                {tierName}
              </button>
            );
          })
        }
      </div>

      <div className="w-full items-center mb-8">
        <PlayerModal player={player} isOpen={isOpen} onOpenChange={onOpenChange} />
        <MaxWidthContainer className="mt-16 mb-12 md:mb-16 text-center">
          <h1 className="text-5xl md:text-8xl my-4 text-center font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
            THE PLAYERS
          </h1>
          <p className="text-base md:text-lg">Click on the players to see more</p>
        </MaxWidthContainer>

        {
          // @ts-ignore
          [...Array(noTiers).keys()].map((tier) => {
            tier++;
            const tierName = tierNumber_to_tierName[tier].length > 1 ? tierNumber_to_tierName[tier] : `Tier ${tierNumber_to_tierName[tier]}`;

            return (
              <div
                ref={tierRefs[tier - 1]}
                className={cn(
                  "w-full py-8 relative overflow-hidden",
                  tier === 1 && "bg-marquee/[0.8] sparkle-bg",
                  tier === 2 && "bg-gold/[0.3] sparkle-bg-sm",
                  tier === 3 && "bg-silver/[0.25]",
                  tier === 4 && "bg-bronze/[0.25]",
                  tier === 5 && "bg-fourth/[0.25]"
                )}
                key={tier}>
                <p
                  className={cn(
                    "mb-10 font-semibold text-5xl mx-auto text-center",
                    tier === 1 && "text-white/90",
                    tier === 2 && "text-gold",
                    tier === 3 && "text-silver",
                    tier === 4 && "text-bronze",
                    tier === 5 && "text-fourth"
                  )}>
                  {tierName}
                </p>

                <MaxWidthContainer>
                  <div className="grid grid-cols-1 sm:grid-cols-2 min-[1080px]:grid-cols-3 mx-auto items-center gap-12 w-11/12 md:w-full">
                    {sortedPlayers
                      .filter((player: any) => player.tier == tierNumber_to_tierName[tier])
                      .map((player: any) => {
                        return (
                          <PlayerCard
                            key={player.name}
                            player={player}
                            openModal={() => {
                              setPlayer(player);
                              onOpen();
                            }}
                          />
                        );
                      })}
                  </div>
                </MaxWidthContainer>
              </div>
            );
          })
        }
      </div>

      <style jsx>{`
        .sparkle-bg {
          position: relative;
          z-index: 1;
        }

        .sparkle-bg::before,
        .sparkle-bg::after {
          content: "";
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          pointer-events: none;
          background-repeat: repeat;
          background-image: radial-gradient(rgba(255, 255, 255, 0.5) 2px, transparent 2px);
          background-size: 20px 20px;
          opacity: 0.2;
        }

        .sparkle-bg-sm {
          position: relative;
          z-index: 1;
        }

        .sparkle-bg-sm::before,
        .sparkle-bg-sm::after {
          content: "";
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          pointer-events: none;
          background-repeat: repeat;
          background-image: radial-gradient(rgba(255, 255, 255, 0.5) 2px, transparent 2px);
          background-size: 30px 30px;
          opacity: 0.2;
        }
      `}</style>
    </>
  );
}
