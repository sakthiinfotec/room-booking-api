import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookRoomDTO } from 'src/dto/bookroom.dto';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import Booking from './booking.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
  ) { }

  async findAllBookings(cancelled = false): Promise<Booking[]> {
    return await this.bookingRepository.find({
      where: {
        cancelled,
      },
    });
  }

  async create(booking: BookRoomDTO): Promise<Booking[]> {
    const { userId, roomId } = booking;
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
}
