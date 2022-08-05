import { DeepPartial } from 'typeorm'

import { database } from '../database'
import { AnomalyCase } from '../database/entities/anomalyCase'
import { AnomalyCaseAttachment } from '../database/entities/anomalyCaseAttachment'

/**
 * Includes service calls to retrieve anomaly cases from the database
 */
export const anomalyCaseService = {
    caseRepository: database.getRepository(AnomalyCase),
    attachmentRepository: database.getRepository(AnomalyCaseAttachment),

    /**
     * List all anomaly cases with options to sort and filter (WIP)
     */
    async list(): Promise<AnomalyCase[]> {
        return this.caseRepository.find()
    },

    /**
     * Retrieve a single anomaly case by its ID
     * @param id
     */
    async getCaseById(id: number): Promise<AnomalyCase | null> {
        return this.caseRepository.findOne({
            where: {
                id
            },
            relations: {
                createdBy: true,
                updatedBy: true,
                caseStatus: true,
                caseType: true,
                cameraView: true,
                viewportPosition: true,
                closedBy: true,
                conclusionCategory: true
            }
        })
    },

    /**
     * Create and resolve with a single anomaly case
     * @param anomaly
     */
    async createCase(anomaly: DeepPartial<AnomalyCase>): Promise<AnomalyCase> {
        return this.caseRepository.save(this.caseRepository.create(anomaly))
    },

    /**
     * Update an existing anomaly case
     * (may throw an exception if no existing case is found)
     * @param anomaly
     */
    async updateCase(anomaly: DeepPartial<AnomalyCase>): Promise<AnomalyCase> {
        if (!anomaly.id) {
            throw new Error('Case must include an `id`')
        }

        const existingCase = await this.getCaseById(anomaly.id)

        if (!existingCase) {
            throw new Error(`No case exists with id: ${anomaly.id}`)
        }

        return this.caseRepository.save(this.caseRepository.merge(existingCase, anomaly))
    },

    /**
     * Attach evidence to an existing anomaly case
     * (may throw an exception if no existing case is found)
     * @param anomaly
     * @param attachment
     */
    async attachEvidenceToCase(
        anomaly: DeepPartial<AnomalyCase>,
        attachment: DeepPartial<AnomalyCaseAttachment>
    ): Promise<AnomalyCaseAttachment> {
        if (!anomaly.id) {
            throw new Error('Case must include an `id`')
        }

        const existingCase = await this.caseRepository.findOneBy({ id: anomaly.id })

        if (!existingCase) {
            throw new Error(`No case exists with id: ${anomaly.id}`)
        }

        const newAttachment = this.attachmentRepository.create(attachment)
        newAttachment.anomalyCase = existingCase

        return this.attachmentRepository.save(newAttachment)
    }
}
