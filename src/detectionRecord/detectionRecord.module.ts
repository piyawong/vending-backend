import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetectionRecord } from './detectionRecord.entity';
import { DetectionRecordService } from './detectionRecord.service';
import { DetectionRecordController } from './detectionRecord.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DetectionRecord])],
  providers: [DetectionRecordService],
  controllers: [DetectionRecordController],
})
export class DetectionRecordModule {}
