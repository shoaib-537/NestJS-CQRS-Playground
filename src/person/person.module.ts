import { Module } from '@nestjs/common';
import { PersonController } from './person.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { GetPersonHandler } from './queries/handler/get-person.handler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from 'src/entities/person/person';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Person])],
  controllers: [PersonController],
  providers: [GetPersonHandler],
})
export class PersonModule {}
