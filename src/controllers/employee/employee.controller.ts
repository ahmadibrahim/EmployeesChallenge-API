import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Res
} from "@nestjs/common";
import { validateOrReject } from "class-validator";

import { CreateEmployeeDto } from "DTOs/employee/create-employee.dto";
import { UpdateEmployeeDto } from "DTOs/employee/update-employee.dto";
import { FilterParamsDto } from "DTOs/filters/filters-params.dto";
import { PaginationParamsDto } from "DTOs/pagination/pagination-params.dto";
import {
  IEmployeesFilter,
  IPagedEmployees
} from "interfaces/employee/employee.interface";
import { EmployeeServices } from "services/employee/employee.services";

@Controller("employee")
export class EmployeeController {
  constructor(private readonly emplyeeService: EmployeeServices) {}

  @Get()
  async getEmployees(@Res() response, @Query() params: IEmployeesFilter) {
    try {
      await new Promise(resolve => {
        setTimeout(resolve, 500);
      });
      const paginationParamsDto = new PaginationParamsDto(
        parseInt(params.page, 10),
        parseInt(params.pageSize, 10)
      );
      const filterParamsDto = new FilterParamsDto(params);

      const pagedEmployees: IPagedEmployees =
        await this.emplyeeService.getEmployees(
          paginationParamsDto,
          filterParamsDto
        );
      return response.status(HttpStatus.OK).json(pagedEmployees);
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get("/all")
  async getAllEmployees(@Res() response) {
    try {
      await new Promise(resolve => {
        setTimeout(resolve, 500);
      });
      const allEmployees = await this.emplyeeService.getAllEmployees();
      return response.status(HttpStatus.OK).json({
        employees: allEmployees
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get("/:id")
  async getEmployee(@Res() response, @Param("id") emplyeeId: string) {
    try {
      const employee = await this.emplyeeService.getEmployee(emplyeeId);
      return response.status(HttpStatus.OK).json(employee);
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Post()
  async createEmployee(
    @Res() response,
    @Body() createEmployeeDto: CreateEmployeeDto
  ) {
    try {
      await validateOrReject(createEmployeeDto);

      const newEmployee =
        await this.emplyeeService.createEmployee(createEmployeeDto);

      return response.status(HttpStatus.CREATED).json({
        message: "Employee has been created successfully",
        data: newEmployee
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Put("/:id")
  async updateEmployee(
    @Res() response,
    @Param("id") emplyeeId: string,
    @Body() updateEmployeeDto: CreateEmployeeDto
  ) {
    try {
      await validateOrReject(updateEmployeeDto);

      const updatedEmployee = await this.emplyeeService.updateEmployee(
        emplyeeId,
        updateEmployeeDto
      );
      return response.status(HttpStatus.OK).json({
        message: "Employee has been successfully updated",
        data: updatedEmployee
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Patch("/:id")
  async patchEmployee(
    @Res() response,
    @Param("id") emplyeeId: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto
  ) {
    try {
      await validateOrReject(updateEmployeeDto);

      const updatedEmployee = await this.emplyeeService.updateEmployee(
        emplyeeId,
        updateEmployeeDto
      );
      return response.status(HttpStatus.OK).json({
        message: "Employee has been successfully updated",
        data: updatedEmployee
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete("/:id")
  async deleteEmployee(@Res() response, @Param("id") emplyeeId: string) {
    try {
      const deletedEmployee =
        await this.emplyeeService.deleteEmployee(emplyeeId);
      return response.status(HttpStatus.OK).json({
        message: "Employee has been deleted successfully",
        data: deletedEmployee
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
