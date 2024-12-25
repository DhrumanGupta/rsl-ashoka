"use client";

import MaxWidthContainer from "@/components/MaxWidthContainer";
import TeamCard from "@/components/TeamCard";
import Teams from "@/data/teams.json";
import Players from "@/data/players.json";
import AuctionInfo from "@/data/auction.json";
import { useMemo, useState } from "react";

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
    () => (data ? (!showAll ? data.slice(0, 5) : data) : data),
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

function TeamBreakDown({ data }: { data?: AuctionHistory | null }) {
  if (data === undefined) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  if (data === null) {
    return <div className="text-left text-xl">Not started yet.</div>;
  }

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-lg">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th className="font-bold">Team</th>
              <th className="font-bold">Total Players</th>
              <th className="font-bold">Non Cis Man Players</th>
              {/* <th className="font-bold">Time</th> */}
            </tr>
          </thead>
          <tbody>
            {sortedTeams.map((team: any, i: any) => {
              const players = data?.filter((x) => x.team === team.name) ?? [];

              const nonCisplayers = players.filter(
                (x) =>
                  Players.find((y) => y.name === x.name)?.category ===
                  "Non Cis Man"
              );

              return (
                <tr key={team.name}>
                  <td>{team.name}</td>
                  <td>{players.length}</td>
                  <td>{nonCisplayers.length}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const INITIAL_BUDGET = 175;

export default function TeamPage() {
  return (
    <MaxWidthContainer>
      <h2 className="my-4 text-center pt-8">Coming Soon!</h2>
    </MaxWidthContainer>
  );
  return (
    <div className="items-center mb-8">
      <MaxWidthContainer>
        <h2 className="my-4">Teams</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto w-5/6 sm:w-full">
          {sortedTeams.map((team: any, i: any) => (
            <TeamCard
              key={team.name}
              team={team}
              usedBudget={(
                AuctionInfo?.filter((x) => x.team === team.name) ?? []
              ).reduce((a, b) => a + b.price, 0)}
              totalBudget={INITIAL_BUDGET}
            />
          ))}
        </div>

        <h2 className="mb-4 mt-8">Auction History</h2>
        <AuctionHistory data={AuctionInfo} />

        <h2 className="mb-4 mt-8">Team Breakdown</h2>
        <TeamBreakDown data={AuctionInfo} />
      </MaxWidthContainer>
    </div>
  );
}
