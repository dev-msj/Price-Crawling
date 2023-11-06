import { HttpStatus } from '@nestjs/common';
import { BaseResponseDto } from './base-response.dto';

export class SuccessResponseDto extends BaseResponseDto {
  constructor() {
    super(HttpStatus.OK, 'success');
  }
}
