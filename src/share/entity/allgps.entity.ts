import { ViewEntity, ViewColumn } from "typeorm";


@ViewEntity({
    name: 'AllGpsMaps',
    expression: `SELECT *`
})
export class MapGpsEntity {
    @ViewColumn()
    ptinfo: string;

    @ViewColumn()
    latpt: number;

    @ViewColumn()
    lngpt: number;

    @ViewColumn()
    etype: number;

    @ViewColumn()
    alevel: number;

    @ViewColumn()
    radius: number;

    @ViewColumn()
    logtime: Date;
}