import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';
import { Users } from './database/interfaces/Users';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {

  constructor(
    private jwtService: JwtService,
    private authRespository: AuthRepository,
  ) {
  }


  private users = [{
    id: 1,
    name: "wenderson belko",
    email: "wenderson@belko.com.br",
    password: "123"
  },
  {
    id: 2,
    name: "wenderson belko",
    email: "contato@wendersonbelko.com",
    password: "123"
  }];

  private async encryptPassword(password: string): Promise<string> {
    const hash = await argon2.hash(password);

    return hash;
  }

  private async decryptPassword(password: string, hashedPassword: string): Promise<boolean> {
    const isValid = await argon2.verify(hashedPassword, password);
    return isValid;
  }

  async validateUser(email: string, password: string) {
    const user = this.users.find(async (user) => {
      if (user.email === email && await this.decryptPassword(password, user.password)) {
        return user;
      }
    })[0];

    return user;
  }

  async login(user: typeof this.users[0]) {
    const payload = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    };

    return {
      ...payload,
      token: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: '7d'
      })
    };
  }

  async refresh(user: typeof this.users[0]) {
    const payload = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    };

    return {
      ...payload,
      token: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: '7d'
      })
    };
  }

  async register(user: Partial<Users>) {
    const hash = await this.encryptPassword(user.password)
    const result = await this.authRespository.createUser(
      {
        ...user,
        password: hash
      })

    return result
  }
}