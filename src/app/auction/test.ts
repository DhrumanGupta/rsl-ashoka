const fs = require("fs");

const auction = JSON.parse(fs.readFileSync("./data/auction.json", "utf8"));
// const raw = fs.readFileSync("./data/players.json", "utf8");
const raw = fs.readFileSync("./data/teams.json", "utf8");

const data = JSON.parse(raw);

const res = [...data];

// for (let player of res) {
//   const { name } = player;
//   console.log(name);
//   const x = auction.find((p: any) => p.name === name);
//   if (!x) {
//     continue;
//   }

//   const { price, team } = x;
//   player.price = price;
//   player.team = team;
// }

for (let player of auction) {
  const { team } = player;

  const x = res.find((p: any) => p.name === team);
  if (!x) {
    continue;
  }

  const { players } = x;
  players.push(player.name);
}

console.log(JSON.stringify(res));
