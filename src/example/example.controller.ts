import { Controller, Get, Post, Body, Put, Logger, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiBody, ApiProperty, ApiParam } from '@nestjs/swagger';
import { HikooResponse } from '../share/models/hikoo.model';
import { IsEmail, IsUUID, IsDefined, Max, IsOptional } from 'class-validator';
import { EventsGateway } from 'src/web/events/events.gateway';

export class Example {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  id: string;

  @ApiProperty({ minLength: 10, format: 'email' })
  @IsEmail()
  e1: string;

  @ApiProperty({ maximum: 10 })
  @IsDefined()
  @Max(10)
  e2: number;
}

@Controller('example')
export class ExampleController {

  constructor(
    private _logger: Logger,
    private _eventGateway: EventsGateway
  ) {
    _logger.setContext(ExampleController.name);
  }

  @Get()
  @ApiResponse({ status: 200, type: Example, isArray: true, description: 'Get example objects.' })
  getExample(): Example[] {
    return [];
  }

  @Post()
  @ApiBody({ type: Example })
  @ApiResponse({ status: 200, type: HikooResponse, description: 'Creates example object.' })
  newExample(@Body() example: Example): HikooResponse {
    this._logger.debug(example);
    this._eventGateway.newTest('fuck');
    return { success: true };
  }

  @Put(':id')
  @ApiBody({ type: Example })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ status: 200, type: HikooResponse, description: 'Modify example object.' })
  modifyExample(@Param('id') id: string, @Body() example: Example): HikooResponse {
    this._logger.debug(example);
    return { success: true };
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ status: HttpStatus.OK, type: HikooResponse, description: 'Delete example object.' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, type: HikooResponse, description: 'Failed to delete example object.' })
  deleteExample(@Param('id') id: string): HikooResponse {
    if (id === '1') {
      throw new HttpException({ success: false, errorMessage: 'Cannot delete id 1 example' }, HttpStatus.FORBIDDEN);
    }

    this._logger.debug(id);
    return { success: true };
  }
}
