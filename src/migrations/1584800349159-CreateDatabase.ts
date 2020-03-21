import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateDatabase1584800349159 implements MigrationInterface {
    name = 'CreateDatabase1584800349159'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `minutes` (`id` int NOT NULL AUTO_INCREMENT, `personId` int NOT NULL, `newBusiness` text NOT NULL, `followUps` text NOT NULL, `nextTime` text NOT NULL, `date` varchar(500) NOT NULL, `updatedAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3), `createdAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `person` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(500) NOT NULL, `role` varchar(500) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `person` ADD `imageUrl` varchar(500) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `person` ADD `updatedAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)", undefined);
        await queryRunner.query("ALTER TABLE `person` ADD `createdAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `person` DROP COLUMN `createdAt`", undefined);
        await queryRunner.query("ALTER TABLE `person` DROP COLUMN `updatedAt`", undefined);
        await queryRunner.query("ALTER TABLE `person` DROP COLUMN `imageUrl`", undefined);
        await queryRunner.query("DROP TABLE `person`", undefined);
        await queryRunner.query("DROP TABLE `minutes`", undefined);
    }

}
