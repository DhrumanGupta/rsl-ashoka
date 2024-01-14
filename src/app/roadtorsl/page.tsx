import cn from "@/lib/cn";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import "./styles.css";

// Sample data
const events = [
  {
    date: "22/22/2023",
    title: "Day 1 Test",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam nisl nunc eu nisl. Sed vitae nisl eget nisl aliquam ultricies. Sed vitae nisl eget nisl aliquam ultricies.",
    imageUrl: "https://picsum.photos/700/700",
  },
  {
    date: "22/22/2023",
    title: "Day 2 Test",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam nisl nunc eu nisl. Sed vitae nisl eget nisl aliquam ultricies. Sed vitae nisl eget nisl aliquam ultricies.",
    imageUrl: "https://picsum.photos/700/700",
  },
  {
    date: "22/22/2023",
    title: "Day 3 Test",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam nisl nunc eu nisl. Sed vitae nisl eget nisl aliquam ultricies. Sed vitae nisl eget nisl aliquam ultricies.",
    imageUrl: "https://picsum.photos/700/700",
  },
  {
    date: "22/22/2023",
    title: "Day 4 Test",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam nisl nunc eu nisl. Sed vitae nisl eget nisl aliquam ultricies. Sed vitae nisl eget nisl aliquam ultricies.",
    imageUrl: "https://picsum.photos/700/700",
  },
  {
    date: "22/22/2023",
    title: "Day 5 Test",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam nisl nunc eu nisl. Sed vitae nisl eget nisl aliquam ultricies. Sed vitae nisl eget nisl aliquam ultricies.",
    imageUrl: "https://picsum.photos/700/700",
  },
  {
    date: "22/22/2023",
    title: "Day 6 Test",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam nisl nunc eu nisl. Sed vitae nisl eget nisl aliquam ultricies. Sed vitae nisl eget nisl aliquam ultricies.",
    imageUrl: "https://picsum.photos/700/700",
  },

  {
    date: "22/22/2023",
    title: "Day 3 Test",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam nisl nunc eu nisl. Sed vitae nisl eget nisl aliquam ultricies. Sed vitae nisl eget nisl aliquam ultricies.",
    imageUrl: "https://picsum.photos/700/700",
  },
  {
    date: "22/22/2023",
    title: "Day 4 Test",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam nisl nunc eu nisl. Sed vitae nisl eget nisl aliquam ultricies. Sed vitae nisl eget nisl aliquam ultricies.",
    imageUrl: "https://picsum.photos/700/700",
  },
  {
    date: "22/22/2023",
    title: "Day 5 Test",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam nisl nunc eu nisl. Sed vitae nisl eget nisl aliquam ultricies. Sed vitae nisl eget nisl aliquam ultricies.",
    imageUrl: "https://picsum.photos/700/700",
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
          <Card isFooterBlurred className="card-front flex items-center">
            <Image
              src={event.imageUrl}
              alt={event.title}
              width={350}
              height={350}
              radius="lg"
              className={`max-w-[250px] md:max-w-[300px] max-h-[250px] md:max-h-[300px] object-cover`}
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
              <p className="text-base">{event.description}</p>
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
      <h1 className="text-4xl my-8 text-center font-bold">Road To RSL</h1>

      <div className="flex flex-col">
        {events2D.map((eventRow: any, i: any) => {
          return (
            <div key={i} className="flex flex-col lg:flex-row items-stretch">
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
