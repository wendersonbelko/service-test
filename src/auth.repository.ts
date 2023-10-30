import knex, { Knex } from "knex";
import { Users } from "./database/interfaces/Users";
import knexfile from '../knexfile';

export class AuthRepository {
  constructor(private db: Knex) {
    this.db = knex(knexfile)
  }

  async createUser(user: Partial<Users>): Promise<Users> {
    const result = await this.db<Users>('common.users')
      .insert({
        ...user,
      }).returning('*');

    return result[0];
  }
}