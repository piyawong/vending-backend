import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

@Entity()
export class DetectionRecord {
  @ApiProperty({ description: 'The unique identifier of the detection record' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'The machine Id' })
  @Column({ nullable: false, default: '' })
  machineId: string;

  @ApiProperty({ description: 'The dwell time of the detection' })
  @Column('float', { nullable: false, default: 0 })
  @IsNumber()
  @Min(0)
  dwellTime: number;

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
