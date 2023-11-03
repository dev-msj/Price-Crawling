import { IsDate, IsNumber, IsString, MaxLength } from 'class-validator';
import { Futures } from '../entities/futures.entity';

export class CreateFuturesDto {
  @IsNumber()
  readonly futuresId: number;

  @IsString()
  @MaxLength(50)
  readonly futuresName: string;

  @IsDate()
  readonly futuresDate: Date;

  @IsNumber()
  readonly openPrice: number;

  @IsNumber()
  readonly highPrice: number;

  @IsNumber()
  readonly lowPrice: number;

  @IsNumber()
  readonly closePrice: number;

  @IsNumber()
  readonly volume: number;

  toFuturesEntity() {
    return Futures.from(
      this.futuresId,
      this.futuresName,
      this.futuresDate,
      this.openPrice,
      this.highPrice,
      this.lowPrice,
      this.closePrice,
      this.volume,
    );
  }
}
