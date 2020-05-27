import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
import { AlertEntity, AlertAttachmentEntity } from 'src/share/entity/alert.entity';
import { AlertDto, AlertViewDto } from 'src/share/dto/alert.dto';
import { HikooResponse, CountResponseDto } from 'src/share/dto/generic.dto';

@Injectable()
export class AlertService {
    constructor(
        @InjectRepository(AlertEntity)
        private readonly repo: Repository<AlertEntity>
    ) { }

    getFakeAlerts() {
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

    async getAll(): Promise<AlertDto[]> {
        const alerts = await this.repo.find();
        return alerts.map(alert => AlertDto.fromEntity(alert));
    }

    async getById(id: number): Promise<AlertDto> {
        const one = await this.repo.findOne({
            relations: ['attachments'],
         where: { id: id } });
         console.log(one)
        return AlertDto.fromEntity(one);
    }

    async getAllView(start: number, count: number): Promise<AlertViewDto[]> {
        const alerts = await this.repo.find({
            relations: ['eventType', 'alertLevel', 'permit', 'creator', 'originSource', 'attachments'],
            order: { logtime: 'DESC' },
            take: count,
            skip: start
        });

        return alerts.map(alert => AlertViewDto.fromEntity(alert));
    }

    async getCount(): Promise<CountResponseDto> {
        try {
            const count = await this.repo.count();
            return {
                success: true,
                count: count,
                errorMessage: null
            }
        } catch(e) {
            return {
                success: false,
                count: 0,
                errorMessage: e.message
            }
        }
    }

    async getViewById(id: number): Promise<AlertViewDto> {
        const alert = await this.repo.findOne({
            relations: ['eventType', 'alertLevel', 'permit', 'creator', 'originSource', 'attachments'],
            order: { logtime: 'DESC' },
            where: { id }
        });
        return AlertViewDto.fromEntity(alert);
    }

    async create(alert: AlertDto): Promise<HikooResponse> {
        try {
            
            // save alert
            const saveThis = Object.assign(new AlertDto(), alert);
            const newAlert = await this.repo.save(saveThis.toEntity());

            // save attachments
            alert.attachments.forEach(function (attachment) {
                const atc = new AlertAttachmentEntity();
                atc.alert = newAlert;
                atc.imagePath = attachment;
                getConnection().getRepository(AlertAttachmentEntity).save(atc);
            });

        } catch (e) {
            return { success: false, errorMessage: e.message };
        }

        return { success: true }
    }

    // createFromEvent --> need to update Events stat into RESOLVED
}
