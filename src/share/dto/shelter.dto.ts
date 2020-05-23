import { ApiProperty } from '@nestjs/swagger';
import { ShelterEntity } from '../entity/shelter.entity';

export class ShelterDto {
    @ApiProperty()
    id: number;
  
    @ApiProperty()
    name: string;

    @ApiProperty()
    capacity: number;

    @ApiProperty()
    latpt: number;

    @ApiProperty()
    lngpt: number;

    public toEntity():ShelterEntity {
        const it = new ShelterEntity();
        it.id = this.id;
        it.name = this.name;
        it.capacity = this.capacity;
        it.latpt = this.latpt;
        it.lngpt = this.lngpt;
        return it;
    }

    public static fromEntity(entity: ShelterEntity): ShelterDto {
        const it = new ShelterDto();
        it.id = entity.id;
        it.name = entity.name;
        it.capacity = entity.capacity;
        it.latpt = entity.latpt;
        it.lngpt = entity.lngpt;

        return it;
    }
}