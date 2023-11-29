import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePersonCommand } from '../impl/create-person.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from 'src/entities/person';
import { Repository } from 'typeorm';
@CommandHandler(CreatePersonCommand)
export class CreatePersonHandler
  implements ICommandHandler<CreatePersonCommand>
{
  constructor(
    @InjectRepository(Person) private personRespo: Repository<Person>,
  ) {}

  async execute(command: CreatePersonCommand): Promise<any> {
    var newPerson = new Person();
    newPerson.age = command.age;
    newPerson.name = command.name;

    await this.personRespo.insert(newPerson);
  }
}
