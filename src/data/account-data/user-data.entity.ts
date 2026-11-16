import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_data')
export class UserData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({ type: 'jsonb' })
  data: any;
}
