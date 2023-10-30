import { Body, Controller, Get, Logger, Post, Request, Response as Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Response } from 'express';
import { JwtGuard } from './guards/jwt-auth.guard';
import { RefreshGuard } from './guards/refresh-auth.guard';
import { Users } from './database/interfaces/Users';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class AppController {
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

  constructor(private readonly AuthService: AuthService) { }

  // @UseGuards(LocalAuthGuard)
  // @UseGuards(JwtGuard)
  // @UseGuards(RefreshGuard)
  async login(@Body() body: typeof this.users[0], @Request() req, @Res() res: Response) {
    const result = await this.AuthService.login(body);
    return res.json(result)
  }

  @GrpcMethod('authProtoService', 'register')
  async register(data: Partial<Users>) {
    console.log(data)
    // const result = this.AuthService.register(data)
    return { status: 'teste' }
  }

  async refresh(@Request() req) {
    // return this.appService.refresh()
    // Verificar se é real o usuario e o token antigo e novo, caso dê certo retorne os novos dados atualizados
  }
}
