'use client';

import { useState } from 'react';

import { Card, CardBody, CardFooter, Tab, Tabs } from '@nextui-org/react';

import ChatWindow from './ChatWindow';
import InviteMembersButton from './InviteMemmbersButton';
import LeaveButton from './LeaveButton';
import MembersList from './MembersList';

export default function RoomSidebar() {
  const [selected, setSelected] = useState<string | number>('chat');

  return (
    <div className="flex flex-col h-full max-h-full w-full min-w-[300px]">
      <div className="flex w-full flex-col h-full">
        <Tabs
          aria-label="Sidebar Tabs"
          selectedKey={selected}
          onSelectionChange={(key) => setSelected(key as string | number)}
          variant="solid"
          classNames={{
            tabList:
              'w-full gap-2 relative rounded-2xl p-1 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 shadow-inner',
            cursor:
              'w-full bg-white dark:bg-white/10 rounded-xl shadow-sm border border-black/5 dark:border-white/10',
            tab: 'flex-1 px-4 h-10',
            tabContent:
              'group-data-[selected=true]:text-primary font-medium text-gray-500 transition-colors',
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
                className="h-full border border-white/5 bg-white/5 backdrop-blur-md backdrop-saturate-150 flex flex-col"
              >
                <CardBody className="flex flex-col flex-1 items-center p-4 overflow-y-auto">
                  <InviteMembersButton />
                  <div className="my-4 flex-grow w-full">
                    <MembersList />
                  </div>
                </CardBody>
                <CardFooter className="p-0">
                  <LeaveButton />
                </CardFooter>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
