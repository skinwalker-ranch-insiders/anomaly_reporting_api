import {
    EntityTarget,
    QueryRunner,
    Table
} from 'typeorm'

export async function createTable<EntityType extends new() => object>(queryRunner: QueryRunner, entityTarget: EntityTarget<EntityType>): Promise<void> {
    return queryRunner.createTable(Table.create(
        queryRunner.manager.getRepository(entityTarget).metadata,
        queryRunner.connection.driver
    ), true, true, true)
}

export async function dropTable<EntityType extends new() => object>(queryRunner: QueryRunner, entityTarget: EntityTarget<EntityType>): Promise<void> {
    return queryRunner.dropTable(Table.create(
        queryRunner.manager.getRepository(entityTarget).metadata,
        queryRunner.connection.driver
    ), true, true, true)
}
