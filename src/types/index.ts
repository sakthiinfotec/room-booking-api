export interface BookRoomDTO {
  userId: number;
  roomId: number;
  slots: number[];
}

export interface SlotsCountByRoom {
  roomId: number;
  slotsCount: number;
}

export interface ErrorType {
  status: number;
  error: string;
}
