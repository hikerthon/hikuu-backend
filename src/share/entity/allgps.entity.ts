import { ViewEntity, ViewColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";


@ViewEntity({
    name: 'AllGpsMaps',
    expression: `SELECT *`
})
export class AllGpsEntity {
    @ApiProperty({description: 'point info, either hiker/alert/event', nullable: false, example: 'hiker'})
    @ViewColumn()
    ptinfo: string;

    @ApiProperty({nullable: false})
    @ViewColumn()
    latpt: number;

    @ApiProperty({nullable: false})
    @ViewColumn()
    lngpt: number;

    @ApiProperty({description: 'event type name', nullable: false, example: 'Wild Animal'})
    @ViewColumn()
    etype: number;

    @ApiProperty({description: 'alert level name', nullable: false, example: 'Caution'})
    @ViewColumn()
    alevel: number;

    @ApiProperty({description: 'radius value, in km', nullable: false})
    @ViewColumn()
    radius: number;

    @ApiProperty({nullable: false})
    @ViewColumn()
    logtime: Date;
}