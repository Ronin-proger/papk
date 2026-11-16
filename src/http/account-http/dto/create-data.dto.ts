import { IsNotEmpty, IsObject } from 'class-validator';

export class CreateDataDto {
  @IsObject()
  @IsNotEmpty()
  data: any;
}
