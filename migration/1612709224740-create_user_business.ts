import {MigrationInterface, QueryRunner} from "typeorm";

export class createUserBusiness1612709224740 implements MigrationInterface {
    name = 'createUserBusiness1612709224740'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "business" ("business_id" character varying(50) NOT NULL, "name" character varying(100) NOT NULL, "description" character varying(500) NOT NULL, "uen" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "address" character varying(100) NOT NULL, "main_contact_name" character varying(100) NOT NULL, "main_contact_number" character varying(20) NOT NULL, "picture" character varying(100), CONSTRAINT "PK_a8b2281570e69c768f3c363184b" PRIMARY KEY ("business_id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("sub" character varying(50) NOT NULL, "username" character varying(50) NOT NULL, "role" character varying(50) NOT NULL, "email" character varying(100) NOT NULL, "address" character varying(250), "gender" character varying(1), "dob" bigint, "hp_no" character varying(20), "datetime_joined" bigint NOT NULL, "business_id" character varying(50), CONSTRAINT "PK_3641ff83ff7c23b2760b3df56d4" PRIMARY KEY ("sub"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_5a4bd96d9a519d4d20a21231b9f" FOREIGN KEY ("business_id") REFERENCES "business"("business_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_5a4bd96d9a519d4d20a21231b9f"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "business"`);
    }

}
