import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import Booking from './booking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking])],
  providers: [BookingsService],
  controllers: [BookingsController],
})
export class BookingsModule { }
