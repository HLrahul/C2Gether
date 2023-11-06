import { Card, CardBody, Checkbox } from "@nextui-org/react";

export default function HeroSection () {
    

    return (
      <section className="h-auto w-[70%] m-auto mt-[4rem] mb-[10vh] flex flex-col sm:flex-col md:flex-col lg:flex-row items-center justify-between gap-10">
        <Card>
          <CardBody className="flex flex-row items-center justify-center gap-4">
            <Checkbox
              isReadOnly
              defaultSelected
              id="multicast-check"
              color="primary"
            ></Checkbox>
            <div>
              <p className="text-foreground/60">Realtime MultiCast</p>
              <p className="text-foreground">
                Stream Youtube Videos amongst room members in sync.
              </p>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="flex flex-row items-center justify-center gap-4">
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

        <Card>
          <CardBody className="flex flex-row items-center justify-center gap-4">
            <Checkbox
              isReadOnly
              defaultSelected
              id="drawing-check"
              color="primary"
            ></Checkbox>
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