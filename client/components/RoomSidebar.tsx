'use client';

import { useState } from 'react';

import { Card, CardBody, Tab, Tabs } from '@nextui-org/react';

import ChatWindow from './ChatWindow';
import InviteMembersButton from './InviteMemmbersButton';
import LeaveButton from './LeaveButton';
import MembersList from './MembersList';

export default function RoomSidebar() {
  const [selected, setSelected] = useState<string | number>('chat');

  return (
    <div className="col-span-8 md:col-span-2 flex flex-col h-full max-h-full">
      <div className="flex w-full flex-col h-full">
        <Tabs
          aria-label="Sidebar Tabs"
          selectedKey={selected}
          onSelectionChange={(key) => setSelected(key as string | number)}
          variant="light"
          classNames={{
            tabList:
              'w-full gap-2 relative rounded-md p-1 border-b border-divider',
            cursor: 'w-full bg-primary/20',
            tab: 'max-w-fit px-4 h-10',
            tabContent: 'group-data-[selected=true]:text-primary',
          }}
        >
          <Tab key="chat" title="Chat" />
          <Tab key="members" title="Members" />
        </Tabs>

        <div className="flex-grow mt-2 h-0 relative">
          {selected === 'chat' && (
            <div className="absolute inset-0">
              <ChatWindow />
            </div>
          )}

          {selected === 'members' && (
            <div className="absolute inset-0">
              <Card
                isBlurred
                className="h-full border border-white/5 bg-white/5 backdrop-blur-md backdrop-saturate-150"
              >
                <CardBody className="flex flex-col h-full items-center p-4">
                  <InviteMembersButton />
                  <div className="my-4 flex-grow w-full">
                    <MembersList />
                  </div>
                  <LeaveButton />
                </CardBody>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
