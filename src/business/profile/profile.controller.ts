import {
  Controller,
  Get,
  Req,
  UseGuards,
  Put,
  Body,
  HttpException,
  HttpStatus,
  Param,
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
  async getUserBusinessProfile(@Req() req: Request) {
    console.log(req.user);
    const sub = req.user['idToken']['payload']['sub'];
    const businessProfile = await this.profileService.getUserBusinessProfile(
      sub,
    );
    return businessProfile;
  }
  @Get(':businessId')
  async getProfileByBusinessId(@Param() params) {
    console.log(params.businessId);
    return await this.profileService.getBusinessProfileById(params.businessId);
  }
  @Put()
  async putUserBusinessProfile(
    @Body() bfDt: businessProfileDto,
    @Req() req: Request,
  ) {
    console.log(req.user);
    console.log(bfDt.businessId);
    let businessProfile;
    if (bfDt.businessId) {
      businessProfile = await this.profileService.updateBusinessProfile(
        bfDt.businessId,
        bfDt.name,
        bfDt.description,
        bfDt.uen,
        bfDt.email,
        bfDt.address,
        bfDt.mainContactName,
        bfDt.mainContactNumber,
      );
    } else {
      const sub = req.user['idToken']['payload']['sub'];
      businessProfile = await this.profileService.createBusinessProfile(
        sub,
        bfDt.name,
        bfDt.description,
        bfDt.uen,
        bfDt.email,
        bfDt.address,
        bfDt.mainContactName,
        bfDt.mainContactNumber,
      );
      if (!businessProfile) {
        throw new HttpException(
          'Business Profile Creation Failed',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

    return businessProfile;
  }
}
