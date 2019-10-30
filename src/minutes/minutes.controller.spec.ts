import { Test, TestingModule } from '@nestjs/testing';
import { MinutesController } from './minutes.controller';

describe('Minutes Controller', () => {
  let controller: MinutesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MinutesController],
    }).compile();

    controller = module.get<MinutesController>(MinutesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
