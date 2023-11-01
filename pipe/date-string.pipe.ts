import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class DateStringPipe implements PipeTransform<string> {
  transform(value: string, metadata: ArgumentMetadata) {
    if (!this.validateFormat(value)) {
      throw new BadRequestException(
        `Check date string format (yyyy-mm-dd). Received value: ${value}`,
      );
    }

    return value;
  }

  validateFormat(value: string): boolean {
    const regex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;

    return typeof value === 'string' && regex.test(value);
  }
}
