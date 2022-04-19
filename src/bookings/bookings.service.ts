import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { RoomsService } from './../rooms/rooms.service';
import { SlotsService } from 'src/slots/slots.service';
import { BookRoomDTO, SlotsCountByRoom } from 'src/types';
import { Booking } from './booking.entity';
import { Room } from 'src/rooms/room.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    private slotsService: SlotsService,
    private roomService: RoomsService,
  ) { }

  async findAllBookings(cancelled = false): Promise<Booking[]> {
    return await this.bookingRepository.find({
      where: {
        cancelled,
      },
    });
  }

  async create(booking: BookRoomDTO): Promise<Booking[] | HttpException> {
    const { userId, roomId } = booking;
    const [availableRooms, availableSlots] = await Promise.all([
      this.findAvailableRooms(),
      this.slotsService.findAvailableSlots(roomId),
    ]);

    if (!availableRooms.find((room) => room.id === roomId)) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: `Room ${roomId} not available for booking`,
        },
        HttpStatus.FORBIDDEN,
      );
    }

    for (const slotId of booking.slots) {
      if (!availableSlots.find((slot) => slot.id === slotId)) {
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error: `Slot ${slotId} out of [${booking.slots}] is not available for booking`,
          },
          HttpStatus.FORBIDDEN,
        );
      }
    }

    const bookingArr = booking.slots.map((slotId) =>
      this.bookingRepository.create({
        userId,
        roomId,
        slotId,
        cancelled: false,
      } as Booking),
    );
    return await this.bookingRepository.save(bookingArr);
  }

  async update(booking: Booking): Promise<UpdateResult> {
    return await this.bookingRepository.update(booking.id, booking);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.bookingRepository.delete(id);
  }

  async findAvailableRooms(): Promise<Room[]> {
    // Make a parallel query
    const [rooms, slots, slotsCountByRoom] = await Promise.all([
      await this.roomService.findAll(),
      await this.slotsService.findAll(),
      await this.getBookedSlotsCountByRoom(),
    ]);
    const totalSlots = slots.length;

    // Form a map of <roomId, booked slots count>
    const roomSlotsCountMap = slotsCountByRoom.reduce(
      (roomSlots, booking) => ({
        ...roomSlots,
        [booking.roomId]: booking.slotsCount,
      }),
      {},
    );

    // Iterate each room and return the room for which slots not filled yet
    return rooms.filter((room) => {
      const bookedSlotsCount = roomSlotsCountMap[String(room.id)];
      return !bookedSlotsCount || bookedSlotsCount < totalSlots;
    });
  }

  async getBookedSlotsCountByRoom(): Promise<SlotsCountByRoom[]> {
    return await this.bookingRepository.manager
      .createQueryBuilder(Booking, 'booking')
      .select('booking.roomId', 'roomId')
      .addSelect('COUNT(booking.slotId)', 'slotsCount')
      .where('booking.cancelled = :cancelled', { cancelled: false })
      .groupBy('booking.roomId')
      .getRawMany();
  }
}
