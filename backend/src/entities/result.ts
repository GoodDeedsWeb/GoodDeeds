import { HttpStatus } from '@nestjs/common';

export class Result {
  isSuccess: boolean;

  statusCode: HttpStatus;

  message?: string;
}
