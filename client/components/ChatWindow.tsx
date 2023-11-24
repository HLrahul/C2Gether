import LiveChatInput from "@/components/LiveChatInput";
import { Card, CardBody, CardFooter, CardHeader, Divider } from "@nextui-org/react";

export default function ChatWindow () {

    return (
        <div className="col-span-8 md:col-span-3 h-full">
            <Card isBlurred className="h-full">
                <CardHeader>
                    <p className="text-primary">Live Chat</p>
                </CardHeader>
                <Divider />
                <CardBody className="overflow-y-auto"></CardBody>
                <Divider />
                <CardFooter>
                    <LiveChatInput />
                </CardFooter>
            </Card>
        </div>
    )
}