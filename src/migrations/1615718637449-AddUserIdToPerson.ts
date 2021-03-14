import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUserIdToPerson1615718637449 implements MigrationInterface {
    name = 'AddUserIdToPerson1615718637449'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `person` ADD `userId` int NOT NULL");
        await queryRunner.query("ALTER TABLE `person` DROP COLUMN `updatedAt`");
        await queryRunner.query("ALTER TABLE `person` ADD `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `person` DROP COLUMN `createdAt`");
        await queryRunner.query("ALTER TABLE `person` ADD `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `person` DROP COLUMN `createdAt`");
        await queryRunner.query("ALTER TABLE `person` ADD `createdAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)");
        await queryRunner.query("ALTER TABLE `person` DROP COLUMN `updatedAt`");
        await queryRunner.query("ALTER TABLE `person` ADD `updatedAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)");
        await queryRunner.query("ALTER TABLE `person` DROP COLUMN `userId`");
    }

}
