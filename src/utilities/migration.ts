import {
    DeepPartial,
    EntityTarget,
    QueryRunner,
    Table
} from 'typeorm'

/**
 * Create a new table in the database
 * @param queryRunner
 * @param entityTarget
 */
export async function createTable<EntityType extends new() => object>(queryRunner: QueryRunner, entityTarget: EntityTarget<EntityType>): Promise<void> {
    return queryRunner.createTable(Table.create(
        queryRunner.manager.getRepository(entityTarget).metadata,
        queryRunner.connection.driver
    ), true, true, true)
}

/**
 * Drop an existing table from the database
 * @param queryRunner
 * @param entityTarget
 */
export async function dropTable<EntityType extends new() => object>(queryRunner: QueryRunner, entityTarget: EntityTarget<EntityType>): Promise<void> {
    return queryRunner.dropTable(Table.create(
        queryRunner.manager.getRepository(entityTarget).metadata,
        queryRunner.connection.driver
    ), true, true, true)
}

/**
 * Insert a new entity into the database given its entity class and its data
 * @param queryRunner
 * @param entityTarget
 * @param entityData
 */
export async function insertEntity<EntityType>(
    queryRunner: QueryRunner,
    entityTarget: EntityTarget<EntityType>,
    entityData: DeepPartial<EntityType>
): Promise<EntityType> {
    return queryRunner.manager.save(queryRunner.manager.create(entityTarget, entityData))
}

/**
 * Insert multiple entities into the database given their entity class and their data
 * @param queryRunner
 * @param entityTarget
 * @param bulkEntityData
 */
export async function bulkInsertEntity<EntityType>(
    queryRunner: QueryRunner,
    entityTarget: EntityTarget<EntityType>,
    bulkEntityData: DeepPartial<EntityType>[]
): Promise<EntityType[]> {
    return queryRunner.manager.save(bulkEntityData.map(entityData => queryRunner.manager.create(entityTarget, entityData)))
}

/**
 * Clears the data from an entity's table
 * @param queryRunner
 * @param entityTarget
 */
export async function clearEntityData<EntityType>(
    queryRunner: QueryRunner,
    entityTarget: EntityTarget<EntityType>
): Promise<void> {
    return queryRunner.manager.clear(entityTarget)
}

/**
 * Runs an async transaction against the database
 * @param queryRunner
 * @param transactionRunner
 */
export async function runTransaction(
    queryRunner: QueryRunner,
    transactionRunner: () => Promise<void>
): Promise<void> {
    return new Promise(async (resolve) => {
        await queryRunner.startTransaction()
        try {
            await transactionRunner()
            await queryRunner.commitTransaction()
        } catch {
            await queryRunner.rollbackTransaction()
        } finally {
            resolve()
        }
    })
}
