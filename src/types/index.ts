export interface BookRoomDTO {
  userId: number;
  roomId: number;
  slots: number[];
}

export interface SlotsCountByRoom {
  roomId: number;
  slotsCount: number;
}
