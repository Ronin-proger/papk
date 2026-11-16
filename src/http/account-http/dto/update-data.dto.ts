import { IsNotEmpty, IsObject } from 'class-validator';

export class UpdateDataDto {
  @IsObject()
  @IsNotEmpty()
  data: any;
}
