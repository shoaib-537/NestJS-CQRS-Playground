import {
  Controller,
  Get,
  Body,
  Post,
  HttpCode,
  UsePipes,
  ValidationPipe,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { GetPersonQuery } from './queries/impl/get-person.query';
import { CreatePersonCommand } from './commands/impl/create-person.command';
import { UpdatePersonCommand } from './commands/impl/update-person.command';
@Controller('person')
export class PersonController {
  constructor(
    private queryBus: QueryBus,
    private commandBus: CommandBus,
  ) {}
  @Get('all')
  async getAll() {
    return await this.queryBus.execute(new GetPersonQuery());
  }
  @Post('add')
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ transform: true }))
  async save(@Body() payload: CreatePersonCommand) {
    await this.commandBus.execute(payload);
  }

  @Post(':id')
  @HttpCode(201)
  async updatePerson(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePersonCommand: UpdatePersonCommand,
  ) {
    return await this.commandBus.execute(
      new UpdatePersonCommand(
        id,
        updatePersonCommand.name,
        updatePersonCommand.age,
      ),
    );
  }
}
