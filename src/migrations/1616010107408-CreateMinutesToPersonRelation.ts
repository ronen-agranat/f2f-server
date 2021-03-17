import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateMinutesToPersonRelation1616010107408 implements MigrationInterface {
    name = 'CreateMinutesToPersonRelation1616010107408'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `minutes` DROP COLUMN `updatedAt`");
        await queryRunner.query("ALTER TABLE `minutes` ADD `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `minutes` DROP COLUMN `createdAt`");
        await queryRunner.query("ALTER TABLE `minutes` ADD `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `minutes` CHANGE `personId` `personId` int NULL");
        await queryRunner.query("ALTER TABLE `minutes` ADD CONSTRAINT `FK_94a7220f9b26ec1a44066c03f64` FOREIGN KEY (`personId`) REFERENCES `person`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `minutes` DROP FOREIGN KEY `FK_94a7220f9b26ec1a44066c03f64`");
        await queryRunner.query("ALTER TABLE `minutes` CHANGE `personId` `personId` int NOT NULL");
        await queryRunner.query("ALTER TABLE `minutes` DROP COLUMN `createdAt`");
        await queryRunner.query("ALTER TABLE `minutes` ADD `createdAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)");
        await queryRunner.query("ALTER TABLE `minutes` DROP COLUMN `updatedAt`");
        await queryRunner.query("ALTER TABLE `minutes` ADD `updatedAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)");
    }

}
