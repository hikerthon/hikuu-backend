import { ApiProperty } from '@nestjs/swagger';
import { EventtypeEntity } from '../entity/eventtype.entity';
import { Min, Max, IsNumber, IsString } from 'class-validator';

export class EventTypeDto {
    @ApiProperty({readOnly: true})
    @IsNumber()
    id: number;
  
    @ApiProperty()
    @IsString()
    name: string;
  
    @ApiProperty()
    @IsString()
    description: string;
    
    @ApiProperty({minimum: 1, maximum: 4})
    @Min(1)
    @Max(4)
    defaultAlert: number;

    public toEntity(): EventtypeEntity {
        const it = new EventtypeEntity();
        it.id = this.id;
        it.name = this.name;
        it.description = this.description;
        it.defaultAlert.id = this.defaultAlert;
        return it;
    }

    public static fromEntity(entity: EventtypeEntity): EventTypeDto {
        const it = new EventTypeDto();
        it.id = entity.id;
        it.name = entity.name;
        it.description = entity.description;
        it.defaultAlert = entity.defaultAlert.id;

        return it;
    }
}