import { MigrationInterface, QueryRunner } from 'typeorm';

export class firstLaunch1612884410985 implements MigrationInterface {
  name = 'firstLaunch1612884410985';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("sub" character varying(50) NOT NULL, "username" character varying(50) NOT NULL, "role" character varying(50) NOT NULL, "email" character varying(100) NOT NULL, "address" character varying(250), "gender" character varying(1), "dob" bigint, "hp_no" character varying(20), "datetime_joined" bigint NOT NULL, "business_id" character varying(50), CONSTRAINT "PK_3641ff83ff7c23b2760b3df56d4" PRIMARY KEY ("sub"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "category" ("name" character varying(50) NOT NULL, "description" character varying(500) NOT NULL, CONSTRAINT "PK_23c05c292c439d77b0de816b500" PRIMARY KEY ("name"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product_service_to_category" ("business_id" character varying(50) NOT NULL, "name" character varying(100) NOT NULL, "category" character varying(50) NOT NULL, CONSTRAINT "PK_8f7484e69841b09f6ae090264d5" PRIMARY KEY ("business_id", "name", "category"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product_service" ("business_id" character varying(50) NOT NULL, "name" character varying(100) NOT NULL, "type" character varying(20) NOT NULL, "description" character varying(500) NOT NULL, "price" numeric NOT NULL, CONSTRAINT "PK_f023335e2ecb861e9a3a19b0203" PRIMARY KEY ("business_id", "name"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "business" ("business_id" character varying(50) NOT NULL, "name" character varying(100) NOT NULL, "description" character varying(500) NOT NULL, "uen" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "address" character varying(100) NOT NULL, "main_contact_name" character varying(100) NOT NULL, "main_contact_number" character varying(20) NOT NULL, "picture" character varying(100), CONSTRAINT "PK_a8b2281570e69c768f3c363184b" PRIMARY KEY ("business_id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_5a4bd96d9a519d4d20a21231b9f" FOREIGN KEY ("business_id") REFERENCES "business"("business_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_service_to_category" ADD CONSTRAINT "FK_acfc9e30333766904e78d945a4b" FOREIGN KEY ("business_id", "name") REFERENCES "product_service"("business_id","name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_service_to_category" ADD CONSTRAINT "FK_da57d60aafc101752f4df01cbfd" FOREIGN KEY ("name") REFERENCES "category"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_service" ADD CONSTRAINT "FK_d18c7d2509c6e6ea0ceada9aa68" FOREIGN KEY ("business_id") REFERENCES "business"("business_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product_service" DROP CONSTRAINT "FK_d18c7d2509c6e6ea0ceada9aa68"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_service_to_category" DROP CONSTRAINT "FK_da57d60aafc101752f4df01cbfd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_service_to_category" DROP CONSTRAINT "FK_acfc9e30333766904e78d945a4b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_5a4bd96d9a519d4d20a21231b9f"`,
    );
    await queryRunner.query(`DROP TABLE "business"`);
    await queryRunner.query(`DROP TABLE "product_service"`);
    await queryRunner.query(`DROP TABLE "product_service_to_category"`);
    await queryRunner.query(`DROP TABLE "category"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
