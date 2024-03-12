import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { EmployeeController } from "controllers/employee/employee.controller";
import { Employee, EmployeeSchema } from "schemas/employee/employee.schema";
import { EmployeeServices } from "services/employee/employee.services";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Employee.name,
        schema: EmployeeSchema
      }
    ])
  ],
  controllers: [EmployeeController],
  providers: [EmployeeServices]
})
export class EmployeeModule {}
