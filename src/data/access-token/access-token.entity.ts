import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('access_tokens')
export class AccessTokenEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({ unique: true })
  accessKey: string;
}
