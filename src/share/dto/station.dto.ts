import { ApiProperty } from '@nestjs/swagger';
import { StationEntity } from '../entity/station.entity';
import { IsNumber, IsString } from 'class-validator';

export class StationDto {
    @ApiProperty({readOnly: true})
    @IsNumber()
    id: number;

    @ApiProperty()
    @IsString()
    name: string;

    public toEntity():StationEntity {
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