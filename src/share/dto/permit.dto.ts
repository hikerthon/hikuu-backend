import { ApiProperty } from '@nestjs/swagger';
import { PermitEntity } from '../entity/permit.entity';

export class PermitDto {
    @ApiProperty()
    id: number;
  
    @ApiProperty()
    name: string;

    public toEntity(): PermitEntity {
        const it = new PermitEntity();
        it.id = this.id;
        it.name = this.name;
        return it;
    }

    public static fromEntity(entity: PermitEntity): PermitDto {
        const it = new PermitDto();
        it.id = entity.id;
        it.name = entity.name;

        return it;
    }
}