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

const rubbers: { [key: string]: Rubber } = {};

for (let i = 0; i < teamsByPool.length; i++) {
  const t = teamsByPool[i];
  const teamA = t[0];
  const teamB = t[1];
  const teamC = t[2];

  const singlesMatch = (i: number) => ({
    team1Score: Array(i).fill(0),
    team2Score: Array(i).fill(0),
    team1Player: "",
    team2Player: "",
  });

  const doublesMatch = (i: number) => ({
    team1Score: Array(i).fill(0),
    team2Score: Array(i).fill(0),
    team1Player1: "",
    team1Player2: "",
    team2Player1: "",
    team2Player2: "",
  });

  const matches = {
    tabletennis: {
      cis: singlesMatch(5),
      noncis: singlesMatch(5),
      doubles: doublesMatch(5),
    },
    tennis: {
      cis: singlesMatch(1),
      noncis: singlesMatch(1),
      doubles: doublesMatch(1),
    },
    squash: {
      cis: singlesMatch(3),
      noncis: singlesMatch(3),
    },
    badminton: {
      cis: singlesMatch(3),
      noncis: singlesMatch(3),
      doubles: doublesMatch(3),
    },
  };

  rubbers[(i * 3).toString()] = {
    team1: teamA.name,
    team2: teamB.name,
    pool: teamA.pool,
    trumpCard: null,
    matches,
  };

  rubbers[(i * 3 + 1).toString()] = {
    team1: teamC.name,
    team2: teamA.name,
    pool: teamA.pool,
    trumpCard: null,
    matches,
  };

  rubbers[(i * 3 + 2).toString()] = {
    team1: teamB.name,
    team2: teamC.name,
    pool: teamA.pool,
    trumpCard: null,
    matches,
  };
}

console.log(rubbers);

const fs = require("node:fs");

fs.writeFileSync("rubbers.json", JSON.stringify(rubbers));
