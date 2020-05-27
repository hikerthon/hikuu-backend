import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min, Max, IsString } from 'class-validator';

export class AroundMeDto {
    @ApiProperty({description: 'point info, either alert or event (SOS is an event!)'})
    ptinfo: string;

    @ApiProperty({name: 'event_type_name'})
    eventTypeName: string;
  
    @ApiProperty({name: 'alert_name'})
    alertLevelName: string;

    @ApiProperty({name: 'event_info'})
    eventInfo: string;

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
    distanceMeter: number;

    @ApiProperty()
    logtime: number;


    public static fromEntity(entity: any): AroundMeDto {
        const it = new AroundMeDto();
        it.ptinfo = entity.ptinfo;
        it.eventTypeName = entity.event_type_name;
        it.alertLevelName = entity.alert_level_name;
        it.eventInfo = entity.event_info;
        it.latpt = Number(entity.latpt);
        it.lngpt = Number(entity.lngpt);
        it.distanceMeter = entity.distance_mtr;
        it.logtime = new Date(entity.logtime).getTime();

        return it;
    }
}