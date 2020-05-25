import { ApiProperty } from '@nestjs/swagger';
import { TrailEntity } from '../entity/trail.entity';

export class TrailDto {
    @ApiProperty()
    id: number;
  
    @ApiProperty()
    name: string;

    @ApiProperty()
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