import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const secretkey = process.env.JWT_SECRET_KEY;
    if (!secretkey) {
      throw new Error('Secret is not found');
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secretkey,
    });
  }


  async validate(payload: any) {
    console.log('🔓 Extracted Payload:', payload);  // ✅ Should contain { user_id: 1 }
  
    if (!payload.user_id) {
      throw new UnauthorizedException('Invalid token: user_id missing');
    }
  
    return { user_id: payload.user_id }; // ✅ This will be attached to `req.user`
  }
}
