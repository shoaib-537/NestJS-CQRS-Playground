import { Module } from '@nestjs/common';
import { PersonController } from './person.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { GetPersonHandler } from './queries/handler/get-person.handler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from 'src/entities/person';
import { CreatePersonHandler } from './commands/handler/create-person.handler';
import { UpdatePersonHandler } from './commands/handler/update-person.handler';
import { DeletePersonHandler } from './commands/handler/delete-person.handler';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Person])],
  controllers: [PersonController],
  providers: [
    GetPersonHandler,
    CreatePersonHandler,
    UpdatePersonHandler,
    DeletePersonHandler,
  ],
})
export class PersonModule {}
