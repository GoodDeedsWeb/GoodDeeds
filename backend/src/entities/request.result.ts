import { HttpStatus } from '@nestjs/common';

export class RequestResult {
  isSuccess: boolean;
  statusCode: HttpStatus;
  message: string;
}
