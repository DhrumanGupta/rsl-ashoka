import { Card } from "@nextui-org/card";
import { useState } from "react";
import Image from "next/image";
import Players from "@/data/players.json";
import cn from "@/lib/cn";
import { getGoogleDriveImageLink } from "@/lib/image";

const teamColors: any = {
  "Chhatti Pass": "bg-[#E4080A]/[0.4] outline-[#E4080A]",
  "Club Penguin": "bg-[#02066F]/[0.4] outline-[#02066F]",
  "Incognito Mode": "bg-[#F16166]/[0.4] outline-[#F16166]",
  "Magic Moments": "bg-[#292828]/[0.4] outline-[#292828]",
  "The Three Racketeers": "bg-[#E0BA96]/[0.4] outline-[#E0BA96]",
  "Toofan Express": "bg-[#22AED1]/[0.4] outline-[#22AED1]",
  "Dabangg Dilli": "bg-[#04083b]/[0.4] outline-[#04083b]",
  LASSIO: "bg-[#FFFDD0]/[0.4] outline-[#FFFDD0]",
  "Absolut Aces": "bg-[#0100AD]/[0.4] outline-[#0100AD]",
  "Babble Paddle": "bg-[#460170]/[0.4] outline-[#460170]",
  "Kai Mantos RSC": "bg-[#FFFFFF]/[0.4] outline-[#FFFFFF]",
  RSLnanda: "bg-[#8ACE00]/[0.4] outline-[#8ACE00]",
  Puzzles: "bg-[#b6a112]/[0.4] outline-[#b6a112]",
  Sharpshooters: "bg-[#191970]/[0.4] outline-[#191970]",
};

function CollapsibleComponent({ state, setState, stateKey, title, names }: { state: any; stateKey: any; setState: any; title: string; names: any }) {
  const toggleCollapse = () => {
    const otherStateKey = stateKey === "owners" ? "players" : "owners";
    setState({ [otherStateKey]: false, [stateKey]: !state[stateKey] });
  };

  if (names.length === 0) {
    return null;
  }

  return (
    <div className="m-4 lg:mx-0 px-4">
      <div onClick={toggleCollapse} className={`flex items-center cursor-pointer select-none`}>
        <span className={`transform transition-transform ${state[stateKey] ? "rotate-180" : "rotate-90"}`}>
          <Image src={"/img/triangle.png"} alt="triangle" width={20} height={20}></Image>
        </span>
        <span className="font-semibold ml-2">{title}</span>
      </div>
      <div className={`p-2 rounded-sm text-left transition-height duration-300 ease-in-out ${state[stateKey] ? "" : "hidden"}`}>
        {names.length > 0 ? (
          names.map((name: any) => (
            <p key={name}>
              {title === "Players" && (
                <span className={cn(Players.find((x) => x.name === name)?.category === "Non Cis Man" ? "text-white" : "text-gold", "mr-2")}>
                  &#9679;
                </span>
              )}
              {name} {title === "Players" && <>(${Players.find((x) => x.name === name)?.price}M)</>}
            </p>
          ))
        ) : (
          <p className="italic">No {title.toLowerCase()}</p>
        )}
      </div>
    </div>
  );
}

function TeamCard({ team, usedBudget, totalBudget }: { team: any; usedBudget: number; totalBudget: number }) {
  const [dropdownOpen, setDropdownOpen] = useState({
    owners: false,
    players: false,
  });

  const remainingBudget = totalBudget - usedBudget;

  const inTeamColors = Object.keys(teamColors).includes(team.name);
  if (!inTeamColors) console.log(team.name);

  return (
    <div className={`w-full`}>
      <Card className={cn(`outline-offset-4 w-full min-h-96 h-full`, inTeamColors && teamColors[team.name])}>
        <div className="p-5 text-center mt-4 drop-shadow-md h-full flex flex-col">
          <div className="relative overflow-hidden mx-auto w-2/5 aspect-1 mb-4">
            <Image
              src={team.logo ? getGoogleDriveImageLink(team.logo, 480) : "/img/149071.png"}
              alt={team.name}
              fill={true}
              className="rounded-full object-cover"
            />
          </div>
          <p className="text-3xl font-bold w-full mb-1">{team.name}</p>
          <CollapsibleComponent state={dropdownOpen} setState={setDropdownOpen} stateKey={"owners"} title={"Owners"} names={team.owners} />
          <div className="mt-auto" />
          <CollapsibleComponent state={dropdownOpen} setState={setDropdownOpen} stateKey={"players"} title={"Players"} names={team.players} />

          <div className="relative w-full rounded-md bg-black/50 h-6  mt-4 overflow-hidden">
            <div className="h-full -z-10 bg-black absolute" style={{ width: `${(remainingBudget / totalBudget) * 100}%` }}></div>
            <p className="text-center text-white text font-bold">${remainingBudget}M</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default TeamCard;
