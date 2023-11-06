import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Builder } from 'builder-pattern';

@Entity('Futures')
export class Futures {
  @PrimaryColumn({ type: 'int' })
  readonly futures_id: number;

  @PrimaryColumn({ type: 'varchar', length: 50 })
  readonly futures_name: string;

  @Column({ type: 'date' })
  readonly futures_date: Date;

  @Column({ type: 'int' })
  readonly open_price: number;

  @Column({ type: 'int' })
  readonly high_price: number;

  @Column({ type: 'int' })
  readonly low_price: number;

  @Column({ type: 'int' })
  readonly close_price: number;

  @Column({ type: 'int' })
  readonly volume: number;

  static from(
    futuresId: number,
    futuresName: string,
    futuresDate: Date,
    openPrice: number,
    highPrice: number,
    lowPrice: number,
    closePrice: number,
    volume: number,
  ): Futures {
    return Builder(Futures)
      .futures_id(futuresId)
      .futures_name(futuresName)
      .futures_date(futuresDate)
      .open_price(openPrice)
      .high_price(highPrice)
      .low_price(lowPrice)
      .close_price(closePrice)
      .volume(volume)
      .build();
  }
}
