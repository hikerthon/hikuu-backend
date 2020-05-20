import { Controller, Get, Post, Body, Put, Logger, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiBody, ApiProperty, ApiParam } from '@nestjs/swagger';

export class Example {
  @ApiProperty()
  id: string;

  @ApiProperty()
  e1: string;

  @ApiProperty()
  e2: number;
}

@Controller('example')
export class ExampleController {

  constructor(private _logger: Logger) {
    _logger.setContext(ExampleController.name);
  }

  @Get()
  @ApiResponse({ status: 200, type: Example, isArray: true, description: 'Get example objects.' })
  getExample(): Example[] {
    return [];
  }

  @Post()
  @ApiBody({ type: Example })
  @ApiResponse({ status: 200, type: Response, description: 'Creates example object.' })
  newExample(@Body() example: Example): Response {
    this._logger.debug(example);
    return { success: true };
  }

  @Put(':id')
  @ApiBody({ type: Example })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ status: 200, type: Response, description: 'Modify example object.' })
  modifyExample(@Param('id') id: string, @Body() example: Example): Response {
    this._logger.debug(example);
    return { success: true };
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ status: HttpStatus.OK, type: Response, description: 'Delete example object.' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, type: Response, description: 'Failed to delete example object.' })
  deleteExample(@Param('id') id: string): Response {
    if (id === '1') {
      throw new HttpException({ success: false, errorMessage: 'Cannot delete id 1 example' }, HttpStatus.FORBIDDEN);
    }

    this._logger.debug(id);
    return { success: true };
  }
}
