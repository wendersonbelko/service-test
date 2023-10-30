import { Module } from '@nestjs/common';
import { AppController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshTokenStrategy } from './strategies/refresh.strategy';
import { AuthRepository } from './auth.repository';
import argon2 from 'argon2';

@Module({
  imports: [
    JwtModule.register({
      secret: `${process.env.JWT_SECRET}`,
      signOptions: {
        expiresIn: "3600s"
      }
    }),
  ],
  controllers: [AppController],
  providers: [
    AuthService,
    JwtService,
    LocalStrategy,
    JwtStrategy,
    RefreshTokenStrategy,
    AuthRepository,
    {
      provide: 'hasher',
      useFactory: () => argon2,
    }
  ],
})
export class AuthModule { }
