import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DetectionRecordService } from './detectionRecord.service';
import { DetectionRecord } from './detectionRecord.entity';

@ApiTags('detection-records')
@Controller('detection-records')
export class DetectionRecordController {
  constructor(
    private readonly detectionRecordService: DetectionRecordService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all detection records' })
  @ApiResponse({
    status: 200,
    description: 'Return all detection records',
    type: [DetectionRecord],
  })
  findAll(): Promise<DetectionRecord[]> {
    return this.detectionRecordService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a detection record' })
  @ApiResponse({
    status: 200,
    description: 'Return a detection record',
    type: DetectionRecord,
  })
  findOne(@Param('id') id: string): Promise<DetectionRecord> {
    return this.detectionRecordService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a detection record' })
  @ApiResponse({
    status: 201,
    description: 'The detection record has been successfully created',
    type: DetectionRecord,
  })
  create(@Body() detectionRecord: DetectionRecord): Promise<DetectionRecord> {
    return this.detectionRecordService.create(detectionRecord);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a detection record' })
  @ApiResponse({
    status: 200,
    description: 'The detection record has been successfully updated',
    type: DetectionRecord,
  })
  update(
    @Param('id') id: string,
    @Body() detectionRecord: DetectionRecord,
  ): Promise<DetectionRecord> {
    return this.detectionRecordService.update(+id, detectionRecord);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a detection record' })
  @ApiResponse({
    status: 200,
    description: 'The detection record has been successfully deleted',
  })
  remove(@Param('id') id: string): Promise<void> {
    return this.detectionRecordService.remove(+id);
  }
}
