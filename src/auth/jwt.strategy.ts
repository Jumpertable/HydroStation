import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

interface JwtPayload {
  sub: number;
  email: string;
  role: string;
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const secretkey = process.env.JWT_SECRET_KEY;

    if (!secretkey) {
      throw new Error('Secret is not found in .env');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secretkey,
    });
  }

  validate(payload: JwtPayload): {
    userId: number;
    email: string;
    role: string;
  } {
    console.log('🔓 Extracted Payload:', payload);

    if (!payload.sub) {
      throw new UnauthorizedException('Invalid token: missing sub (userId)');
    }

    return {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}
