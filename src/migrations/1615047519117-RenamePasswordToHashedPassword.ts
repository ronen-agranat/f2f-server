import {MigrationInterface, QueryRunner} from "typeorm";

export class RenamePasswordToHashedPassword1615047519117 implements MigrationInterface {
    name = 'RenamePasswordToHashedPassword1615047519117'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `password` `hashedPassword` varchar(500) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `hashedPassword` `password` varchar(500) NOT NULL");
    }

}
