import { ApiProperty } from '@nestjs/swagger';
import { AlertlevelEntity } from '../entity/alertlevel.entity';

export class AlertLevelDto {
    @ApiProperty({readOnly: true})
    id: number;
  
    @ApiProperty()
    name: string;
  
    @ApiProperty()
    ttl: number;
    
    @ApiProperty()
    radius: number;

    public toEntity():AlertlevelEntity {
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
        it.ttl = entity.ttl;
        it.radius = entity.radius;

        return it;
    }
}