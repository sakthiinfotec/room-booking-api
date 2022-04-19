import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { BookingsService } from 'src/bookings/bookings.service';
import { Room } from './room.entity';

@Controller('rooms')
export class RoomsController {
  constructor(
    private roomsService: RoomsService,
    private bookingService: BookingsService,
  ) { }

  @Post('load')
  load(@Body() rooms: Room[]): Promise<any> {
    return this.roomsService.load(rooms);
  }

  @Get()
  list(): Promise<Room[]> {
    return this.roomsService.findAll();
  }

  @Post()
  create(@Body() roomData: Room): Promise<Room> {
    return this.roomsService.create(roomData);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() roomData: Room): Promise<any> {
    roomData.id = Number(id);
    console.log('Update #' + roomData.id);
    return this.roomsService.update(roomData);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<any> {
    return this.roomsService.delete(Number(id));
  }

  @Get('available')
  async availableRooms(): Promise<Room[]> {
    return this.bookingService.findAvailableRooms();
  }
}
