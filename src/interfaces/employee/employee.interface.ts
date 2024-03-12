import { Document } from "mongoose";

import { PaginationResponseDto } from "DTOs/pagination/pagination-response.dto";

import { IFilter } from "../filters/filters.interface";
import { IPagination } from "../pagination/pagination.interface";

export interface IEmployee extends Document {
  readonly Gender: string;
  readonly FirstName: string;
  readonly LastName: string;
  readonly DateOfBirth: string;
  readonly Email: string;
  readonly Country: string;
  readonly CountryCode: string;
  readonly PhoneNumber: string;
  readonly Address: string;
  readonly Department: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export interface IPagedEmployees extends PaginationResponseDto {
  employees: IEmployee[];
}

export interface IEmployeesFilter extends IPagination, IFilter {}
