import {MigrationInterface, QueryRunner} from "typeorm";

export class EditUsersTable1615232795776 implements MigrationInterface {
    name = 'EditUsersTable1615232795776'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `firstName`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `lastName`");
        await queryRunner.query("ALTER TABLE `user` ADD `name` varchar(50) NOT NULL");
        await queryRunner.query("ALTER TABLE `user` CHANGE `username` `username` varchar(50) NOT NULL");
        await queryRunner.query("ALTER TABLE `user` ADD UNIQUE INDEX `IDX_78a916df40e02a9deb1c4b75ed` (`username`)");
        await queryRunner.query("ALTER TABLE `user` CHANGE `email` `email` varchar(50) NULL");
        await queryRunner.query("ALTER TABLE `user` CHANGE `imageUrl` `imageUrl` varchar(500) NULL");
        await queryRunner.query("ALTER TABLE `user` CHANGE `phone` `phone` varchar(25) NULL");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `updatedAt`");
        await queryRunner.query("ALTER TABLE `user` ADD `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `createdAt`");
        await queryRunner.query("ALTER TABLE `user` ADD `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `createdAt`");
        await queryRunner.query("ALTER TABLE `user` ADD `createdAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `updatedAt`");
        await queryRunner.query("ALTER TABLE `user` ADD `updatedAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)");
        await queryRunner.query("ALTER TABLE `user` CHANGE `phone` `phone` varchar(25) NOT NULL");
        await queryRunner.query("ALTER TABLE `user` CHANGE `imageUrl` `imageUrl` varchar(500) NOT NULL");
        await queryRunner.query("ALTER TABLE `user` CHANGE `email` `email` varchar(50) NOT NULL");
        await queryRunner.query("ALTER TABLE `user` DROP INDEX `IDX_78a916df40e02a9deb1c4b75ed`");
        await queryRunner.query("ALTER TABLE `user` CHANGE `username` `username` varchar(50) NOT NULL");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `name`");
        await queryRunner.query("ALTER TABLE `user` ADD `lastName` varchar(50) NOT NULL");
        await queryRunner.query("ALTER TABLE `user` ADD `firstName` varchar(50) NOT NULL");
    }

}
