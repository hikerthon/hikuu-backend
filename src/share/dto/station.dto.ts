import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';
import { StationEntity } from '../entity/station.entity';

export class StationDto {
  @ApiProperty({ readOnly: true })
  id: number;

  @ApiProperty({ maxLength: 255 })
  @IsString()
  @MaxLength(255)
  name: string;

  public toEntity(): StationEntity {
    const it = new StationEntity();
    it.id = this.id;
    it.name = this.name;
    return it;
  }

  public static fromEntity(entity: StationEntity): StationDto {
    const it = new StationDto();
    it.id = entity.id;
    it.name = entity.name;

    return it;
  }
}