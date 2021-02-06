import { Injectable } from '@nestjs/common';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserSession,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  userPool: CognitoUserPool;

  constructor(private configService: ConfigService) {
    const poolData = {
      UserPoolId: configService.get<string>('COGNITO_USERPOOL_ID'), // Your user pool id here
      ClientId: configService.get<string>('COGNITO_USERPOOL_APP_ID'), // Your client id here
    };
    this.userPool = new CognitoUserPool(poolData);
  }
  async validateUser(username: string, password: string): Promise<any> {
    const authenticationDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });
    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: this.userPool,
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
      console.log(err);
      return;
    });
    console.log(result);
    return result;
  }
}
