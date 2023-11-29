import { ICommand } from "@nestjs/cqrs";

export class UpdatePersonCommand implements ICommand {
  constructor(public id: any, public name: string, public age: number) {}
}