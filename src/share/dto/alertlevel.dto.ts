import { ApiProperty } from '@nestjs/swagger';
import { IsString, Max, MaxLength, IsNumber, Min } from 'class-validator';
import { AlertlevelEntity } from '../entity/alertlevel.entity';

export class AlertLevelDto {
  @ApiProperty({ readOnly: true })
  id: number;

  @ApiProperty({ maxLength: 255 })
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty()
  @IsNumber()
  ttl: number;

  @ApiProperty({ minimum: 0, maximum: 100 })
  @IsNumber()
  @Min(0)
  @Max(100)
  radius: number;

  public toEntity(): AlertlevelEntity {
    const it = new AlertlevelEntity();
    it.id = this.id;
    it.name = this.name;
    it.ttl = this.ttl;
    it.radius = this.radius;
    return it;
  }

  public static fromEntity(entity: AlertlevelEntity): AlertLevelDto {
    const it = new AlertLevelDto();
    it.id = entity.id;
    it.name = entity.name;
    it.ttl = Number(entity.ttl);
    it.radius = Number(entity.radius);
    return it;
  }
}