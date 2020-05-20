import { ApiProperty } from "@nestjs/swagger";

export class PermitView {
    @ApiProperty()
    permitId: number;
  
    @ApiProperty()
    permitName: string;    
}

export class HikingPermitView {
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

export class CreateHikingPermit {
    @ApiProperty()
    readonly hikerId: number;
  
    @ApiProperty()
    readonly hikeStartTime: string;
  
    @ApiProperty()
    readonly hikeEndTime: string;
  
    @ApiProperty()
    readonly permitId: number;
}
