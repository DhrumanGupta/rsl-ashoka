'use client';

import cn from '@/lib/cn';
import { useState } from 'react';
import { Card, CardBody } from '@nextui-org/card';
import Image from 'next/image';
import { Button } from '@nextui-org/button';
import MaxWidthContainer from '@/components/MaxWidthContainer';
import players from '@/data/players.json';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/modal';
import BadmintonSVG from '@/../public/img/badminton.svg';
import TableTennisSVG from '@/../public/img/tt.svg';
import TennisSVG from '@/../public/img/tennis.svg';
import SquashSVG from '@/../public/img/squash.svg';
import Link from 'next/link';

const sortedPlayers = players.sort((a: any, b: any) => {
  if (a.name < b.name) return -1;
  else if (a.name > b.name) return 1;
  else return 0;
});

const icons: { [key: string]: any } = {
  badminton: BadmintonSVG,
  tableTennis: TableTennisSVG,
  tennis: TennisSVG,
  squash: SquashSVG,
};

const sportNames: { [key: string]: string } = {
  badminton: 'Badminton',
  tableTennis: 'Table Tennis',
  tennis: 'Tennis',
  squash: 'Squash',
};
const noTiers = 4;

function PlayerCard({ player, openModal }: { player: any; openModal: any }) {
  return (
    <div className='w-full aspect-w-10 aspect-h-13 hover:scale-[1.05] transition-all duration-300 ease-in-out'>
      <Card
        className={cn(
          `!absolute w-full rounded-md bg-primary border-2`,
          player.tier === 1 && 'text-gold border-gold',
          player.tier === 2 && 'text-silver border-silver',
          player.tier === 3 && 'text-bronze border-bronze',
          player.tier === 4 && 'text-fourth border-fourth'
        )}
        isPressable
        isHoverable={false}
        onClick={openModal}>
        <Image
          src={`https://lh3.googleusercontent.com/d/${player.photo}=s1080`}
          blurDataURL={`https://lh3.googleusercontent.com/d/${player.photo}=s144`}
          alt={player.name}
          placeholder='blur'
          width={500}
          height={500}
          className={cn(
            `mx-auto w-full aspect-1 object-cover rounded-sm`,
            player.imagePosition === 'c' && `object-center`,
            player.imagePosition === 'l' && `object-left`,
            player.imagePosition === 'r' && `object-right`,
            player.imagePosition === 't' && `object-top`,
            player.imagePosition === 'b' && `object-bottom`
          )}
        />
        <CardBody>
          <div className='text-center justify-center overflow-hidden my-auto w-full z-10'>
            <p className='text-[24px] font-bold'>{player.name}</p>
            <div className='max-w-fit flex items-center gap-2 mx-auto'>
              {player.sports.map(
                (sport: string) =>
                  sport && (
                    <Image
                      key={sport}
                      src={icons[sport]}
                      alt={sport}
                      width={20}
                      height={20}
                      className={`mx-auto max-w-[20px] max-h-[20px] object-cover rounded-sm`}
                    />
                  )
              )}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

function PlayerModal({ player, isOpen, onOpenChange }: { player: any; isOpen: boolean; onOpenChange: any }) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop='blur' placement='center'>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>
              <p className='underline underline-offset-[3px]'>
                {player.name} ({player.category})
              </p>
              {player.team !== '' && player.price > 0 && (
                <p className='!font-normal  text-base'>
                  Sold to <span className='font-semibold'>{player.team}</span> for{' '}
                  <span className='font-semibold text-[#118C4F]'>${player.price}</span>
                </p>
              )}
            </ModalHeader>
            <ModalBody>
              <p className='leading-1'>
                <span className='font-semibold'>About Me</span> <br></br>
                {player.bio}
              </p>
              <hr />
              <p className='font-semibold'>Preferences</p>
              {player.sports.map((sport: string, i: number) => {
                const preferenceNo = ['1st', '2nd', '3rd'][i];
                return (
                  <p className='leading-[0.5rem]' key={sport}>
                    <span className='font-medium'>{preferenceNo}:</span> {sportNames[sport]}
                  </p>
                );
              })}
            </ModalBody>
            <ModalFooter>
              <Button color='secondary' variant='light' onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

// Players Page Component
export default function Timeline() {
  const [player, setPlayer] = useState(players[0]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div className='fixed hidden max-w-fit max-h-fit z-20 min-[1080px]:flex flex-col gap-10 mr-12 min-[1280px]:mr-16 inset-y-0 right-0 my-auto'>
        {
          // @ts-ignore
          [...Array(noTiers).keys()].map((tier) => {
            tier++;
            return (
              <Link
                key={tier}
                color='secondary'
                className={cn(
                  'text-base md:text-lg font-semibold rounded-full p-3 md:p-4 backdrop-brightness-50',
                  tier == 1 && 'text-gold bg-amber-600/[0.85]',
                  tier == 2 && 'text-silver bg-gray-500/[0.85]',
                  tier == 3 && 'text-bronze bg-amber-800/[0.85]',
                  tier == 4 && 'text-fourth bg-cyan-800/[0.85]'
                )}
                href={`#tier${tier}`}>
                Tier {tier}
              </Link>
            );
          })
        }
      </div>
      <div className='w-full items-center mb-8'>
        <PlayerModal player={player} isOpen={isOpen} onOpenChange={onOpenChange} />
        <MaxWidthContainer className='mt-16 mb-12 md:mb-16 text-center'>
          {/* <h1 className='text-[40px] md:text-8xl my-4 text-center font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-300'> */}
          <h1 className='text-5xl md:text-8xl my-4 text-center font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400'>
            THE PLAYERS
          </h1>
          {/* <p className='text-base md:text-lg'>See the players in each tier. Click on the tier to see the players in</p> */}
        </MaxWidthContainer>

        {
          // @ts-ignore
          [...Array(noTiers).keys()].map((tier) => {
            tier++;
            return (
              <div
                className={cn(
                  'w-full py-8',
                  tier === 1 && ' bg-gold/[0.25]',
                  tier === 2 && ' bg-silver/[0.25]',
                  tier === 3 && ' bg-bronze/[0.25]',
                  tier === 4 && ' bg-fourth/[0.25]'
                )}
                id={`tier${tier}`}
                key={tier}>
                <p
                  className={cn(
                    'mb-6 font-semibold text-5xl mx-auto text-center',
                    tier === 1 && 'text-gold',
                    tier === 2 && 'text-silver',
                    tier === 3 && 'text-bronze',
                    tier === 4 && 'text-fourth'
                  )}>
                  TIER {tier}
                </p>

                <MaxWidthContainer>
                  <div className='grid grid-cols-1 sm:grid-cols-2 min-[1080px]:grid-cols-3 mx-auto items-center gap-12 w-11/12 md:w-full'>
                    {sortedPlayers
                      .filter((player: any) => player.tier == tier)
                      .map((player: any) => {
                        return (
                          <PlayerCard
                            key={player.name}
                            player={player}
                            openModal={() => {
                              setPlayer(player);
                              onOpen();
                            }}
                          />
                        );
                      })}
                  </div>
                </MaxWidthContainer>
              </div>
            );
          })
        }
      </div>
    </>
  );
}
