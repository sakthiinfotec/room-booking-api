import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Slot } from './slot.entity';

@Injectable()
export class SlotsService {
  constructor(
    @InjectRepository(Slot)
    private slotRepository: Repository<Slot>,
  ) { }

  /**
   * Bulk load list of time slots
   * @param slots Aarray of string of time slots
   * @returns List of loaded Ids
   */
  async load(slots: Slot[]): Promise<InsertResult> {
    return await this.slotRepository.manager
      .createQueryBuilder()
      .insert()
      .into(Slot)
      .values(slots)
      .execute();
  }

  /**
   * List of all the slots
   * @returns Slot[]
   */
  async findAll(): Promise<Slot[]> {
    return await this.slotRepository.find();
  }

  async create(slot: Slot): Promise<Slot> {
    return await this.slotRepository.save(slot);
  }

  async update(slot: Slot): Promise<UpdateResult> {
    return await this.slotRepository.update(slot.id, slot);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.slotRepository.delete(id);
  }

  async findAvailableSlots(roomId: number): Promise<Slot[]> {
    const usedSlotsQB = this.slotRepository.manager
      .createQueryBuilder(Slot, 'slot')
      .select('slot.id')
      .leftJoin('slot.bookings', 'booking')
      .where('booking.roomId = :roomId', { roomId })
      .andWhere('booking.cancelled = :cancelled', { cancelled: false });

    const availSlotsQB = this.slotRepository.manager
      .createQueryBuilder(Slot, 'slot')
      .select('slot.id')
      .where('slot.id NOT IN (' + usedSlotsQB.getQuery() + ')')
      .setParameters(usedSlotsQB.getParameters());
    return availSlotsQB.getMany();
  }
}
