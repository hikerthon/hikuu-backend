import { ApiProperty } from '@nestjs/swagger';
import { ShelterEntity } from '../entity/shelter.entity';
import { IsNumber, IsString, Max, Min, MaxLength } from 'class-validator';

export class ShelterDto {
    @ApiProperty({readOnly: true})
    id: number;
  
    @ApiProperty({maxLength: 255})
    @IsString()
    @MaxLength(255)
    name: string;

    @ApiProperty()
    @IsNumber()
    capacity: number;

    @ApiProperty({nullable: false, minimum: -90, maximum: 90})
    @IsNumber()
    @Min(-90)
    @Max(90)
    latpt: number;
    
    @ApiProperty({nullable: false, minimum: -180, maximum: 180})
    @IsNumber()
    @Min(-180)
    @Max(180)
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