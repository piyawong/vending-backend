import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateDwellTimeColumn1234567890123 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "detection_record" 
            ALTER COLUMN "dwellTime" SET DEFAULT 0,
            ALTER COLUMN "dwellTime" SET NOT NULL;
        `);

    await queryRunner.query(`
            UPDATE "detection_record"
            SET "dwellTime" = 0
            WHERE "dwellTime" IS NULL;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "detection_record" 
            ALTER COLUMN "dwellTime" DROP DEFAULT,
            ALTER COLUMN "dwellTime" DROP NOT NULL;
        `);
  }
}
