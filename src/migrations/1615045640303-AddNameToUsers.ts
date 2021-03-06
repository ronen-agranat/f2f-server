import {MigrationInterface, QueryRunner} from "typeorm";

export class AddNameToUsers1615045640303 implements MigrationInterface {
    name = 'AddNameToUsers1615045640303'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` ADD `firstName` varchar(50) NOT NULL");
        await queryRunner.query("ALTER TABLE `user` ADD `lastName` varchar(50) NOT NULL");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `username`");
        await queryRunner.query("ALTER TABLE `user` ADD `username` varchar(50) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `username`");
        await queryRunner.query("ALTER TABLE `user` ADD `username` varchar(500) NOT NULL");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `lastName`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `firstName`");
    }

}
