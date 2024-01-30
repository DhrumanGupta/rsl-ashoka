const rubber = require("../../data/rubbers.json");
const teams = require("../../data/teams.json");

type Team = {
  pool: string;
  name: string;
  manager: string;
  owners: string[];
  players: string[];
  logo: string;
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
      cis: {
        team1Score: Array<number>;
        team2Score: Array<number>;
        team1Player: string;
        team2Player: string;
      };
      doubles: {
        team1Score: Array<number>;
        team2Score: Array<number>;
        team1Player1: string;
        team1Player2: string;
        team2Player1: string;
        team2Player2: string;
      };
      noncis: {
        team1Score: Array<number>;
        team2Score: Array<number>;
        team1Player: string;
        team2Player: string;
      };
    };
    tennis: {
      cis: {
        team1Score: Array<number>;
        team2Score: Array<number>;
        team1Player: string;
        team2Player: string;
      };
      doubles: {
        team1Score: Array<number>;
        team2Score: Array<number>;
        team1Player1: string;
        team1Player2: string;
        team2Player1: string;
        team2Player2: string;
      };
      noncis: {
        team1Score: Array<number>;
        team2Score: Array<number>;
        team1Player: string;
        team2Player: string;
      };
    };
    squash: {
      cis: {
        team1Score: Array<number>;
        team2Score: Array<number>;
        team1Player: string;
        team2Player: string;
      };
      noncis: {
        team1Score: Array<number>;
        team2Score: Array<number>;
        team1Player: string;
        team2Player: string;
      };
    };
    badminton: {
      cis: {
        team1Score: Array<number>;
        team2Score: Array<number>;
        team1Player: string;
        team2Player: string;
      };
      doubles: {
        team1Score: Array<number>;
        team2Score: Array<number>;
        team1Player1: string;
        team1Player2: string;
        team2Player1: string;
        team2Player2: string;
      };
      noncis: {
        team1Score: Array<number>;
        team2Score: Array<number>;
        team1Player: string;
        team2Player: string;
      };
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

const teamsByPool: Team[][] = groupByPool(teams);

const rubbers = [];

for (let t of teamsByPool) {
  const teamA = t[0];
  const teamB = t[1];
  const teamC = t[2];

  const singlesMatch = {
    team1Score: [0],
    team2Score: [0],
    team1Player: "",
    team2Player: "",
  };

  const doublesMatch = {
    team1Score: [0],
    team2Score: [0],
    team1Player1: "",
    team1Player2: "",
    team2Player1: "",
    team2Player2: "",
  };

  const matches = {
    tabletennis: {
      cis: singlesMatch,
      noncis: singlesMatch,
      doubles: doublesMatch,
    },
    tennis: {
      cis: singlesMatch,
      noncis: singlesMatch,
      doubles: doublesMatch,
    },
    squash: {
      cis: singlesMatch,
      noncis: singlesMatch,
    },
    badminton: {
      cis: singlesMatch,
      noncis: singlesMatch,
      doubles: doublesMatch,
    },
  };

  rubbers.push({
    team1: teamA.name,
    team2: teamB.name,
    team1Score: 0,
    team2Score: 0,
    pool: teamA.pool,
    trumpCard: null,
    matches,
  });

  rubbers.push({
    team1: teamC.name,
    team2: teamA.name,
    team1Score: 0,
    team2Score: 0,
    pool: teamA.pool,
    trumpCard: null,
    matches,
  });

  rubbers.push({
    team1: teamB.name,
    team2: teamC.name,
    team1Score: 0,
    team2Score: 0,
    pool: teamA.pool,
    trumpCard: null,
    matches,
  });
}

console.log(rubbers);

const fs = require("node:fs");

fs.writeFileSync("rubbers.json", JSON.stringify(rubbers));
