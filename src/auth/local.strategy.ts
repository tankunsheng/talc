import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import passport from 'passport';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

passport.serializeUser(function (user, done) {
  console.log(user);
  done(null, user);
});

passport.deserializeUser(function (id, done) {
  console.log(id);
  done(null, id);
  // User.findById(id, function (err, user) {
  //   done(err, user);
  // });
});
