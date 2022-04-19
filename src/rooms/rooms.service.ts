import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Room } from './room.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ) { }

  /**
   * Bulk load list of rooms
   * @param rooms Array of string of rooms
   * @returns List of loaded Ids
   */
  async load(rooms: Room[]): Promise<InsertResult> {
    return await this.roomRepository.manager
      .createQueryBuilder()
      .insert()
      .into(Room)
      .values(rooms)
      .execute();
  }

  /**
   * List of all the rooms
   * @returns Room[]
   */
  async findAll(): Promise<Room[]> {
    return await this.roomRepository.find();
  }

  async create(room: Room): Promise<Room> {
    return await this.roomRepository.save(room);
  }

  async update(room: Room): Promise<UpdateResult> {
    return await this.roomRepository.update(room.id, room);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.roomRepository.delete(id);
  }
}
