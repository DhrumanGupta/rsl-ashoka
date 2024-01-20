import cn from '@/lib/cn';
import { Card, CardBody, CardFooter } from '@nextui-org/card';
import Link from 'next/link';
import Teams from '@/data/teams.json';
import MaxWidthContainer from '@/components/MaxWidthContainer';

const teamColors: any = {
  'Asawarpur Racketeers': 'bg-[#35C08E] outline-[#35C08E]',
  'Chhatti Pass': 'bg-[#E4080A] outline-[#E4080A]',
  'Club Penguin': 'bg-[#22AED1] outline-[#22AED1]',
  'Haryana Hit Squad': 'bg-[#84171A] outline-[#84171A]',
  'Illegal Racquets': 'bg-[#36827F] outline-[#36827F]',
  'Incognito Mode': 'bg-gray-800 outline-gray-800',
  'Löded Diper': 'bg-[#F16192] outline-[#F16192]',
  'Magic Moments': 'bg-[#4169E1] outline-[#4169E1]',
  'Pineapple Express': 'bg-[#e0c936] outline-[#e0c936]',
  'The Three Racketeers': 'bg-[#911BAF] outline-[#911BAF]',
  'Theka Sonipat': 'bg-[#0E7511] outline-[#0E7511]',
  'Toofan Express': 'bg-[#FE9902] outline-[#FE9902]',
};

const sortedTeams = Teams.sort((a: any, b: any) => {
  if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
  else if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
  else return 0;
});

function TeamCard({ team }: { team: any }) {
  return (
    <div className='card-container'>
      <div className={`card aspect-w-10 aspect-h-13 w-full h-full`}>
        {/* Front of the Card */}
        <Card className={`${teamColors[team.name]} outline-offset-4 card-front w-full`}>
          <div className='p-5 text-center my-auto drop-shadow-md'>
            <p className='text-3xl font-bold w-full'>{team.name}</p>
            <p className='font-semibold mt-4 mb-0 underline'>Manager</p>
            <p>{team.manager}</p>
            <p className='font-semibold mt-2 mb-0 underline'>Owners</p>
            {team.owners.map((owner: any) => (
              <p key={owner}>{owner}</p>
            ))}
          </div>
        </Card>

        {/* Back of the Card */}
        <Card className={`${teamColors[team.name]} outline-offset-4 card-back p-5 z-10 w-full h-full`}>
          <div className='flex flex-col items-center justify-center h-full'>
            {team.players.length > 0 ? (
              <div>
                <p className='text-lg font-semibold'>Players</p>
                {team.players.map((player: any) => (
                  <p key={player} className='text-center'>
                    {player}
                  </p>
                ))}
              </div>
            ) : (
              <p className='text-center'>Players will be selected after the Auction!</p>
            )}
          </div>
        </Card>
      </div>
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
