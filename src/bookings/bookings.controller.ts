import { BookRoomDTO } from './../dto/bookroom.dto';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Sse,
  MessageEvent,
} from '@nestjs/common';
import { interval, map, Observable } from 'rxjs';
import Booking from './booking.entity';
import { BookingsService } from './bookings.service';

@Controller('bookings')
export class BookingsController {
  constructor(private bookingService: BookingsService) { }

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return interval(1000).pipe(map((_) => ({ data: { hello: 'world' } })));
  }

  @Get()
  list(): Promise<Booking[]> {
    return this.bookingService.findAllBookings();
  }

  @Post()
  create(@Body() bookingData: BookRoomDTO): Promise<Booking[]> {
    return this.bookingService.create(bookingData);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() bookingData: Booking): Promise<any> {
    bookingData.id = Number(id);
    return this.bookingService.update(bookingData);
  }

  @Get(':id/cancel')
  cancel(@Param('id') id: string): Promise<any> {
    const bookingData = { id: Number(id), cancelled: true } as Booking;
    return this.bookingService.update(bookingData);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<any> {
    return this.bookingService.delete(Number(id));
  }
}
