import { HttpStatus } from '@nestjs/common';

export class Result {
  IsSuccess: boolean;

  StatusCode: HttpStatus;

  Message?: string;
}
