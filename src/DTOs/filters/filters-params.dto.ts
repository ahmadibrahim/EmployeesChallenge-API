import { IsOptional, IsString, IsEnum } from "class-validator";

import { SortDirection, FilterOperator } from "constant";
import { IEmployeesFilter } from "interfaces/employee/employee.interface";

export class FilterParamsDto {
  @IsString()
  @IsOptional()
  readonly sortBy?: string;

  @IsEnum(SortDirection)
  @IsOptional()
  readonly sortDirection?: SortDirection;

  @IsString()
  @IsOptional()
  readonly filterBy?: string;

  @IsEnum(FilterOperator)
  @IsOptional()
  readonly filterOperator?: FilterOperator;

  @IsString()
  @IsOptional()
  readonly filterValue?: string;

  constructor(params: IEmployeesFilter) {
    this.sortBy = params.sortBy;
    this.sortDirection = this.getSortDirection(params.sortDirection);
    this.filterBy = params.filterBy;
    this.filterOperator = this.getFilterOperator(params.filterOperator);
    this.filterValue = params.filterValue;
  }

  getSortDirection(direction?: string): SortDirection | null {
    switch (direction?.toLowerCase()) {
      case "asc":
        return SortDirection.ASC;
      case "desc":
        return SortDirection.DESC;
      default:
        return null;
    }
  }

  getFilterOperator(operator?: string): FilterOperator | null {
    switch (operator?.toLowerCase()) {
      case "contains":
        return FilterOperator.CONTAINS;
      case "startswith":
        return FilterOperator.STARTS_WITH;
      case "endswith":
        return FilterOperator.ENDS_WITH;
      case "equals":
        return FilterOperator.EQUALS;
      case "isanyof":
        return FilterOperator.IS_ANY_OF;
      case "isempty":
        return FilterOperator.IS_EMPTY;
      case "isnotempty":
        return FilterOperator.IS_NOT_EMPTY;
      default:
        return null;
    }
  }
}
