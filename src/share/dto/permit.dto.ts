import { ApiProperty } from '@nestjs/swagger';
import { PermitEntity } from '../entity/permit.entity';
import { IsNumber, IsString, MaxLength } from 'class-validator';

export class PermitDto {
    @ApiProperty({readOnly: true})
    id: number;
    
    @ApiProperty({maxLength: 255})
    @IsString()
    @MaxLength(255)
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