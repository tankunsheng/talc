import { Test, TestingModule } from '@nestjs/testing';
import { MemorialController } from './memorial.controller';

describe('MemorialController', () => {
  let controller: MemorialController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MemorialController],
    }).compile();

    controller = module.get<MemorialController>(MemorialController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
