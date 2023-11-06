import { HttpStatus, InternalServerErrorException } from '@nestjs/common';
import { BaseResponseDto } from './base-response.dto';

export class FailureResponseDto extends BaseResponseDto {
  constructor(code: number, message: string) {
    super(code, message);

    if (code === HttpStatus.OK) {
      throw new InternalServerErrorException(
        'HttpStatus.OK is not a Error Code.',
      );
    }
  }
}
