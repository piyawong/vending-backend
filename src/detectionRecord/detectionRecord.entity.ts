import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class DetectionRecord {
  @ApiProperty({ description: 'The unique identifier of the detection record' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'The dwell time of the detection' })
  @Column()
  dwellTime: string;

  @ApiProperty({ description: 'The detected gender' })
  @Column()
  gender: string;

  @ApiProperty({ description: 'The detected age' })
  @Column()
  age: string;

  @ApiProperty({ description: 'The detected emotion' })
  @Column()
  emotion: string;

  @ApiProperty({ description: 'The timestamp of the detection' })
  @Column()
  timestamp: Date;
}
