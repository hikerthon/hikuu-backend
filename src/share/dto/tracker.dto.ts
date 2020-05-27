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
    @IsNumber()
    recordTime: number;
    
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
    

    @ApiProperty({nullable: false})
    @IsNumber()
    elapsedTime: number;
    
    @ApiProperty({description: 'auto generated on create', nullable: true, readOnly: true})
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