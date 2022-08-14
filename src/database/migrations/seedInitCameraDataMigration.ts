import { MigrationInterface, QueryRunner } from 'typeorm'

class SeedInitCameraDataMigration1660457577452 implements MigrationInterface {

    async down(queryRunner: QueryRunner) {
        // TODO seed viewport positions
        // TODO seed currently known camera views
    }

    async up(queryRunner: QueryRunner) {

    }
}

export const SeedInitCameraDataMigration = SeedInitCameraDataMigration1660457577452
