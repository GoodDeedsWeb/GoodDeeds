import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class PaginationParameter {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  @Max(20)
  pageSize: number = 10;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  currentPage: number = 1;
}
