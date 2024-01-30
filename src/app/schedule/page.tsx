"use client";
import MaxWidthContainer from "@/components/MaxWidthContainer";
import React, { useState } from "react";
import Teams from "@/data/teams.json";
import Rubbers from "@/data/rubbers.json";
import Image from "next/image";
import { getGoogleDriveImageLink } from "@/lib/image";
import cn from "@/lib/cn";

type Team = {
  pool: string;
  name: string;
  manager: string;
  owners: string[];
  players: string[];
  logo: string;
};

type SingleMatch = {
  team1Score: Array<number>;
  team2Score: Array<number>;
  team1Player: string;
  team2Player: string;
};

type DoubleMatch = {
  team1Score: Array<number>;
  team2Score: Array<number>;
  team1Player1: string;
  team1Player2: string;
  team2Player1: string;
  team2Player2: string;
};
type Rubber = {
  team1: string;
  team2: string;
  team1Score: number;
  team2Score: number;
  pool: string;
  trumpCard: any;
  matches: {
    tabletennis: {
      cis: SingleMatch;
      doubles: DoubleMatch;
      noncis: SingleMatch;
    };
    tennis: {
      cis: SingleMatch;
      doubles: DoubleMatch;
      noncis: SingleMatch;
    };
    squash: {
      cis: SingleMatch;
      noncis: SingleMatch;
    };
    badminton: {
      cis: SingleMatch;
      doubles: DoubleMatch;
      noncis: SingleMatch;
    };
  };
};

function groupByPool<T>(objects: T[]): T[][] {
  const grouped: Record<string, T[]> = {};

  objects.forEach((obj) => {
    // @ts-ignore
    if (!grouped[obj.pool]) {
      // @ts-ignore
      grouped[obj.pool] = [];
    }
    // @ts-ignore
    grouped[obj.pool].push(obj);
  });

  return Object.values(grouped);
}

const TeamLogo = ({ team }: { team: Team }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-12 h-12 lg:w-16 lg:h-16 rounded-full overflow-hidden">
        <Image
          src={
            team.logo
              ? getGoogleDriveImageLink(team.logo, 480)
              : "/img/149071.png"
          }
          alt={team.name}
          // layout="responsive"
          className="cover"
          fill={true}
          // width={40}
          // height={40}
        />
      </div>

      <p className="max-w-20 text-center mt-2">{team.name}</p>
    </div>
  );
};

type SportsBlockProps = {
  data: {
    cis: SingleMatch;
    noncis: SingleMatch;
    doubles?: DoubleMatch;
  };
  name: string;
};

const SingleCategoryBlock = ({ data }: { data: SingleMatch }) => {
  return (
    <div className="flex justify-between items-center">
      <p>{data.team1Player}</p>
      <p>{data.team1Score}</p>
      <p>&mdash;</p>
      <p>{data.team2Score}</p>
      <p>{data.team2Player}</p>
    </div>
  );
};

const DoubleCategoryBlock = ({ data }: { data?: DoubleMatch }) => {
  if (!data) {
    return null;
  }
  return (
    <div className="flex justify-between items-center">
      <div>
        <p>{data.team1Player1}</p>
        <p>{data.team1Player2}</p>
      </div>
      <p>{data.team1Score}</p>
      <p>&mdash;</p>
      <p>{data.team2Score}</p>
      <div>
        <p>{data.team2Player1}</p>
        <p>{data.team2Player2}</p>
      </div>
    </div>
  );
};

const SportsBlock = ({ data, name }: SportsBlockProps) => {
  return (
    <div className="mt-4 mx-4 lg:mx-8">
      <h3 className="text-lg text-center font-medium">{name}</h3>
      <SingleCategoryBlock data={data.cis} />
      <hr className="my-2 opacity-50" />
      <SingleCategoryBlock data={data.noncis} />
      <hr className="my-2 opacity-50" />
      <DoubleCategoryBlock data={data.doubles} />
    </div>
  );
};

const RubberCard = ({ rubber }: { rubber: Rubber }) => {
  const team1 = Teams.find((team) => team.name === rubber.team1)!;
  const team2 = Teams.find((team) => team.name === rubber.team2)!;
  const [selected, setSelected] = useState(false);

  return (
    <div
      className="p-4 bg-gray-900 rounded-xl"
      onClick={() => setSelected((prev) => !prev)}
    >
      <div className="flex justify-between items-center">
        <TeamLogo team={team1} />
        <p className="text-xl lg:text-2xl font-medium">{rubber.team1Score}</p>
        <p>&mdash;</p>
        <p className="text-xl lg:text-2xl font-medium">{rubber.team2Score}</p>
        <TeamLogo team={team2} />
      </div>

      <div className={cn(selected ? "block" : "hidden")}>
        <SportsBlock data={rubber.matches.tennis} name="Tennis" />
        <SportsBlock data={rubber.matches.tabletennis} name="Table Tennis" />
        <SportsBlock data={rubber.matches.badminton} name="Badminton" />
        <SportsBlock data={rubber.matches.squash} name="Squash" />
      </div>
    </div>
  );
};

const PoolCard = ({ data }: { data: Rubber[] }) => {
  return (
    <div className="p-4 rounded-lg bg-gray-700 hover:cursor-pointer hover:shadow-xl">
      <h3 className="mb-4 text-center text-xl font-semibold md:text-2xl">
        Pool {data[0].pool}
      </h3>

      <div className="grid gap-4">
        {data.map((rubber, i) => (
          <RubberCard key={i} rubber={rubber} />
        ))}
      </div>
    </div>
  );
};

function Schedule() {
  const pools = groupByPool(Rubbers);
  return (
    <MaxWidthContainer className="min-h-hero">
      <p className="text-content mb-4 text-center">
        Looking for the matches schedule?{" "}
        <a
          href="https://docs.google.com/document/d/1_-xmldWTSZ6euj-LIQDAqeYytjni8tPkqkCX0i6wAJE/edit?usp=sharing"
          target="_blank"
          className="text-blue-500 underline"
        >
          Click here.
        </a>
      </p>
      {/* <h2>Coming Soon!</h2> */}
      <div className="grid md:grid-cols-2 gap-8">
        {pools
          .sort((a: any, b: any) => {
            if (a[0].pool.toLowerCase() < b[0].pool.toLowerCase()) return -1;
            else if (a[0].pool.toLowerCase() > b[0].pool.toLowerCase())
              return 1;
            else return 0;
          })
          .map((pool, i) => (
            <PoolCard data={pool} key={i} />
          ))}
      </div>
    </MaxWidthContainer>
  );
}

export default Schedule;
