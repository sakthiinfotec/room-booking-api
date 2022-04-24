import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import User from './user.entity';

@Injectable()
export default class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  /**
   * Bulk load list of users
   * @param users Users
   * @returns List of loaded Ids
   */
  async load(users: User[]): Promise<User[]> {
    const userList = users.map((user) => this.userRepository.create(user));
    return await this.userRepository.save(userList);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async create(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async update(user: User): Promise<UpdateResult> {
    return await this.userRepository.update(user.id, user);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }
}
