import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsEnum, MaxLength } from 'class-validator';
import { HikeEntity, PermitReqStatEnum } from '../entity/hike.entity';
import { TrailDto } from './trail.dto';
import { AccountDto } from './account.dto';
import { WatchStatusEnum } from '../entity/account.entity';

export class HikeDto {
  @ApiProperty(
    {
      description: 'auto generated on create',
      nullable: true,
      readOnly: true,
    })
  id: number;

  @ApiProperty({ nullable: false })
  @IsNumber()
  hikerId: number;

  @ApiProperty({ nullable: false, example: 1590361200000 })
  @IsNumber()
  hikeStart: number;

  @ApiProperty({ nullable: false, example: 1590361200000 })
  @IsNumber()
  hikeEnd: number;

  @ApiProperty({ nullable: false })
  permitId: number;

  @ApiProperty({ maxLength: 255, nullable: false })
  @IsString()
  @MaxLength(255)
  guideName: string;

  @ApiProperty({ maxLength: 255, nullable: false })
  @IsString()
  @MaxLength(255)
  guideContact: string;

  @ApiProperty({ maxLength: 255, nullable: false })
  @IsString()
  @MaxLength(255)
  guideContact2: string;

  @ApiProperty({
    enum: PermitReqStatEnum,
    default: PermitReqStatEnum.PENDING,
    description: 'auto generated on create',
    nullable: true,
  })
  @IsEnum(PermitReqStatEnum)
  permitAccepted: string;

  @ApiProperty({ nullable: false, example: 1590361200000 })
  @IsNumber()
  acceptedTime: number;

  @ApiProperty({ maxLength: 255, nullable: true })
  @IsString()
  @MaxLength(255)
  memo: string;

  @ApiProperty({ default: false, nullable: true })
  hikeStarted: boolean;

  @ApiProperty({ default: false, nullable: true })
  hikeFinished: boolean;

  @ApiProperty({ default: false, nullable: true })
  hikeCancelled: boolean;

  @ApiProperty({ description: 'auto generated on create', nullable: true, readOnly: true })
  @IsNumber()
  logtime: number;

  public static fromEntity(entity: HikeEntity): HikeDto {
    const it = new HikeDto();
    it.id = entity.id;
    it.hikerId = entity.hiker.id;
    it.hikeStart = new Date(entity.hikeStart).getTime();
    it.hikeEnd = new Date(entity.hikeEnd).getTime();
    it.permitId = entity.permit.id;
    it.guideName = entity.guideName;
    it.guideContact = entity.guideContact;
    it.guideContact2 = entity.guideContact2;
    it.permitAccepted = entity.permitAccepted;
    it.acceptedTime = new Date(entity.acceptedTime).getTime();
    it.memo = entity.memo;
    it.hikeStarted = entity.hikeStarted;
    it.hikeFinished = entity.hikeFinished;
    it.hikeCancelled = entity.hikeCancelled;
    it.logtime = new Date(entity.logtime).getTime();

    return it;
  }
}

export class HikeViewDto extends HikeDto {

  @ApiProperty({ type: AccountDto })
  hikerInfo: AccountDto;

  @ApiProperty()
  permitName: string;

  @ApiProperty({ type: [TrailDto] })
  trails: TrailDto[];

  public static fromEntity(entity: HikeEntity): HikeViewDto {
    const it = new HikeViewDto();
    it.id = entity.id;
    it.hikerId = entity.hikerId;
    it.hikeStart = new Date(entity.hikeStart).getTime();
    it.hikeEnd = new Date(entity.hikeEnd).getTime();
    it.permitId = entity.permit.id;
    it.permitName = entity.permit.name;
    it.guideName = entity.guideName;
    it.guideContact = entity.guideContact;
    it.guideContact2 = entity.guideContact2;
    it.permitAccepted = entity.permitAccepted;
    it.acceptedTime = new Date(entity.acceptedTime).getTime();
    it.memo = entity.memo;
    it.hikeStarted = entity.hikeStarted;
    it.hikeFinished = entity.hikeFinished;
    it.hikeCancelled = entity.hikeCancelled;
    it.logtime = new Date(entity.logtime).getTime();
    const hikerInfo = AccountDto.fromEntity(entity.hiker);
    const trails = entity.trails.map(trail => TrailDto.fromEntity(trail));
    it.trails = trails;
    it.hikerInfo = hikerInfo;
    return it;
  }
}

export class HikeViewModifyDto {

  @ApiProperty({ type: Number, example: 1 })
  hikeId: number;

  @ApiProperty({ type: Number, example: 1 })
  hikerId: number;

  @ApiProperty({ type: String, example: 'This is memo example' })
  memo: string;

  @ApiProperty()
  @IsEnum(WatchStatusEnum)
  watchStatus: string;

  // @ApiProperty({ enum: WatchStatusEnum ,example: EventStatusEnum.RESOLVED})
  // @IsEnum(WatchStatusEnum)
  // stat: string;


}