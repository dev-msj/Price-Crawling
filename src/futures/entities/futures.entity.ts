import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('Futures')
export class Futures {
  @PrimaryColumn({ type: 'int' })
  futures_id: number;

  @PrimaryColumn({ type: 'varchar', length: 50 })
  futures_name: string;

  @Column({ type: 'date' })
  futures_date: Date;

  @Column({ type: 'int' })
  open_price: number;

  @Column({ type: 'int' })
  high_price: number;

  @Column({ type: 'int' })
  low_price: number;

  @Column({ type: 'int' })
  close_price: number;

  @Column({ type: 'int' })
  volume: number;
}
