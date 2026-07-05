export interface Room {
  id: string;
  password?: string;
}

const rooms = new Map<string, Room>();

export const getRoom = (roomId: string): Room | undefined => {
  return rooms.get(roomId);
};

export const createRoomData = (roomId: string, password?: string): Room => {
  const room: Room = {
    id: roomId,
    password,
  };
  rooms.set(roomId, room);
  return room;
};

export const deleteRoomData = (roomId: string) => {
  rooms.delete(roomId);
};
