import { ApiProperty } from '@nestjs/swagger';
import { TrailEntity } from '../entity/trail.entity';
import { IsNumber, IsString, MaxLength } from 'class-validator';

export class TrailDto {
    @ApiProperty({readOnly: true})
    id: number;
  
    @ApiProperty({maxLength: 255})
    @IsString()
    @MaxLength(255)
    name: string;

    @ApiProperty()
    @IsNumber()
    permit: number;

    public toEntity():TrailEntity {
        const it = new TrailEntity();
        it.id = this.id;
        it.name = this.name;
        it.permit.id = this.permit;
        return it;
    }

    public static fromEntity(entity: TrailEntity): TrailDto {
        const it = new TrailDto();
        it.id = entity.id;
        it.name = entity.name;
        it.permit = entity.permitId;
        return it;
    }
}