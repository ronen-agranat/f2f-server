import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUsers1615045121243 implements MigrationInterface {
    name = 'AddUsers1615045121243'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `username` varchar(500) NOT NULL, `password` varchar(500) NOT NULL, `imageUrl` varchar(500) NOT NULL, `phone` varchar(25) NOT NULL, `email` varchar(50) NOT NULL, `updatedAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3), `createdAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3), PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `user`");
    }

}
