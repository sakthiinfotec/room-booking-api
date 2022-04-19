import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { SlotsService } from 'src/slots/slots.service';
import { BookingsService } from './../bookings/bookings.service';
import { RoomsController } from './rooms.controller';
import { Room } from './room.entity';
import { Slot } from 'src/slots/slot.entity';
import { Booking } from 'src/bookings/booking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Room, Slot, Booking])],
  providers: [RoomsService, SlotsService, BookingsService],
  controllers: [RoomsController],
})
export class RoomsModule { }
