import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import User from 'src/users/user.entity';
import { Room } from 'src/rooms/room.entity';
import { Slot } from 'src/slots/slot.entity';

@Entity()
export default class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.bookings)
  user: User;

  @Column({ nullable: true })
  userId: number;

  @ManyToOne(() => Room, (room) => room.bookings)
  room: Room;

  @Column({ nullable: true })
  roomId: number;

  @ManyToOne(() => Slot, (slot) => slot.bookings)
  slot: Slot;

  @Column({ nullable: true })
  slotId: number | number[];

  @Column()
  cancelled: boolean;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
