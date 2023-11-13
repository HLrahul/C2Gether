import { Divider } from "@nextui-org/react";
import VideoLinkInput from "./VideoLinkInput";
import VideoSearchBar from "./VideoSearchBar";

export default function VideoInputGroup () {

    return (
        <div className="row-span-1 col-span-8">
            <VideoSearchBar />

            <div className="flex gap-1 items-center mt-2 mb-2">
                <Divider className="w-[48.5%]" />
                <p className="text-[0.7rem] text-primary-400">OR</p>
                <Divider className="w-[48.5%]" />
            </div>

            <VideoLinkInput />
        </div>
    )
}