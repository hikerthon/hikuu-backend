import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { AlertlevelService } from "./alertlevel.service";
import { AlertLevelDto } from "./dto/alertlevel.dto"

@ApiTags('basic')
@Controller('alertlevel')
export class AlertlevelController {
    constructor(private alSvc: AlertlevelService) {}

    @Get()
    @ApiResponse({ status: 200, type: AlertLevelDto, isArray: true, description: 'Returns all alert level' })
    getAlertLevels() {
        return this.alSvc.getAlertLevels();
    }
}
