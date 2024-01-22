'use client';

import { Card } from '@nextui-org/card';
import Teams from '@/data/teams.json';
import React, { useState } from 'react';
import Image from 'next/image';
import MaxWidthContainer from '@/components/MaxWidthContainer';

const teamColors: any = {
  'Asawarpur Racketeers': 'bg-[#e0c936]/[0.4] outline-[#e0c936]',
  'Chhatti Pass': 'bg-[#E4080A]/[0.4] outline-[#E4080A]',
  'Club Penguin': 'bg-[#15007D]/[0.4] outline-[#15007D]',
  'Haryana Hit Squad': 'bg-[#EAA9FF]/[0.4] outline-[#EAA9FF]',
  'Illegal Racquets': 'bg-[#35C08E]/[0.4] outline-[#35C08E]',
  'Incognito Mode': 'bg-[#F16192]/[0.4] outline-[#F16192]',
  'Löded Diper': 'bg-[#FE9902]/[0.4] outline-[#FE9902]',
  'Magic Moments': 'bg-[#98794B]/[0.4] outline-[#98794B]',
  'Pineapple Express': 'bg-[#0E7511]/[0.4] outline-[#0E7511]',
  'The Three Racketeers': 'bg-[#84171A]/[0.4] outline-[#84171A]',
  'Theka Sonipat': 'bg-[#911BAF]/[0.4] outline-[#911BAF]',
  'Toofan Express': 'bg-[#22AED1]/[0.4] outline-[#22AED1]',
};

const sortedTeams = Teams.sort((a: any, b: any) => {
  if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
  else if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
  else return 0;
});

function CollapsibleComponent({ state, setState, stateKey, title, names }: { state: any; stateKey: any; setState: any; title: string; names: any }) {
  const toggleCollapse = () => {
    console.log(stateKey);
    console.log(state);
    const otherStateKey = stateKey === 'owners' ? 'players' : 'owners';
    setState({ [otherStateKey]: false, [stateKey]: !state[stateKey] });
  };

  return (
    <div className='m-4 px-4'>
      <div onClick={toggleCollapse} className={`flex items-center cursor-pointer select-none`}>
        <span className={`transform transition-transform ${state[stateKey] ? 'rotate-180' : 'rotate-90'}`}>
          <Image src={'/img/triangle.png'} alt='triangle' width={20} height={20}></Image>
        </span>
        <span className='font-semibold ml-2'>{title}</span>
      </div>
      <div className={`p-2 rounded-sm m-1 text-left transition-height duration-300 ease-in-out ${state[stateKey] ? '' : 'hidden'}`}>
        {names.length > 0 ? names.map((name: any) => <p key={name}>{name}</p>) : <p className='italic'>No {title.toLowerCase()}</p>}
      </div>
    </div>
  );
}

function TeamCard({ team }: { team: any }) {
  const [dropdownOpen, setDropdownOpen] = useState({ owners: false, players: false });

  return (
    <div className={`w-full `}>
      <Card className={`${teamColors[team.name]} outline-offset-4 w-full min-h-96`}>
        <div className='p-5 text-center mt-4 drop-shadow-md'>
          <div className='relative overflow-hidden mx-auto w-2/5 aspect-1 mb-4'>
            <Image
              src={team.logo ? `https://lh3.googleusercontent.com/d/${team.logo}=s480` : '/img/149071.png'}
              alt={team.name}
              fill={true}
              className='rounded-full object-cover'
            />
          </div>
          <p className='text-3xl font-bold w-full mb-1'>{team.name}</p>
          <CollapsibleComponent state={dropdownOpen} setState={setDropdownOpen} stateKey={'owners'} title={'Owners'} names={team.owners} />
          <CollapsibleComponent state={dropdownOpen} setState={setDropdownOpen} stateKey={'players'} title={'Players'} names={team.players} />
        </div>
      </Card>
    </div>
  );
}

// Timeline Component
export default function TeamPge() {
  return (
    <div className='items-center mb-8'>
      <h1 className='text-4xl my-8 text-center font-bold'>Teams</h1>

      <MaxWidthContainer>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto w-5/6 sm:w-full'>
          {sortedTeams.map((team: any, i: any) => {
            return <TeamCard key={team.name} team={team} />;
          })}
        </div>
      </MaxWidthContainer>
    </div>
  );
}
