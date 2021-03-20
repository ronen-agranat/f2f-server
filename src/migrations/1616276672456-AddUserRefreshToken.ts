import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUserRefreshToken1616276672456 implements MigrationInterface {
    name = 'AddUserRefreshToken1616276672456'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` ADD `currentHashedRefreshToken` varchar(255) NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `currentHashedRefreshToken`");
    }

}
