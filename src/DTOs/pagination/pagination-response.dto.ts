import { IPaginationDto } from "interfaces/pagination/pagination.interface";

export class PaginationResponseDto {
  readonly page: number;
  readonly pageSize: number;
  readonly totalCount: number;
  readonly totalPages: number;
  readonly hasPreviousPage: boolean;
  readonly hasNextPage: boolean;

  constructor({ paginationParamsDto, totalCount }: IPaginationDto) {
    this.page = paginationParamsDto.page;
    this.pageSize = paginationParamsDto.pageSize;
    this.totalCount = totalCount;
    this.totalPages = Math.ceil(this.totalCount / this.pageSize);
    this.hasPreviousPage = this.page > 0;
    this.hasNextPage = this.page < this.totalPages;
  }
}
