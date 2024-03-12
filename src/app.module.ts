import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { EmployeeModule } from "modules/employee/employee.module";

// Connect to mongoDB
@Module({
  imports: [
    MongooseModule.forRoot(
      "mongodb+srv://challengeUser:X1CyOBH26f84MgG0@challengecluster.dwokxum.mongodb.net/ChallengeDB?retryWrites=true&w=majority&appName=ChallengeCluster"
    ),
    EmployeeModule
  ]
})
export class AppModule {}
