import { Card, CardBody, Checkbox } from "@nextui-org/react";

export default function HeroSection() {
  return (
    <section className="h-[50%] w-[70%] m-auto grid grid-cols-1 sm:mt-7 sm:mb-4 lg:grid-cols-3 grid-rows-3 lg:grid-rows-1 gap-10">
      <Card className="col-span-1 sm:w-[50%] lg:w-full m-auto">
        <CardBody className="flex flex-row items-center justify-start gap-4">
          <Checkbox
            isReadOnly
            defaultSelected
            id="multicast-check"
            color="primary"
          ></Checkbox>
          <div className="flex flex-col items-start">
            <p className="text-foreground/60">Realtime MultiCast</p>
            <p className="text-foreground">
              Stream Youtube Videos amongst members in sync.
            </p>
          </div>
        </CardBody>
      </Card>

      <Card className="col-span-1 sm:w-[50%] lg:w-full m-auto">
        <CardBody className="flex flex-row items-center justify-start gap-4">
          <Checkbox
            isReadOnly
            defaultSelected
            id="chat-check"
            color="primary"
          ></Checkbox>
          <div>
            <p className="text-foreground/60">Realtime Chat</p>
            <p className="text-foreground">
              Chat with the room members in real time.
            </p>
          </div>
        </CardBody>
      </Card>

      <Card className="col-span-1 sm:w-[50%] lg:w-full m-auto">
        <CardBody className="flex flex-row items-center justify-start gap-4">
          <Checkbox isReadOnly id="drawing-check" color="primary"></Checkbox>
          <div>
            <p className="text-foreground/60">Realtime Drawing</p>
            <p className="text-foreground">
              Draw with members in real time in collaborative canvas.
            </p>
          </div>
        </CardBody>
      </Card>
    </section>
  );
}
