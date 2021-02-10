import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Business, User } from '../../entities';
import { Repository, UpdateResult, getConnection } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Business)
    private businessRepo: Repository<Business>,
  ) {}
  async getUserBusinessProfile(sub: string): Promise<Business> {
    const user = await this.userRepo.findOne({
      where: { sub: sub },
      relations: ['business'],
    });
    return user.business;
  }
  async updateBusinessProfile(
    businessId: string,
    name: string,
    description: string,
    uen: string,
    email: string,
    address: string,
    mainContactName: string,
    mainContactNumber: string,
  ): Promise<Business> {
    //to be implemented
    const business: Business = new Business(
      businessId,
      name,
      description,
      uen,
      email,
      address,
      mainContactName,
      mainContactNumber,
    );
    //insert businessrepo first then update userrepo
    const result: Business = await this.businessRepo.save(business);
    return result;
  }

  async createBusinessProfile(
    sub: string,
    name: string,
    description: string,
    uen: string,
    email: string,
    address: string,
    mainContactName: string,
    mainContactNumber: string,
  ): Promise<Business> {
    // get a connection and create a new query runner
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    // establish real database connection using our new query runner
    await queryRunner.connect();
    // lets now open a new transaction:
    await queryRunner.startTransaction();
    let updateResult: UpdateResult;
    let business: Business;
    try {
      const businessId = uuidv4();
      business = new Business(
        businessId,
        name,
        description,
        uen,
        email,
        address,
        mainContactName,
        mainContactNumber,
      );
      //insert businessrepo first then update userrepo
      await this.businessRepo.save(business);
      updateResult = await this.userRepo.update(sub, {
        business: {
          businessId: businessId,
        },
      });
      // commit transaction now:
      await queryRunner.commitTransaction();
    } catch (err) {
      // since we have errors let's rollback changes we made
      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release query runner which is manually created:
      await queryRunner.release();
    }
    console.log(updateResult);
    if (updateResult.affected === 1) {
      return business;
    } else {
      return undefined;
    }
  }
}
