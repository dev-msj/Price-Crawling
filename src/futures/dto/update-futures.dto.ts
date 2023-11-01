import { PartialType } from '@nestjs/mapped-types';
import { CreateFutureDto } from './create-futures.dto';

export class UpdateFutureDto extends PartialType(CreateFutureDto) {}
