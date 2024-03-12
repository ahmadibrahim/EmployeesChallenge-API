import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { FilterOperator } from "constant";
import { CreateEmployeeDto } from "DTOs/employee/create-employee.dto";
import { UpdateEmployeeDto } from "DTOs/employee/update-employee.dto";
import { FilterParamsDto } from "DTOs/filters/filters-params.dto";
import { PaginationParamsDto } from "DTOs/pagination/pagination-params.dto";
import { PaginationResponseDto } from "DTOs/pagination/pagination-response.dto";
import {
  IEmployee,
  IPagedEmployees
} from "interfaces/employee/employee.interface";
import { Employee } from "schemas/employee/employee.schema";

@Injectable()
export class EmployeeServices {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<IEmployee>
  ) {}

  async createEmployee(
    createEmployeeDto: CreateEmployeeDto
  ): Promise<IEmployee> {
    const newEmployee = await new this.employeeModel(createEmployeeDto);
    return newEmployee.save();
  }

  async updateEmployee(
    employeeId: string,
    updateEmployeeDto: UpdateEmployeeDto
  ): Promise<IEmployee> {
    const existingEmployee = await this.employeeModel.findByIdAndUpdate(
      employeeId,
      updateEmployeeDto,
      { new: true }
    );
    if (!existingEmployee) {
      throw new NotFoundException(`Employee #${employeeId} not found`);
    }
    return existingEmployee;
  }

  async getAllEmployees(): Promise<IEmployee[]> {
    const employees = await this.employeeModel
      .find()
      .select("-__v -updatedAt -createdAt")
      .exec();
    if (!employees) {
      throw new NotFoundException("Employees data not found!");
    }
    return employees;
  }

  private buildEmployeeQuery(filterParamsDto?: FilterParamsDto) {
    const query = this.employeeModel
      .find()
      .select("-__v -updatedAt -createdAt");
    if (!!filterParamsDto.sortBy && !!filterParamsDto.sortDirection) {
      query.sort({ [filterParamsDto.sortBy]: filterParamsDto.sortDirection });
    }
    if (
      !!filterParamsDto.filterBy &&
      !!filterParamsDto.filterOperator &&
      !!filterParamsDto.filterValue
    ) {
      switch (filterParamsDto.filterOperator) {
        case FilterOperator.CONTAINS:
          query
            .where(filterParamsDto.filterBy)
            .regex(new RegExp(filterParamsDto.filterValue, "i"));
          break;
        case FilterOperator.STARTS_WITH:
          query
            .where(filterParamsDto.filterBy)
            .regex(new RegExp(`^${filterParamsDto.filterValue}`, "i"));
          break;
        case FilterOperator.ENDS_WITH:
          query
            .where(filterParamsDto.filterBy)
            .regex(new RegExp(`${filterParamsDto.filterValue}$`, "i"));
          break;
        case FilterOperator.EQUALS:
          query
            .where(filterParamsDto.filterBy)
            .equals(filterParamsDto.filterValue);
          break;
        case FilterOperator.IS_EMPTY:
          query.where(filterParamsDto.filterBy).equals("");
          break;
        case FilterOperator.IS_NOT_EMPTY:
          query.where(filterParamsDto.filterBy).ne("");
          break;
        case FilterOperator.IS_ANY_OF:
          query
            .where(filterParamsDto.filterBy)
            .in(filterParamsDto.filterValue.split(","));
          break;
        default:
          break;
      }
    }
    return query;
  }

  public async getEmployees(
    paginationParamsDto: PaginationParamsDto,
    filterParamsDto?: FilterParamsDto
  ): Promise<IPagedEmployees> {
    const query = this.buildEmployeeQuery(filterParamsDto);

    const employees = await query
      .skip(paginationParamsDto.skip)
      .limit(paginationParamsDto.pageSize)
      .exec();

    if (!employees) {
      throw new NotFoundException("Employees data not found!");
    }

    const countQuery = this.buildEmployeeQuery(filterParamsDto);
    const totalCount: number = await countQuery.countDocuments().exec();
    const pagination = new PaginationResponseDto({
      totalCount,
      paginationParamsDto
    });

    return { employees, ...pagination };
  }

  async getEmployee(employeeId: string): Promise<IEmployee> {
    const existingEmployee = await this.employeeModel
      .findById(employeeId)
      .exec();
    if (!existingEmployee) {
      throw new NotFoundException(`Employee #${employeeId} not found`);
    }
    return existingEmployee;
  }

  async deleteEmployee(employeeId: string): Promise<IEmployee> {
    const deletedEmployee =
      await this.employeeModel.findByIdAndDelete(employeeId);
    if (!deletedEmployee) {
      throw new NotFoundException(`Employee #${employeeId} not found`);
    }
    return deletedEmployee;
  }
}
