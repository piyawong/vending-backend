import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetectionRecord } from './detectionRecord.entity';

@Injectable()
export class DetectionRecordService {
  constructor(
    @InjectRepository(DetectionRecord)
    private detectionRecordRepository: Repository<DetectionRecord>,
  ) {}

  findAll(): Promise<DetectionRecord[]> {
    return this.detectionRecordRepository.find();
  }

  findOne(id: number): Promise<DetectionRecord> {
    return this.detectionRecordRepository.findOne({ where: { id } });
  }

  create(detectionRecord: DetectionRecord): Promise<DetectionRecord> {
    const newBook = this.detectionRecordRepository.create(detectionRecord);
    return this.detectionRecordRepository.save(newBook);
  }

  async update(
    id: number,
    detectionRecord: DetectionRecord,
  ): Promise<DetectionRecord> {
    await this.detectionRecordRepository.update(id, detectionRecord);
    return this.detectionRecordRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.detectionRecordRepository.delete(id);
  }
}
