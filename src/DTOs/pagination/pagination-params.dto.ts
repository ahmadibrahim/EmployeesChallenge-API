import { IsInt, IsOptional, Min } from "class-validator";

export class PaginationParamsDto {
  @IsInt()
  @Min(0)
  readonly page: number;

  @IsInt()
  @Min(1)
  readonly pageSize: number;

  @IsInt()
  @IsOptional()
  readonly skip?: number;

  constructor(page: number = 0, pageSize: number = 10) {
    this.page = page;
    this.pageSize = pageSize;
    this.skip = page * pageSize;
  }
}
