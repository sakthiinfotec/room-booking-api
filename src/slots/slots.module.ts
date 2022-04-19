import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SlotsService } from './slots.service';
import { SlotsController } from './slots.controller';
import { Slot } from './slot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Slot])],
  providers: [SlotsService],
  controllers: [SlotsController],
})
export class SlotsModule { }
