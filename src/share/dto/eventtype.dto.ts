import { ApiProperty } from '@nestjs/swagger';
import { EventtypeEntity } from '../entity/eventtype.entity';

export class EventTypeDto {
    @ApiProperty()
    id: number;
  
    @ApiProperty()
    name: string;
  
    @ApiProperty()
    description: string;
    
    @ApiProperty()
    defaultAlert: number;

    public toEntity(): EventtypeEntity {
        const it = new EventtypeEntity();
        it.id = this.id;
        it.name = this.name;
        it.description = this.description;
        it.defaultAlert = this.defaultAlert;
        return it;
    }

    public static fromEntity(entity: EventtypeEntity): EventTypeDto {
        const it = new EventTypeDto();
        it.id = entity.id;
        it.name = entity.name;
        it.description = entity.description;
        it.defaultAlert = entity.defaultAlert;

        return it;
    }
}