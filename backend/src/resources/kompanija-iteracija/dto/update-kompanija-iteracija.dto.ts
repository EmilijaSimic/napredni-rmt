import { PartialType } from '@nestjs/mapped-types';
import { CreateKompanijaIteracijaDto } from './create-kompanija-iteracija.dto';

export class UpdateKompanijaIteracijaDto extends PartialType(CreateKompanijaIteracijaDto) {}
