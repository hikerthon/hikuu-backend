import { ApiProperty } from '@nestjs/swagger';
import { TrackerEntity } from '../entity/tracker.entity';

export class TrackerDto {
    @ApiProperty()
    hikerId: number;
  
    @ApiProperty()
    hikeId: number;
  
    @ApiProperty()
    recordTime: Date;
    
    @ApiProperty()
    latpt: number;
    
    @ApiProperty()
    lngpt: number;
    
    @ApiProperty()
    elevation: number;
    
    @ApiProperty()
    battery: number;
    
    @ApiProperty()
    network: number;
    
    @ApiProperty()
    elapsedTime: Date;
    
    @ApiProperty()
    logtime: Date;

    public toEntity():TrackerEntity {
        const it = new TrackerEntity();
        it.hiker.id = this.hikerId;
        it.hike.id = this.hikeId;
        it.recordTime = this.recordTime;
        it.latpt = this.latpt;
        it.lngpt = this.lngpt;
        it.elevation = this.elevation;
        it.battery = this.battery;
        it.network = this.network;
        it.elapsedTime = this.elapsedTime;
        it.logtime = this.logtime;
        return it;
    }

    public static fromEntity(entity: TrackerEntity): TrackerDto {
        const it = new TrackerDto();
        it.hikerId = entity.hiker.id;
        it.hikeId = entity.hike.id;
        it.recordTime = entity.recordTime;
        it.latpt = entity.latpt;
        it.lngpt = entity.lngpt;
        it.elevation = entity.elevation;
        it.battery = entity.battery;
        it.network = entity.network;
        it.elapsedTime = entity.elapsedTime;
        it.logtime = entity.logtime;

        return it;
    }
}