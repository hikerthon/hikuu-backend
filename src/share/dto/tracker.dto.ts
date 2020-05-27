import { ApiProperty } from '@nestjs/swagger';
import { TrackerEntity } from '../entity/tracker.entity';
import { IsNumber, IsDataURI, IsDate, Max, Min } from 'class-validator';

export class TrackerDto {
    @ApiProperty({readOnly: true})
    @IsNumber()
    hikerId: number;
    
    @ApiProperty()
    @IsNumber()
    hikeId: number;
    
    @ApiProperty()
    @IsNumber()
    recordTime: number;
    
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
    
    @ApiProperty()
    @IsNumber()
    elevation: number;
    
    @ApiProperty({minimum:0, maximum: 100})
    @IsNumber()
    @Min(0)
    @Max(100)
    battery: number;
    
    @ApiProperty()
    network: number;
    
    @ApiProperty()
    @IsNumber()
    elapsedTime: number;
    
    @ApiProperty()
    @IsNumber()
    logtime: number;

    public toEntity():TrackerEntity {
        const it = new TrackerEntity();
        it.hiker.id = this.hikerId;
        it.hike.id = this.hikeId;
        it.recordTime = new Date(this.recordTime);
        it.latpt = this.latpt;
        it.lngpt = this.lngpt;
        it.elevation = this.elevation;
        it.battery = this.battery;
        it.network = this.network;
        it.elapsedTime = new Date(this.elapsedTime);
        it.logtime = new Date(this.logtime);
        return it;
    }

    public static fromEntity(entity: TrackerEntity): TrackerDto {
        const it = new TrackerDto();
        it.hikerId = entity.hiker.id;
        it.hikeId = entity.hike.id;
        it.recordTime = new Date(entity.recordTime).getTime();
        it.latpt = entity.latpt;
        it.lngpt = entity.lngpt;
        it.elevation = entity.elevation;
        it.battery = Number(entity.battery);
        it.network = Number(entity.network);
        it.elapsedTime = new Date(entity.elapsedTime).getTime();
        it.logtime = new Date(entity.logtime).getTime();

        return it;
    }
}