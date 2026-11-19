import { IsNotEmpty, IsObject } from 'class-validator';

export class CreateDataDto {
  @IsObject()
  @IsNotEmpty()
  data: Record<string, unknown>;
}
