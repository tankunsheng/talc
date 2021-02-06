import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Res,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AppService } from './app.service';
import 'cross-fetch/polyfill';
import { signupDto } from './dto';
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
} from 'amazon-cognito-identity-js';
import { Response, Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

const poolData = {
  UserPoolId: 'ap-southeast-1_r5tpHNIsa', // Your user pool id here
  ClientId: '1mjqap3bl47bgmj8mhv699r46q', // Your client id here
};
const userPool = new CognitoUserPool(poolData);
@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  root(@Req() req: Request) {
    console.log(
      `id token expiring at ${new Date(
        req.user['idToken']['payload']['exp'] * 1000,
      )}`,
    );
    //if idtoken is not expired, send back user info
    return req.user;
    //else refresh with refresh token
  }

  @Post('signup')
  async signUp(@Body() signupDto: signupDto): Promise<string> {
    // console.log(signupDto);
    const attributeList = [];

    const attributeEmail = new CognitoUserAttribute({
      Name: 'email',
      Value: signupDto.email,
    });
    const dob = new CognitoUserAttribute({
      Name: 'birthdate',
      Value: signupDto.dob,
    });
    const gender = new CognitoUserAttribute({
      Name: 'gender',
      Value: signupDto.gender,
    });
    const name = new CognitoUserAttribute({
      Name: 'name',
      Value: signupDto.username,
    });
    const preferred_username = new CognitoUserAttribute({
      Name: 'preferred_username',
      Value: signupDto.username,
    });

    attributeList.push(attributeEmail);
    attributeList.push(dob);
    attributeList.push(gender);
    attributeList.push(name);
    attributeList.push(preferred_username);

    const results: string = await new Promise<string>((resolve, reject) => {
      userPool.signUp(
        signupDto.username,
        signupDto.password,
        attributeList,
        null,
        function (err, result) {
          if (err) {
            console.log(err);
            reject(err);
          }
          console.log(`result is ${result}`);
          const cognitoUser = result.user;

          console.log('user name is ' + cognitoUser.getUsername());
          return resolve(cognitoUser.getUsername());
        },
      );
    }).catch((err) => {
      throw new HttpException('Forbidden', HttpStatus.BAD_REQUEST);
    });
    return results;
  }
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(
    @Res({ passthrough: true }) response: Response,
    @Req() req: Request,
  ): Promise<any> {
    console.log(response);
    console.log(req);
    const results = await new Promise((resolve, reject) => {
      req.logIn(req.user, function (err) {
        if (err) {
          reject(err);
        }
        resolve(req.user['idToken']['payload']);
      });
    });
    console.log(results);
    return results;
  }

  @Get('confirm')
  confirmSignup(@Req() req: Request): boolean {
    const cognitoUser = new CognitoUser({
      Username: 'username',
      Pool: userPool,
    });
    cognitoUser.confirmRegistration('123456', true, function (err, result) {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
      console.log('call result: ' + result);
    });
    return false;
  }
}
