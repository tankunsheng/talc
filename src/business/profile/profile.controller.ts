import {
  Controller,
  Get,
  Req,
  UseGuards,
  Put,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '../../auth/auth.guard';
import { ProfileService } from './profile.service';
import { businessProfileDto } from '../../dto/businessProfileDto';

@UseGuards(AuthGuard)
@Controller('business/profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}
  @Get()
  async getProfile(@Req() req: Request) {
    console.log(req.user);
    const sub = req.user['idToken']['payload']['sub'];
    const businessProfile = await this.profileService.getUserBusinessProfile(
      sub,
    );
    return businessProfile;
  }
  @Put()
  async putProfile(
    @Body() businessProfileDto: businessProfileDto,
    @Req() req: Request,
  ) {
    console.log(req.user);
    console.log(businessProfileDto);
    const sub = req.user['idToken']['payload']['sub'];
    const businessProfile = await this.profileService.createBusinessProfile(
      sub,
      businessProfileDto.name,
      businessProfileDto.description,
      businessProfileDto.uen,
      businessProfileDto.email,
      businessProfileDto.address,
      businessProfileDto.mainContactName,
      businessProfileDto.mainContactNumber,
    );
    if (!businessProfile) {
      throw new HttpException(
        'Business Profile Creation Failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return businessProfile;
  }
}
