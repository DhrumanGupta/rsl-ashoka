"use client";

import React, { useMemo } from "react";
import useRealtimeData from "@/hooks/useRealtimeData";
import MaxWidthContainer from "@/components/MaxWidthContainer";
import { Card } from "@nextui-org/card";
import { useState } from "react";
import Image from "next/image";
import Teams from "@/data/teams.json";

const teamColors: any = {
  "Asawarpur Racketeers": "bg-[#e0c936]/[0.4] outline-[#e0c936]",
  "Chhatti Pass": "bg-[#E4080A]/[0.4] outline-[#E4080A]",
  "Club Penguin": "bg-[#15007D]/[0.4] outline-[#15007D]",
  "Haryana Hit Squad": "bg-[#EAA9FF]/[0.4] outline-[#EAA9FF]",
  "Illegal Racquets": "bg-[#35C08E]/[0.4] outline-[#35C08E]",
  "Incognito Mode": "bg-[#F16192]/[0.4] outline-[#F16192]",
  "Löded Diper": "bg-[#FE9902]/[0.4] outline-[#FE9902]",
  "Magic Moments": "bg-[#98794B]/[0.4] outline-[#98794B]",
  "Pineapple Express": "bg-[#0E7511]/[0.4] outline-[#0E7511]",
  "The Three Racketeers": "bg-[#84171A]/[0.4] outline-[#84171A]",
  "Theka Sonipat": "bg-[#911BAF]/[0.4] outline-[#911BAF]",
  "Toofan Express": "bg-[#22AED1]/[0.4] outline-[#22AED1]",
};

const INITIAL_BUDGET = 175;

function TeamCard({
  name,
  budget,
  players,
  logo,
}: {
  name: string;
  budget: number;
  players: { name: string; price: number }[];
  logo: string;
}) {
  return (
    <div className={`w-full`}>
      <Card className={`${teamColors[name]} outline-offset-4 w-full min-h-80`}>
        <div className="p-5 text-center mt-4 drop-shadow-md">
          <div className="relative overflow-hidden mx-auto w-2/5 aspect-1 mb-4">
            <Image
              src={
                logo
                  ? `https://lh3.googleusercontent.com/d/${logo}=s480`
                  : "/img/149071.png"
              }
              alt={name}
              fill={true}
              className="rounded-full object-cover"
            />
          </div>
          <p className="text-3xl font-bold w-full mb-1">{name}</p>
          <div className="m-4 lg:m-0 px-4">
            {players.length > 0 && (
              <p className="font-bold text-xl text-left">Players:</p>
            )}
            {players.map((player) => (
              <p className="text-left font-medium" key={player.name}>
                {player.name}{" "}
                <span className="text-medium">(${player.price}M)</span>
              </p>
            ))}

            {/* <p className="font-bold text-xl text-left  mt-4 ">Budget:</p> */}

            <div className="relative w-full rounded-md bg-black/50 h-6  mt-4 overflow-hidden">
              <div
                className="h-full -z-10 bg-black absolute"
                style={{ width: `${(budget / INITIAL_BUDGET) * 100}%` }}
              ></div>
              <p className="text-center text-white text font-bold">
                ${budget}M
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

type AuctionPlayerInfo = {
  price: number;
  team: string;
  time: number;
};

type AuctionInfo = {
  [key: string]: AuctionPlayerInfo;
};

const sortedTeams = Teams.sort((a: any, b: any) => {
  if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
  else if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
  else return 0;
});

type AuctionHistory = {
  price: number;
  team: string;
  time: number;
  name: string;
}[];

function AuctionHistory({ data }: { data?: AuctionHistory | null }) {
  const [showAll, setShowAll] = useState(false);

  const finalData = useMemo(
    () => (data && showAll ? data.slice(0, 5) : data),
    [data, showAll]
  );

  if (finalData === undefined) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  if (finalData === null) {
    return <div className="text-left text-xl">Not started yet.</div>;
  }

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-lg">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th className="font-bold">Player</th>
              <th className="font-bold">Team</th>
              <th className="font-bold">Price</th>
              {/* <th className="font-bold">Time</th> */}
            </tr>
          </thead>
          <tbody>
            {finalData.map((player) => (
              <tr key={player.name} className="border-b-1 border-b-white/50">
                <td>{player.name}</td>
                <td>{player.team}</td>
                <td>{player.price}M</td>
                {/* <td>{new Date(player.time).toLocaleString()}</td> */}
              </tr>
            ))}
          </tbody>
          <button
            className="text-lg mt-2 font-semibold text-blue-400"
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? "Show Less" : "Show All"}
          </button>
        </table>
      </div>
    </div>
  );
}

function Page() {
  const rawOrders = useRealtimeData<AuctionInfo | null>("/");

  const auctionInfo: AuctionHistory | null | undefined = useMemo(() => {
    if (rawOrders === null) {
      return null;
    }

    if (rawOrders !== undefined) {
      const res = Object.entries(rawOrders).map(([key, value]) => ({
        name: key,
        ...value,
      }));

      return res.sort((a, b) => b.time - a.time);
    }

    return undefined;
  }, [rawOrders]);

  return (
    <MaxWidthContainer>
      <h2 className="mb-4">Auction History</h2>
      <AuctionHistory data={auctionInfo} />
      <h2 className="my-4">Teams</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto sm:w-full">
        {sortedTeams.map((team: any, i: any) => {
          const players =
            auctionInfo?.filter((x) => x.team === team.name) ?? [];

          const budget =
            INITIAL_BUDGET - players.reduce((a, b) => a + b.price, 0);
          return (
            <TeamCard
              key={team.name}
              name={team.name}
              budget={budget}
              players={players.map((x) => ({ name: x.name, price: x.price }))}
              logo={team.logo}
            />
          );
        })}
      </div>
    </MaxWidthContainer>
  );
}

export default Page;
