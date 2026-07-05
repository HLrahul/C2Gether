export interface JoinRoomData {
  roomId: string;
  username: string;
  password?: string;
}

export interface User {
  id: string;
  username: string;
  roomId: string;
}
