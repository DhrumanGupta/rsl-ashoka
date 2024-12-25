import cn from "@/lib/cn";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import Image from "next/image";
import Link from "next/link";

// Sample data
const events = [
  {
    date: "4th December",
    title: "Owner registration",
    description:
      "A total of 15 teams registered for the league. Watch as the owners meticulously scout players over the coming days!",
    imageUrl: "/ownerregistration.webp",
  },
  {
    date: "22nd December",
    title: "Player Registration",
    description: "Player registrations are closed! Get ready for game time!",
    imageUrl:
      "https://lh3.googleusercontent.com/d/1XAi8Anp0W7IAwGaIxOsD15QUWnyU1KFE=s1080",
    imageUrlBlur:
      "https://lh3.googleusercontent.com/d/1XAi8Anp0W7IAwGaIxOsD15QUWnyU1KFE=s144",
  },
  {
    date: "20th - 21st January",
    title: "Scouting",
    description:
      "Teams will be scouting players to build their teams! Watch as the teams battle it out to build the best team.",
    link: "https://docs.google.com/spreadsheets/d/1aCaRzk2X6Tp02gVGiYeKnOZrhoEOc-Ora4sCKp6NAuk/edit",
    linkText: "Scouting Schedule",
    imageUrl: "/binocular.jpeg",
  },
  {
    date: "22nd January",
    title: "Auction",
    description:
      "Teams battle it out to build not only a single best team, but four best teams! Watch as the teams drain their wallets to build what is needed to win!",
    link: "https://docs.google.com/document/d/1FI8z1V3RM2jDNglKPXott7nW5CozqJIMKV-wlnKJgRk/edit",
    linkText: "View Rules",
    imageUrl: "/auction.jpg",
  },
  {
    date: "Soon",
    title: "Practice",
    description:
      "Teams will be practicing to get ready for the league! Watch as the teams battle it out to build the best team.",
    imageUrl: "/practice.jpg",
  },
  {
    date: "29th Jan - 2nd Feb",
    title: "RSL",
    description: "The first ever RSL is here!",
    imageUrl: "/logo.png",
    imageContain: true,
  },
];

function convertTo2DArray(arr: any) {
  let result = [];
  for (let i = 0; i < arr.length; i += 3) {
    let row = arr.slice(i, i + 3);
    if (Math.floor(i / 3) % 2 === 1) {
      // Check if the row index is odd
      row.reverse();
    }
    result.push(row);
  }
  return result;
}

function EventCard({
  event,
  i,
  j,
  today,
}: {
  event: any;
  i: number;
  today: Date;
  j: number;
}) {
  const sizeStyle = `w-[250px] md:w-[300px] h-[250px] md:h-[300px]`;
  const date = new Date(event.date);

  return (
    <div
      className={cn(
        "flex flex-col lg:flex-row my-auto relative",
        ((j % 3 === 0 && i % 2 === 0) || (j % 3 === 2 && i % 2 === 1)) &&
          "lg:flex-col",
        i % 2 === 1 && j % 3 !== 2 && "lg:flex-row-reverse"
      )}
    >
      {!(i === 0 && j === 0) && (
        <div
          className={cn(
            "m-auto border-2 z-0 w-[0px] py-4",
            date <= today && "border-primary",
            date > today && "border-neutral-100",
            j % 3 === 0 && i % 2 === 0 && "lg:w-[0px] lg:pt-16",
            j % 3 === 2 && i % 2 === 1 && "lg:w-[0px] lg:pt-16",
            j % 3 !== 0 && i % 2 === 0 && "lg:h-[0px] lg:px-10 lg:py-0",
            j % 3 !== 2 && i % 2 === 1 && "lg:h-[0px] lg:px-10 lg:py-0"
          )}
        ></div>
      )}

      <div className="m-auto z-0 absolute w-full h-full flex">
        <span
          className={cn(
            "border-2 w-0 h-0 my-auto hidden lg:inline-block",
            j % 3 === 0 && "w-1/2 transform translate-x-full",
            j % 3 === 1 && "w-full",
            j % 3 === 2 && "w-1/2"
          )}
        ></span>
      </div>

      <div
        className={cn(
          "card-container",
          (!((j % 3 === 0 && i % 2 === 0) || (j % 3 === 2 && i % 2 === 1)) ||
            (i === 0 && j === 0)) &&
            i !== 0 &&
            "lg:mt-20"
        )}
      >
        <div className={`card ${sizeStyle}`}>
          {/* Front of the Card */}
          <Card
            isFooterBlurred
            className="card-front flex items-center w-full h-full"
          >
            <Image
              src={event.imageUrl}
              blurDataURL={event.imageUrlBlur}
              // placeholder="blur"
              placeholder={event.imageUrlBlur && "blur"}
              alt={event.title}
              // width={350}
              // height={350}
              fill={true}
              // radius="lg"
              className={event.imageContain ? "object-contain" : `object-cover`}
            />
            <CardFooter className="text-center justify-center before:bg-black/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small z-10">
              <div>
                <p className="text-xl md:text-2xl font-bold">{event.title}</p>
                <p className="text-sm md:text-base">{event.date}</p>
              </div>
            </CardFooter>
          </Card>

          {/* Back of the Card */}
          <Card className={`card-back bg-zinc-900 p-5 ${sizeStyle} z-10`}>
            <CardBody className="text-center">
              <p className="text-2xl font-bold mt-2 mb-4">{event.title}</p>
              <p className="text-base my-auto pb-2">{event.description}</p>
              {event.link && event.linkText && (
                <Link
                  href={event.link}
                  target="_blank"
                  className="text-blue-500 underline decoration-blue-500"
                >
                  {event.linkText}
                </Link>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Timeline Component
export default function Timeline() {
  const today = new Date();

  // convert events into a 2D array witth 3 items per row with alternate rows reversed
  const events2D = convertTo2DArray(events);

  return (
    <div className="flex flex-col items-center mb-8">
      <h1 className="text-4xl my-8 text-center font-bold">Timeline</h1>

      <div className="flex flex-col">
        {events2D.map((eventRow: any, i: any) => {
          return (
            <div
              key={i}
              className={cn(
                "flex flex-col lg:flex-row items-stretch",
                i % 2 === 1 && "flex-col-reverse"
              )}
            >
              {eventRow.map((event: any, j: any) => {
                return (
                  <EventCard
                    key={event.date}
                    event={event}
                    i={i}
                    j={j}
                    today={today}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
