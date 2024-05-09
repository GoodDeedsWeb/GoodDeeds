import { IsBoolean, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class MetaData {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  CurrentPage: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  PageSize: number;

  @IsNotEmpty()
  @IsBoolean()
  HasNext: boolean;

  @IsNotEmpty()
  @IsBoolean()
  HasPrevious: boolean;

  constructor(pageSize: number, currentPage: number, totalSize: number) {
    this.CurrentPage = currentPage;
    this.PageSize = pageSize;
    const totalPages = Math.ceil(totalSize / pageSize);
    this.HasNext = this.CurrentPage < totalPages ? true : false;
    this.HasPrevious = currentPage > 1 ? true : false;
  }
}
