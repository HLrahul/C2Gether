import { Divider } from "@nextui-org/react";
import VideoLinkInput from "./VideoLinkInput";
import VideoSearchBar from "./VideoSearchBar";
import { useAdminStore } from "@/store/userStore";

export default function VideoInputGroup() {
  const { isAdmin } = useAdminStore();

  return (
    <div className={`row-span-1 col-span-8 ${isAdmin ? "" : "hidden mt-10"} `}>
      <VideoSearchBar />
      <div className="flex gap-1 items-center mt-2 mb-2 justify-between">
        <Divider className="w-[47.5%]" />
        <p className="text-[0.7rem] text-primary-400">OR</p>
        <Divider className="w-[47.5%]" />
      </div>
      <VideoLinkInput />
    </div>
  );
}
