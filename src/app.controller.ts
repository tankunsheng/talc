import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import 'cross-fetch/polyfill';
// import AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
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

  @Get('signup')
  getHello(): string {
    const attributeList = [];

    const attributeEmail = new CognitoUserAttribute({
      Name: 'email',
      Value: 'thedeveloperdiaries@gmail.com',
    });
    const dob = new CognitoUserAttribute({
      Name: 'birthdate',
      Value: '2021-01-11',
    });
    const gender = new CognitoUserAttribute({
      Name: 'gender',
      Value: 'male',
    });
    const name = new CognitoUserAttribute({
      Name: 'name',
      Value: 'tks',
    });
    const preferred_username = new CognitoUserAttribute({
      Name: 'preferred_username',
      Value: 'email@mydomain.com',
    });

    attributeList.push(attributeEmail);
    attributeList.push(dob);
    attributeList.push(gender);
    attributeList.push(name);
    attributeList.push(preferred_username);

    userPool.signUp(
      'username',
      'Password123',
      attributeList,
      null,
      function (err, result) {
        if (err) {
          console.log(err);
          return;
        }
        const cognitoUser = result.user;
        console.log(result);
        console.log('user name is ' + cognitoUser.getUsername());
      },
    );

    return this.appService.getHello();
  }

  @Get('login')
  login(): boolean {
    const authenticationDetails = new AuthenticationDetails({
      Username: 'username',
      Password: 'Password123',
    });
    const cognitoUser = new CognitoUser({
      Username: 'username',
      Pool: userPool,
    });
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (session, userConfirmationNecessary) {
        console.log('login success');
        console.log(session);
        console.log(userConfirmationNecessary);
      },
      onFailure: function (error) {
        console.log('login error');
        console.log(error);
      },
    });
    return false;
  }

  @Get('confirm')
  confirmSignup(): boolean {
    const authenticationDetails = new AuthenticationDetails({
      Username: 'username',
      Password: 'Password123',
    });
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
