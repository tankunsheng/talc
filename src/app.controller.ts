import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AppService } from './app.service';
import 'cross-fetch/polyfill';
import { signupDto, loginDto } from './dto';
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserSession,
} from 'amazon-cognito-identity-js';
console.log(CognitoUserPool);
console.log(CognitoUserAttribute);
console.log(CognitoUser);

const poolData = {
  UserPoolId: 'ap-southeast-1_r5tpHNIsa', // Your user pool id here
  ClientId: '1mjqap3bl47bgmj8mhv699r46q', // Your client id here
};
const userPool = new CognitoUserPool(poolData);
@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

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

  @Get('login')
  async login(@Body() loginDto: loginDto): Promise<CognitoUserSession> {
    const authenticationDetails = new AuthenticationDetails({
      Username: loginDto.username,
      Password: loginDto.password,
    });
    const cognitoUser = new CognitoUser({
      Username: loginDto.username,
      Pool: userPool,
    });
    const result = await new Promise<CognitoUserSession>((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (session, userConfirmationNecessary) {
          console.log('login success');
          console.log(session);
          console.log(userConfirmationNecessary);
          resolve(session);
        },
        onFailure: function (error) {
          console.log('login error');
          console.log(error);
          reject(error);
        },
      });
    }).catch((err) => {
      throw new HttpException('Forbidden', HttpStatus.BAD_REQUEST);
    });
    return result;
  }

  @Get('confirm')
  confirmSignup(): boolean {
    // const authenticationDetails = new AuthenticationDetails({
    //   Username: 'username',
    //   Password: 'Password123',
    // });
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
