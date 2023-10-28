import { PartialType } from '@nestjs/mapped-types';
import { CreateFutureDto } from './create-future.dto';

export class UpdateFutureDto extends PartialType(CreateFutureDto) {}
