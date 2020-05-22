import { ApiProperty } from "@nestjs/swagger";

export class PermitView {
    @ApiProperty()
    permitId: number;
  
    @ApiProperty()
    permitName: string;

    @ApiProperty()
    trailList: TrailView[]

    constructor(permitId: number, permitName: string, trailList: TrailView[])
    {
        this.permitId = permitId;
        this.permitName = permitName;
        this.trailList = trailList;
    }
}

export class TrailView {
    @ApiProperty()
    trailId: number;
  
    @ApiProperty()
    trailName: string;

    @ApiProperty()
    permitId: number;

    constructor(trailId: number, trailName: string, permitId: number)
    {
        this.trailId = trailId;
        this.trailName = trailName;
        this.permitId = permitId;
    }
}

export class HikingRequestView {
    @ApiProperty()
    hikeId: number;
  
    @ApiProperty()
    hikerId: number;
  
    @ApiProperty()
    hikerName: string;
  
    @ApiProperty()
    hikerGender: string;
  
    @ApiProperty()
    hikerAge: number;
  
    @ApiProperty()
    hikerNationality: string;
  
    @ApiProperty()
    hikeStartTime: string;
  
    @ApiProperty()
    hikeEndTime: string;
  
    @ApiProperty()
    permitId: number;
  
    @ApiProperty()
    permitName: string;
  
    @ApiProperty({required: false})
    permitAccepted: boolean;
  
    @ApiProperty()
    hikeStarted: boolean;
  
    @ApiProperty()
    hikeFinished: boolean;

    constructor(hikeId: number, hikerId: number, 
        hikerName: string, hikerGender, hikerAge, hikerNationality: string, 
        hikeStartTime: string, hikeEndTime: string,
        permitId: number, permitName: string, permitAccepted: boolean,
        hikeStarted: boolean, hikeFinished: boolean) 
        {
            this.hikeId = hikeId;
            this.hikerId = hikerId;
            this.hikerName = hikerName;
            this.hikerGender = hikerGender;
            this.hikerAge = hikerAge;
            this.hikerNationality = hikerNationality;
            this.hikeStartTime = hikeStartTime;
            this.hikeEndTime = hikeEndTime;
            this.permitId = permitId;
            this.permitName = permitName;
            this.permitAccepted = permitAccepted;
            this.hikeStarted = hikeStarted;
            this.hikeFinished = hikeFinished;
        }
}

export class CreateHikingRequest {
    readonly hikerId: number;
    readonly hikeStartTime: string;
    readonly hikeEndTime: string;
    readonly permitId: number;
}
