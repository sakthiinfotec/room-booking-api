import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { Slot } from './slot.entity';
import { SlotsService } from './slots.service';

@Controller('slots')
export class SlotsController {
  constructor(private slotsService: SlotsService) { }

  @Post('load')
  load(@Body() slots: Slot[]): Promise<any> {
    return this.slotsService.load(slots);
  }

  @Get()
  list(): Promise<Slot[]> {
    return this.slotsService.findAll();
  }

  @Post()
  create(@Body() slotData: Slot): Promise<Slot> {
    return this.slotsService.create(slotData);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() slotData: Slot): Promise<any> {
    slotData.id = Number(id);
    console.log('Update #' + slotData.id);
    return this.slotsService.update(slotData);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<any> {
    return this.slotsService.delete(Number(id));
  }

  @Get('available')
  available(@Query('roomId') roomId: number): Promise<Slot[]> {
    return this.slotsService.findAvailableSlots(roomId);
  }
}
