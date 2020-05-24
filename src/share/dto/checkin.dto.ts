import { ApiProperty } from '@nestjs/swagger';
import { CheckinEntity } from '../entity/checkin.entity';

export class CheckinDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    hikerId: number;

    @ApiProperty()
    hikeId: number;

    @ApiProperty()
    checkinTime: Date;

    public static fromEntity(entity: CheckinEntity): CheckinDto {
        const it = new CheckinDto();
        it.id = entity.id;
        it.hikerId = entity.hikerId;
        it.hikeId = entity.hikeId;
        it.checkinTime = entity.checkinTime;

        return it;
    }
}