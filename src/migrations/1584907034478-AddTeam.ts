import {MigrationInterface, QueryRunner} from "typeorm";

export class AddTeam1584907034478 implements MigrationInterface {
    name = 'AddTeam1584907034478'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `person` ADD `team` varchar(255) NOT NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `person` DROP COLUMN `team`", undefined);
    }

}
