import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MapGpsEntity } from 'src/share/entity/allgps.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AllgpsService {
    constructor(
        @InjectRepository(MapGpsEntity)
        private readonly repo: Repository<MapGpsEntity>
    ) { }

    getFakeGPS() {
        return [{
            location: '23.468858, 120.954451',
            pointType: 'hiker',
            eventId: 0,
            alertId: 0,
            timestamp: 1589894000
        }, {
            location: '23.468878, 120.954459',
            pointType: 'hiker',
            eventId: 0,
            alertId: 0,
            timestamp: 1589894000
        }, {
            location: '23.469311, 120.955127',
            pointType: 'event',
            eventId: 1,
            alertId: 1,
            timestamp: 1589895049
        }]
    }

    async getAll(): Promise<MapGpsEntity[]> {
        const gpsData = await this.repo.find();
        return gpsData;
    }
}
