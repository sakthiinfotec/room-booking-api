import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Booking from 'src/bookings/booking.entity';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  title: string;

  @Column()
  company: string;

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[];
}
