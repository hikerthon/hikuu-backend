import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection, getManager } from 'typeorm';
import { AlertEntity, AlertAttachmentEntity } from 'src/share/entity/alert.entity';
import { AlertDto, AlertViewDto } from 'src/share/dto/alert.dto';
import { HikooResponse, CountResponseDto } from 'src/share/dto/generic.dto';
import { FirebaseMessagingService } from '@aginix/nestjs-firebase-admin/dist';
import { AccountEntity } from '../../share/entity/account.entity';

@Injectable()
export class AlertService {
  constructor(
    @InjectRepository(AlertEntity)
    private readonly repo: Repository<AlertEntity>,
    private _fcm: FirebaseMessagingService,
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
    let userTokens = [];
    const tokens = await getManager().query(`
SELECT c.fcm_token
FROM hikes a INNER JOIN tracker b ON a.id=b.hike_id AND a.hiker_id=b.hiker_id INNER JOIN account c ON a.hiker_id=c.id 
WHERE a.hike_started=1 AND a.hike_finished=0 AND a.hike_cancelled=0
AND latpt BETWEEN ? - ? / 111.045 AND ? + ? / 111.045 
AND lngpt BETWEEN ? - (? / (111.045 * COS(RADIANS(?)))) AND ? + (? / (111.045 * COS(RADIANS(?))));
`, [alert.latpt, alert.radius, alert.latpt, alert.radius, alert.lngpt, alert.radius, alert.latpt, alert.lngpt, alert.radius, alert.latpt]).then(rows => rows);
    tokens.forEach(element => {
      userTokens.push(element['fcm_token']);
    });

    if (userTokens.length > 0) {
      await this._fcm.sendMulticast({
        notification: {
          title: 'Hikoo',
          body: alert.eventInfo,
        },
        tokens: userTokens,
      });
    }

    return {
      success: true,
    };

  }
}
