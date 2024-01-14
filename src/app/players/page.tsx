import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/react';
import Image from 'next/image';

// Sample data
const players = [
  {
    name: 'Anshul Tekriwal',
    imageUrl: '/img/AnshulTekriwal.jpg',
    sport: 'Badminton',
  },
];

function PlayerCard({ player }: { player: any }) {
  const sizeStyle = `w-[250px]`;

  return (
    <Card className={`${sizeStyle} flex rounded-md bg-neutral-700`}>
      <Image
        src={player.imageUrl}
        alt={player.name}
        width={350}
        height={350}
        className={`mx-auto max-w-[248px] max-h-[250px] object-cover rounded-sm object-top`}
      />
      <CardBody>
        <div className='text-center justify-center overflow-hidden py-2 w-full shadow-small z-10'>
          <p className='text-xl font-semibold'>{player.name}</p>
        </div>
      </CardBody>
    </Card>
  );
}

// Timeline Component
export default function Timeline() {
  return (
    <div className='flex flex-col items-center mb-8'>
      <h1 className='text-4xl mt-8 mb-12 text-center font-bold'>Road To RSL</h1>

      <div className='flex flex-col'>
        {players.map((player: any) => {
          return <PlayerCard key={player.name} player={player} />;
        })}
      </div>
    </div>
  );
}
