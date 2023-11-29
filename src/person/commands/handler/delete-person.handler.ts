import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeletePersonCommand } from '../impl/delete-person.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from 'src/entities/person';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeletePersonCommand)
export class DeletePersonHandler
  implements ICommandHandler<DeletePersonCommand>
{
  constructor(
    @InjectRepository(Person) private personRespo: Repository<Person>,
  ) {}
  async execute(command: DeletePersonCommand): Promise<any> {
    const person = await this.personRespo.findOne({ where: { id: command.id } });
    if (!person) {
      throw new NotFoundException('person not found');
    }

    await this.personRespo.remove(person);
  }
}
