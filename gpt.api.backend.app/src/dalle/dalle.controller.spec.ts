import { Test, TestingModule } from '@nestjs/testing';
import { DalleController } from './dalle.controller';

describe('DalleController', () => {
  let controller: DalleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DalleController],
    }).compile();

    controller = module.get<DalleController>(DalleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
