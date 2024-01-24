"use client";

import MaxWidthContainer from "@/components/MaxWidthContainer";
import TeamCard from "@/components/TeamCard";
import Teams from "@/data/teams.json";

const sortedTeams = Teams.sort((a: any, b: any) => {
  if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
  else if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
  else return 0;
});

// Timeline Component
export default function TeamPge() {
  return (
    <div className="items-center mb-8">
      <h1 className="text-4xl my-8 text-center font-bold">Teams</h1>

      <MaxWidthContainer>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto w-5/6 sm:w-full">
          {sortedTeams.map((team: any, i: any) => {
            return <TeamCard key={team.name} team={team} />;
          })}
        </div>
      </MaxWidthContainer>
    </div>
  );
}
