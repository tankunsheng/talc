import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';
import connect_dynamodb from 'connect-dynamodb';
import { ConfigService } from '@nestjs/config';
import passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const options = {
    table: 'talc-dev-sessions',
    // Optional path to AWS credentials and configuration file
    // AWSConfigPath: './path/to/credentials.json',
    // Optional JSON object of AWS credentials and configuration
    AWSConfigJSON: {
      accessKeyId: configService.get('DYNAMODB_SESSIONS_ACCESS_KEY_ID'),
      secretAccessKey: configService.get('DYNAMODB_SESSIONS_SECRET_ACCESS_KEY'),
      region: 'ap-southeast-1',
    },
    readCapacityUnits: 5,
    writeCapacityUnits: 5,
  };
  app.enableCors({
    credentials: true,
    // only used for development as frontend and backend are served from different ports which violates cors
    origin: ['http://localhost:3010', 'http://localhost:3000'],
  });
  const DynamoDBStore = connect_dynamodb({ session: session });
  app.use(
    session({
      store: new DynamoDBStore(options),
      secret: 'my-secret',
      // resave: false,
      saveUninitialized: false, // <-- dont save failed logins into session to save space and writes
      cookie: {
        // sameSite: 'none',
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3000);
}
bootstrap();
