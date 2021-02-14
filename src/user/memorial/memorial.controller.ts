import {
  Controller,
  Put,
  Body,
  Req,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { createMemorialDto } from '../../dto/createMemorialDto';
import { Request } from 'express';
import { Memorial, User } from '../../entities';
import { v4 as uuidv4 } from 'uuid';
import { MemorialService } from './memorial.service';
@Controller('memorial')
export class MemorialController {
  constructor(private memorialService: MemorialService) {}
  @Put()
  async putMemorial(
    @Body() createMemorialDto: createMemorialDto,
    @Req() req: Request,
  ) {
    console.log(req.user);
    console.log(createMemorialDto);
    const sub = req.user['idToken']['payload']['sub'];
    const memorial: Memorial = new Memorial(
      uuidv4(),
      createMemorialDto.name,
      createMemorialDto.description,
      createMemorialDto.dateOfPassing,
      new Date(),
      createMemorialDto.wakeLocation,
      createMemorialDto.wakeDateRange[0],
      createMemorialDto.wakeDateRange[1],
      new User(sub),
    );
    const createdMemorial = await this.memorialService.createMemorialForUser(
      memorial,
    );
    if (!createdMemorial) {
      throw new HttpException(
        'Memorial Creation Failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } else {
      return createdMemorial;
    }
  }
}
