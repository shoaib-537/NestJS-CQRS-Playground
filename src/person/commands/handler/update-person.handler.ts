import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdatePersonCommand } from '../impl/update-person.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from 'src/entities/person';
import { FindOneOptions, Repository } from 'typeorm';

@CommandHandler(UpdatePersonCommand)
export class UpdatePersonHandler
  implements ICommandHandler<UpdatePersonCommand>
{
  constructor(
    @InjectRepository(Person) private personRespo: Repository<Person>,
  ) {}
  async execute(command: UpdatePersonCommand): Promise<any> {
    if (command.id === undefined || command.id === null) {
      throw new Error('Invalid or missing ID');
    }
    const person = await this.personRespo.findOne({
      where: { id: command.id },
    } as FindOneOptions<Person>);
    if (!person) {
      throw new Error('Person not found');
    }

    person.name = command.name;
    person.age = command.age;

    await this.personRespo.save(person);
  }
}
