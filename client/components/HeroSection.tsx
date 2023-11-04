import { Card, CardHeader, CardFooter, Image } from "@nextui-org/react";


export default function HeroSection () {
    

    return (
      <section className="h-auto min-w-[70%] m-auto mt-[4rem] mb-[10vh] flex flex-col gap-[2rem] sm:flex-col md:flex-col lg:flex-row items-center justify-between">
        <Card
          isFooterBlurred
          className="col-span-12 sm:col-span-4 h-[200px] w-[300px]"
        >
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover"
            src="/multistream.jpg"
          />
          <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-default-600 dark:border-default-100 gap-4">
            <p className="text-tiny text-white/60 uppercase font-bold">
              Realtime Stream
            </p>
            <h4 className="text-white font-medium text-small">
              Watch videos together
            </h4>
          </CardFooter>
        </Card>

        <Card
          isFooterBlurred
          className="col-span-12 sm:col-span-4 h-[200px] w-[300px]"
        >
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover"
            src="/chat.jpg"
          />
          <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-default-600 dark:border-default-100 gap-4">
            <p className="text-tiny text-white/60 uppercase font-bold">
              Realtime Chat
            </p>
            <h4 className="text-white font-medium text-small">
              Chat with other members
            </h4>
          </CardFooter>
        </Card>

        <Card
          isFooterBlurred
          className="col-span-12 sm:col-span-4 h-[200px] w-[300px]"
        >
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover"
            src="/multistream.jpg"
          />
          <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-default-600 dark:border-default-100 gap-4">
            <p className="text-tiny text-white/60 uppercase font-bold">
              Realtime Drawing
            </p>
            <h4 className="text-white font-medium text-small">
              Collaborate in Canvas
            </h4>
          </CardFooter>
        </Card>
      </section>
    );
}