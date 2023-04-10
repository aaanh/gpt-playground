import { ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  denyAccess(): ForbiddenException {
    throw new ForbiddenException();
  }
}
