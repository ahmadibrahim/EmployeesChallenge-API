import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ collection: "employees", timestamps: true })
export class Employee {
  @Prop()
  Gender: "M" | "F";

  @Prop()
  FirstName: string;

  @Prop()
  LastName: string;

  @Prop()
  DateOfBirth: string;

  @Prop()
  Email: string;

  @Prop()
  Country: string;

  @Prop()
  CountryCode: string;

  @Prop()
  PhoneNumber: string;

  @Prop()
  Address: string;

  @Prop()
  Department: string;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
