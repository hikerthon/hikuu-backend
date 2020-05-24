import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, TreeRepository } from 'typeorm';
import { AlertEntity } from 'src/share/entity/alert.entity';
import { AlertDto, AlertViewDto } from 'src/share/dto/alert.dto';
import { HikooResponse } from 'src/share/models/hikoo.model';

@Injectable()
export class AlertService {
    constructor(
      @InjectRepository(AlertEntity)
      private readonly repo: Repository<AlertEntity>
    ) {}

    getFakeAlerts() {
        return null;
    }

    getFakeAlertById(id) {
        return {
            permitId: 1,
            permitName: 'Yushan National Park Permit',
            lat: 23.468818,
            lng: 120.954489,
            radius: 3,
            alertLevelId: 2,
            alertLevel: 'Caution',
            eventTypeId: 1,
            eventType: 'Animal',
            eventInfo: 'Water Buffalloo nearby',
            eventTIme: '2020-05-19 17:00',
            ttl: 6,
            stationId: 1,
            stationName: 'Yushan'
        }
    }

    getFakeAllAlertCount() {
        return 10;
    }

    async getAll(): Promise<AlertDto[]> {
        const alerts = await this.repo.find();
        return alerts.map( alert => AlertDto.fromEntity(alert) );
    }

    async getById(id: number): Promise<AlertDto> {
        const one = await this.repo.findOne({where: {id: id}});
        return AlertDto.fromEntity(one);
    }

    async getAllView(start: number, count: number): Promise<AlertViewDto[]> {
        const alerts = await this.repo.find({
            relations: ['eventType', 'alertLevel', 'permit', 'creator', 'originSource'],
            order: {logtime: 'DESC'},
            take: count,
            skip: start
        });

        return alerts.map( alert => AlertViewDto.fromEntity(alert) );
    }

    async getCount(): Promise<number> {
        const count = await this.repo.count();
        return count;
    }

    async getViewById(id: number): Promise<AlertViewDto> {
        const alert = await this.repo.findOneOrFail();
        return AlertViewDto.fromEntity(alert);
    }

    async create(alert: AlertDto): Promise<HikooResponse> {
        let errMessage: string;
        const result = await this.repo.save(alert).catch((err: any) => {errMessage = err})
        
        return new HikooResponse(result? true : false, errMessage);
    }
}
