import { ApiProperty } from '@nestjs/swagger';

export class AroundMeDto {
    @ApiProperty({description: 'point info, either alert or event (SOS is an event!)'})
    ptinfo: string;

    @ApiProperty({name: 'event_type_name'})
    eventTypeName: string;
  
    @ApiProperty({name: 'alert_name'})
    alertLevelName: string;

    @ApiProperty({name: 'event_info'})
    eventInfo: string;

    @ApiProperty()
    latpt: number;

    @ApiProperty()
    lngpt: number;

    @ApiProperty()
    distanceMeter: number;

    @ApiProperty()
    logtime: Date;


    public static fromEntity(entity: any): AroundMeDto {
        const it = new AroundMeDto();
        it.ptinfo = entity.ptinfo;
        it.eventTypeName = entity.event_type_name;
        it.alertLevelName = entity.alert_level_name;
        it.eventInfo = entity.event_info;
        it.latpt = entity.latpt;
        it.lngpt = entity.lngpt;
        it.distanceMeter = entity.distance_mtr;
        it.logtime = entity.logtime;

        return it;
    }
}