import { ApiProperty } from '@nestjs/swagger';
import { TrackerEntity } from '../entity/tracker.entity';
import { IsNumber, IsDataURI, IsDate, Max, Min } from 'class-validator';

export class TrackerDto {
    @ApiProperty({nullable: false, example: 1})
    @IsNumber()
    hikerId: number;
    
    @ApiProperty({nullable: false, example: 1})
    @IsNumber()
    hikeId: number;
    
    @ApiProperty({nullable: false, description: 'creation time in mobile phone before pushing to backend'})
    @IsDate()
    recordTime: Date;
    
    @ApiProperty({nullable: false, minimum: -90, maximum: 90, example: 24.1177877})
    @IsNumber()
    @Min(-90)
    @Max(90)
    latpt: number;
    
    @ApiProperty({nullable: false, minimum: -180, maximum: 180, example: 121.3103961})
    @IsNumber()
    @Min(-180)
    @Max(180)
    lngpt: number;
    
    @ApiProperty({nullable: false, example: 2500})
    @IsNumber()
    elevation: number;
    
    @ApiProperty({nullable: false, minimum:0, maximum: 100, example: 80})
    @IsNumber()
    @Min(0)
    @Max(100)
    battery: number;
    
    @ApiProperty({nullable: false, example: -60})
    network: number;
    
    @ApiProperty({nullable: false, example: '00:30:00'})
    elapsedTime: Date;
    
    @ApiProperty({description: 'auto generated on create', nullable: true, readOnly: true})
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