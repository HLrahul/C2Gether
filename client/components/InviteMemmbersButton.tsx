"use client";

import { useState } from "react";
import { Button } from "@nextui-org/react";
import { useParams } from "next/navigation";

export default function InviteMembersButton() {
  const { roomId } = useParams();
  const currentUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${roomId}`;

  const [buttonText, setButtonText] = useState<string>("Invite members");

  return (
    <>
      <Button
        className="w-full"
        variant="solid"
        color="primary"
        onClick={() => { navigator.clipboard.writeText(currentUrl); setButtonText("Copied!"); setTimeout(() => setButtonText("Invite members"), 1000); }}
      >
        { buttonText }
      </Button>
    </>
  );
}
