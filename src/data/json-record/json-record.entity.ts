import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_data')
export class JsonRecordEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({ name: 'data', type: 'jsonb' })
  payload: Record<string, unknown>;
}
