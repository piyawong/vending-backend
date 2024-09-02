import { Test, TestingModule } from '@nestjs/testing';
import { DetectionRecordController } from './detectionRecord.controller';
import { DetectionRecordService } from './detectionRecord.service';
import { DetectionRecord } from './detectionRecord.entity';

describe('DetectionRecordController', () => {
  let controller: DetectionRecordController;
  let service: DetectionRecordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetectionRecordController],
      providers: [
        {
          provide: DetectionRecordService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
              {
                id: 1,
                dwellTime: 5,
                gender: 'Male',
                age: '30-40',
                emotion: 'Happy',
                timestamp: new Date(),
              },
              {
                id: 2,
                dwellTime: 3,
                gender: 'Female',
                age: '20-30',
                emotion: 'Neutral',
                timestamp: new Date(),
              },
            ]),
            findOne: jest.fn().mockImplementation((id: number) =>
              Promise.resolve({
                id,
                dwellTime: 5,
                gender: 'Male',
                age: '30-40',
                emotion: 'Happy',
                timestamp: new Date(),
              }),
            ),
            create: jest
              .fn()
              .mockImplementation((detectionRecord: DetectionRecord) =>
                Promise.resolve({ id: Date.now(), ...detectionRecord }),
              ),
            update: jest
              .fn()
              .mockImplementation(
                (id: number, detectionRecord: DetectionRecord) =>
                  Promise.resolve({ id, ...detectionRecord }),
              ),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<DetectionRecordController>(
      DetectionRecordController,
    );
    service = module.get<DetectionRecordService>(DetectionRecordService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of detection records', async () => {
      const result = await controller.findAll();
      expect(result).toHaveLength(2);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single detection record', async () => {
      const result = await controller.findOne('1');
      expect(result).toHaveProperty('id', 1);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('create', () => {
    it('should create a new detection record', async () => {
      const newRecord = {
        dwellTime: 4,
        gender: 'Female',
        age: '40-50',
        emotion: 'Excited',
        timestamp: new Date(),
      };
      const result = await controller.create(newRecord as DetectionRecord);
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('dwellTime', 4);
      expect(service.create).toHaveBeenCalledWith(newRecord);
    });
  });

  describe('update', () => {
    it('should update a detection record', async () => {
      const updatedRecord = {
        dwellTime: 6,
        gender: 'Male',
        age: '30-40',
        emotion: 'Sad',
        timestamp: new Date(),
      };
      const result = await controller.update(
        '1',
        updatedRecord as DetectionRecord,
      );
      expect(result).toHaveProperty('id', 1);
      expect(result).toHaveProperty('dwellTime', 6);
      expect(service.update).toHaveBeenCalledWith(1, updatedRecord);
    });
  });

  describe('remove', () => {
    it('should remove a detection record', async () => {
      await controller.remove('1');
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
