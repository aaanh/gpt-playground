import { Module } from '@nestjs/common';
import { DalleController } from './dalle.controller';

@Module({
  controllers: [DalleController],
})
export class DalleModule {}
