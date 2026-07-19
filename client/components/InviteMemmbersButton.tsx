'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@nextui-org/react';

export default function InviteMembersButton() {
  const { roomId } = useParams();
  const currentUrl = `https://collab-study-client.vercel.app/${roomId}`;
  const [buttonText, setButtonText] = useState<string>('Invite members');

  const shareData = {
    title: 'C2Gether Invitation',
    text: 'I would like to invite you to join this room.',
    url: currentUrl,
  };

  const handleShare = () => {
    const isChromeDesktop =
      /Chrome/.test(navigator.userAgent) &&
      !('ontouchstart' in window) &&
      !/Android/.test(navigator.userAgent);

    if (navigator.share && !isChromeDesktop) {
      navigator
        .share(shareData)
        .then(() => {
          setButtonText('Shared!');
          setTimeout(() => setButtonText('Invite members'), 1000);
        })
        .catch((err) => {
          console.error('Share failed:', err.message);
        });
    } else {
      navigator.clipboard.writeText(currentUrl);
      setButtonText('Link Copied!');
      setTimeout(() => setButtonText('Invite members'), 1000);
    }
  };

  return (
    <>
      <Button
        className="w-full"
        variant="solid"
        color="primary"
        onClick={handleShare}
      >
        {buttonText}
      </Button>
    </>
  );
}
