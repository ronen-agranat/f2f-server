import {MigrationInterface, QueryRunner} from "typeorm";

export class AddPhoneNumber1584904386845 implements MigrationInterface {
    name = 'AddPhoneNumber1584904386845'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `person` ADD `phone` varchar(25) NOT NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `person` DROP COLUMN `phone`", undefined);
    }

}
