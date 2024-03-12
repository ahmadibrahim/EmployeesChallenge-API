import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable validation globally to validate the incoming request payloads
  app.useGlobalPipes(new ValidationPipe());
  // Enable CORS for the frontend to access the backend on port 3000
  app.enableCors({
    origin: "http://localhost:3000"
  });

  await app.listen(9000);
  console.log("Server is running on http://localhost:9000");
}
bootstrap();
