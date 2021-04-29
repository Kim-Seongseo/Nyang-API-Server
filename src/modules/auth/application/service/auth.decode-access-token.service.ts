import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthDecodeAccessTokenService {
  constructor(private jwtService: JwtService) {}

  async decodeAccessToken(token: string): Promise<any> {
    return await this.jwtService.decode(token);
  }
}
