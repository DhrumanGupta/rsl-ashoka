"use client";
import MaxWidthContainer from "@/components/MaxWidthContainer";
import React, { useMemo, useState } from "react";
import Teams from "@/data/teams.json";
import Image from "next/image";
import { getGoogleDriveImageLink } from "@/lib/image";
import cn from "@/lib/cn";
import useRealtimeData from "@/hooks/useRealtimeData";

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
  pool: string;
  team1TrumpCard?: string;
  team2TrumpCard?: string;
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
  const { team1Wins, team2Wins } = getWins(data);
  return (
    <div className="flex justify-between items-center">
      <p className="text-left">{data.team1Player}</p>
      <p>{team1Wins}</p>
      <p>&mdash;</p>
      <p>{team2Wins}</p>
      <p className="text-right">{data.team2Player}</p>
    </div>
  );
};

const DoubleCategoryBlock = ({ data }: { data?: DoubleMatch }) => {
  if (!data) {
    return null;
  }

  const { team1Wins, team2Wins } = getWins(data);

  console.log(data.team1Score, data.team2Score, team1Wins, team2Wins);

  return (
    <div className="flex justify-between items-center">
      <div>
        <p>{data.team1Player1}</p>
        <p>{data.team1Player2}</p>
      </div>
      <p>{team1Wins}</p>
      <p>&mdash;</p>
      <p>{team2Wins}</p>
      <div>
        <p className="text-right">{data.team2Player1}</p>
        <p className="text-right">{data.team2Player2}</p>
      </div>
    </div>
  );
};

const SportsBlock = ({ data, name }: SportsBlockProps) => {
  return (
    <div className="mt-4 lg:mx-8">
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

  const { team1Score, team2Score, finished } = getRubberScore(rubber);

  const winning = team1Score > team2Score ? rubber.team1 : rubber.team2;

  return (
    <div
      className={cn(
        "p-4 bg-gray-900 rounded-xl",
        finished && "border-green-500 border-2"
      )}
      onClick={() => setSelected((prev) => !prev)}
    >
      {finished && (
        <p className="mb-2 text-center text-content">
          Winner: <span className="font-medium">{winning}</span>
        </p>
      )}
      <div className="flex justify-between items-center">
        <TeamLogo team={team1} />
        <p className="text-xl lg:text-2xl font-medium">{team1Score}</p>
        <p>&mdash;</p>
        <p className="text-xl lg:text-2xl font-medium">{team2Score}</p>
        <TeamLogo team={team2} />
      </div>

      {selected && (
        <div>
          <SportsBlock data={rubber.matches.tennis} name="Tennis" />
          <SportsBlock data={rubber.matches.tabletennis} name="Table Tennis" />
          <SportsBlock data={rubber.matches.badminton} name="Badminton" />
          <SportsBlock data={rubber.matches.squash} name="Squash" />
        </div>
      )}
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
  const rawData = useRealtimeData<{ [key: string]: Rubber } | null>("/");

  const Rubbers: Rubber[] = useMemo(
    () => (rawData ? Object.values(rawData) : []),
    [rawData]
  );

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

      {pools.length <= 0 && (
        <p className="mt-8 text-content text-center">Loading..</p>
      )}
    </MaxWidthContainer>
  );
}

const getWins = (match: SingleMatch | DoubleMatch) => {
  let team1Wins = 0;
  let team2Wins = 0;
  const totalGames = match.team1Score.length;

  for (let i = 0; i < totalGames; i++) {
    if (Number(match.team1Score[i]) > Number(match.team2Score[i])) {
      team1Wins++;
    } else if (Number(match.team2Score[i]) > Number(match.team1Score[i])) {
      team2Wins++;
    }
  }

  // console.log(match.team1Score, match.team2Score);
  // console.log(team1Wins, team2Wins);

  return { team1Wins, team2Wins };
};

function getMatchWinner(
  singleOrDoubleMatch: SingleMatch | DoubleMatch
): number {
  const { team1Wins, team2Wins } = getWins(singleOrDoubleMatch);
  const totalGames = singleOrDoubleMatch.team1Score.length;

  // Check if the match has concluded
  if (team1Wins > totalGames / 2 || team2Wins > totalGames / 2) {
    return team1Wins > team2Wins ? 1 : 2;
  } else {
    return 0; // Match in progress or draw
  }
}

// function getRubberScore(rubber: Rubber): {
//   team1Score: number;
//   team2Score: number;
// } {
//   let team1Score = 0;
//   let team2Score = 0;

//   // Iterate over each sport and match type
//   for (const sport in rubber.matches) {
//     // @ts-ignore
//     for (const matchType in rubber.matches[sport]) {
//       const trump = rubber.trumpCard;

//       // @ts-ignore
//       const winner = getMatchWinner(rubber.matches[sport][matchType]);
//       if (winner === 1) {
//         team1Score += 1;
//       } else if (winner === 2) {
//         team2Score += 1;
//       }
//     }
//   }

//   return { team1Score, team2Score };
// }

function getRubberScore(rubber: Rubber): {
  team1Score: number;
  team2Score: number;
  finished: boolean;
} {
  let team1Score = 0;
  let team2Score = 0;
  let finished = true;

  // Function to update score based on trump card status
  const updateScore = (winner: number, matchCategory: string) => {
    const isTeam1Trump = rubber.team1TrumpCard === matchCategory;
    const isTeam2Trump = rubber.team2TrumpCard === matchCategory;

    if (winner === 1) {
      team1Score += isTeam1Trump ? 2 : 1;
      if (isTeam2Trump) {
        team2Score -= 1;
      }
    } else if (winner === 2) {
      team2Score += isTeam2Trump ? 2 : 1;
      if (isTeam1Trump) {
        team1Score -= 1;
      }
    }
  };

  // Iterate over each sport and match type
  for (const sport in rubber.matches) {
    // @ts-ignore
    for (const matchType in rubber.matches[sport]) {
      const matchCategory = `${sport}_${matchType}`;
      // @ts-ignore
      const winner = getMatchWinner(rubber.matches[sport][matchType]);
      if (winner !== 0) {
        // If the match is concluded
        updateScore(winner, matchCategory);
      } else {
        finished = false;
      }
    }
  }

  return { team1Score, team2Score, finished };
}

export default Schedule;
