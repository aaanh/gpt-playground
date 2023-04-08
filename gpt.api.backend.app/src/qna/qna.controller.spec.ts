import { Test, TestingModule } from '@nestjs/testing';
import { QnaController } from './qna.controller';
import { QnaService } from './qna.service';

describe('QnaController', () => {
  let controller: QnaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QnaController],
      providers: [QnaService],
    }).compile();

    controller = module.get<QnaController>(QnaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
