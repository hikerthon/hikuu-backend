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
    private readonly repo: Repository<AlertEntity>,
  ) {
  }

  async getAll(): Promise<AlertDto[]> {
    const alerts = await this.repo.find();
    return alerts.map(alert => AlertDto.fromEntity(alert));
  }

  async getAllView(start: number, count: number): Promise<AlertViewDto[]> {
    const alerts = await this.repo.find({
      relations: ['eventType', 'alertLevel', 'permit', 'creator', 'originSource', 'attachments'],
      order: { logtime: 'DESC' },
      take: count,
      skip: start,
    });
    return alerts.map(alert => AlertViewDto.fromEntity(alert));
  }

  async getCount(): Promise<CountResponseDto> {
    const count = await this.repo.count();
    return {
      success: true,
      count: count,
      errorMessage: null,
    };
  }

  async getViewById(id: number): Promise<AlertViewDto | null> {
    const alert = await this.repo.findOne({
      relations: ['eventType', 'alertLevel', 'permit', 'creator', 'originSource', 'attachments'],
      order: { logtime: 'DESC' },
      where: { id },
    });
    if (!alert) {
      return null;
    }
    return AlertViewDto.fromEntity(alert);
  }

  async create(alert: AlertDto): Promise<HikooResponse> {
    // save alert
    const saveThis = Object.assign(new AlertDto(), alert);
    const newAlert = await this.repo.save(saveThis.toEntity());

    // save attachments
    alert.attachments.forEach(function(attachment) {
      const atc = new AlertAttachmentEntity();
      atc.alert = newAlert;
      atc.imagePath = attachment;
      getConnection().getRepository(AlertAttachmentEntity).save(atc);
    });

    return { success: true };
  }
}
