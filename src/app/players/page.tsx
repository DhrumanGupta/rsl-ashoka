'use client';

import cn from '@/lib/cn';
import { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/react';
import Image from 'next/image';

// Sample data
const players = [
  {
    name: 'Anshul Tekriwal',
    imageUrl: '/img/AnshulTekriwal.jpg',
    sports: ['badminton', 'tableTennis'],
    tier: 1,
  },
];

const icons: { [key: string]: string } = {
  badminton: '/img/badminton.svg',
  tableTennis: '/img/tt.webp',
  tennis: '/img/tennis.png',
  squash: '/img/squash.png',
};

const noTiers = 4;

function PlayerCard({ player }: { player: any }) {
  const sizeStyle = `w-[250px]`;

  return (
    <Card
      className={cn(
        `${sizeStyle} flex rounded-md bg-primary border-2`,
        player.tier === 1 && 'text-amber-300 border-amber-300',
        player.tier === 2 && 'text-gray-200 border-gray-200',
        player.tier === 3 && 'text-amber-600 border-amber-600',
        player.tier === 4 && 'text-cyan-400 border-cyan-400'
      )}>
      <Image
        src={player.imageUrl}
        alt={player.name}
        width={350}
        height={350}
        className={`mx-auto max-w-[250px] max-h-[250px] object-cover rounded-sm object-top`}
      />
      <CardBody>
        <div className='text-center justify-center overflow-hidden py-2 w-full shadow-small z-10'>
          <p className='text-[24px] font-bold'>{player.name}</p>
          <div className='max-w-fit flex items-center gap-2 mx-auto'>
            {player.sports.map((sport: string) => {
              return (
                <Image
                  key={sport}
                  src={icons[sport]}
                  alt={sport}
                  width={20}
                  height={20}
                  className={`mx-auto max-w-[20px] max-h-[20px] object-cover rounded-sm object-top`}
                />
              );
            })}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

// Timeline Component
export default function Timeline() {
  const [tier, setTier] = useState(1);

  return (
    <div className='flex flex-col items-center mb-8'>
      <div className='my-20 mx-auto text-center'>
        <h1 className='text-8xl my-4 text-center font-semibold text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-secondary'>
          THE PLAYERS
        </h1>
        <p>See the players in each tier. Click on the tier to see the players in</p>
      </div>

      <div className='my-6 flex gap-4'>
        {
          // @ts-ignore
          [...Array(noTiers).keys()].map((tierNo) => {
            return (
              <button
                key={tierNo}
                onClick={() => setTier(tierNo + 1)}
                className={cn(
                  `flex flex-col items-center justify-center text-center rounded-full py-[2px] px-4`,
                  tierNo === 0 && 'text-amber-300 bg-amber-300/20',
                  tierNo === 1 && 'text-gray-300 bg-gray-300/20',
                  tierNo === 2 && 'text-amber-600 bg-amber-600/20',
                  tierNo === 3 && 'text-cyan-400 bg-cyan-400/20'
                )}>
                <p className='text-lg font-medium'>Tier {tierNo + 1}</p>
              </button>
            );
          })
        }
      </div>

      <div
        className={cn(
          'w-full py-8',
          tier === 1 && ' bg-amber-400/[0.25]',
          tier === 2 && ' bg-gray-400/[0.25]',
          tier === 3 && ' bg-amber-700/[0.25]',
          tier === 4 && ' bg-cyan-500/[0.25]'
        )}>
        <p
          className={cn(
            'mb-6 font-bold text-3xl mx-auto text-center',
            tier === 1 && 'text-amber-300',
            tier === 2 && 'text-gray-300',
            tier === 3 && 'text-amber-600',
            tier === 4 && 'text-cyan-400'
          )}>
          TIER {tier}
        </p>

        <div className='flex flex-col mx-auto w-3/4 items-center'>
          {players
            .filter((player: any) => player.tier == tier)
            .map((player: any) => {
              return <PlayerCard key={player.name} player={player} />;
            })}
        </div>
      </div>
    </div>
  );
}
