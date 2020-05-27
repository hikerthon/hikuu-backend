import { ApiProperty } from '@nestjs/swagger';
import { AllGpsEntity } from '../entity/allgps.entity'
import { Max, IsNumber, Min } from 'class-validator';

export class AllGPSDto {

    @ApiProperty()
    ptinfo: string;

    @ApiProperty({nullable: false, minimum: -90, maximum: 90, example: 24.769752})
    @IsNumber()
    @Min(-90)
    @Max(90)
    latpt: number;
    
    @ApiProperty({nullable: false, minimum: -180, maximum: 180, example: 120.9993924})
    @IsNumber()
    @Min(-180)
    @Max(180)
    lngpt: number;

    @ApiProperty()
    alertName: number;

    @ApiProperty()
    eventName: number;

    @ApiProperty()
    radius: number;

    @ApiProperty()
    logtime: number

    public static fromEntity(entity: AllGpsEntity): AllGPSDto {
        const it = new AllGPSDto();
        it.ptinfo = entity.ptinfo;
        it.latpt = entity.latpt;
        it.lngpt = entity.lngpt;
        it.alertName = entity.alevel;
        it.eventName = entity.etype;
        it.radius = Number(entity.radius);
        it.logtime = new Date(entity.logtime).getTime()
        return it;
    }
}