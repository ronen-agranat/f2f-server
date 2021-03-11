import {MigrationInterface, QueryRunner} from "typeorm";

export class AddIsAdminColumnToUser1615498106615 implements MigrationInterface {
    name = 'AddIsAdminColumnToUser1615498106615'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` ADD `isAdmin` tinyint NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `isAdmin`");
    }

}
