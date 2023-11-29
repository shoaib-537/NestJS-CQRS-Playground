import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetPersonQuery } from "../impl/get-person.query";
import { Person } from "src/entities/person";
import { Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@QueryHandler(GetPersonQuery)
export class GetPersonHandler implements IQueryHandler<GetPersonQuery> {

    constructor(@InjectRepository(Person) private personRespo : Repository<Person>){}
     async execute(query: GetPersonHandler): Promise<Person[]> {
        return await this.personRespo.find();
    }
    
}
