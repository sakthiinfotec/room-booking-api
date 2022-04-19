import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomsService } from './../rooms/rooms.service';
import { SlotsService } from 'src/slots/slots.service';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { Room } from 'src/rooms/room.entity';
import { Slot } from 'src/slots/slot.entity';
import { Booking } from './booking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Room, Slot])],
  providers: [BookingsService, SlotsService, RoomsService],
  controllers: [BookingsController],
})
export class BookingsModule { }
