import { PaginationParamsDto } from "DTOs/pagination/pagination-params.dto";

export interface IPaginationDto {
  readonly paginationParamsDto: PaginationParamsDto;
  readonly totalCount: number;
}

export interface IPagination {
  readonly page: string;
  readonly pageSize: string;
}
