import { IsBoolean, IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateKompanijaIteracijaDto {
  @IsOptional()
  @IsNumber()
  korisnik_id?: number;

  @IsOptional()
  odobrena?: boolean | null;

  @IsOptional()
  @IsString()
  stanje?: string;

  @IsOptional()
  @IsDateString()
  datum_cimanja?: string;

  @IsOptional()
  @IsDateString()
  datum_podsetnik?: string;

  @IsOptional()
  @IsDateString()
  datum_poziv?: string;

  @IsOptional()
  @IsNumber()
  broj_cimanja?: number;

  @IsOptional()
  @IsNumber()
  broj_odbijanja?: number;

  @IsOptional()
  @IsNumber()
  broj_prihvatanja?: number;

  @IsOptional()
  @IsString()
  napomena?: string;
}
