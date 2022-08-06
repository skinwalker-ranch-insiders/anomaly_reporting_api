import { DeepPartial } from 'typeorm'

import { database } from '../database'
import { AnomalyCase } from '../database/entities/anomalyCase'
import { AnomalyCaseAttachment } from '../database/entities/anomalyCaseAttachment'
import { AnomalyCaseComment } from '../database/entities/anomalyCaseComment'
import { AnomalyCaseLike } from '../database/entities/anomalyCaseLike'
import { Insider } from '../database/entities/insider'
import { insidersService } from './insidersService'

/**
 * Includes service calls to create and retrieve anomaly cases from the database
 */
export const anomalyCaseService = {
    caseRepository: database.getRepository(AnomalyCase),
    attachmentRepository: database.getRepository(AnomalyCaseAttachment),
    commentRepository: database.getRepository(AnomalyCaseComment),
    likeRepository: database.getRepository(AnomalyCaseLike),

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
    },

    /**
     * Retrieves a list of attached evidence to a specific case
     * (may throw an exception if no existing case is found)
     * @param anomaly
     */
    async getCaseEvidence(anomaly: DeepPartial<AnomalyCase>): Promise<AnomalyCaseAttachment[]> {
        if (!anomaly.id) {
            throw new Error('Case must include an `id`')
        }

        const existingCase = await this.caseRepository.findOneBy({ id: anomaly.id })

        if (!existingCase) {
            throw new Error(`No case exists with id: ${anomaly.id}`)
        }

        return this.attachmentRepository.find({
            where: {
                anomalyCase: existingCase
            }
        })
    },

    /**
     * Add a comment to an existing case
     * (may throw an exception if no existing case is found)
     * @param anomaly
     * @param comment
     */
    async addCommentToCase(
        anomaly: DeepPartial<AnomalyCase>,
        comment: DeepPartial<AnomalyCaseComment>
    ): Promise<AnomalyCaseComment> {
        if (!anomaly.id) {
            throw new Error('Case must include an `id`')
        }

        const existingCase = await this.caseRepository.findOneBy({ id: anomaly.id })

        if (!existingCase) {
            throw new Error(`No case exists with id: ${anomaly.id}`)
        }

        const newComment = this.commentRepository.create(comment)
        newComment.anomalyCase = existingCase

        return this.commentRepository.save(newComment)
    },

    /**
     * Retrieves a list of comments on a specific case
     * (may throw an exception if no existing case is found)
     * @param anomaly
     */
    async getCaseComments(anomaly: DeepPartial<AnomalyCase>): Promise<AnomalyCaseComment[]> {
        if (!anomaly.id) {
            throw new Error('Case must include an `id`')
        }

        const existingCase = await this.caseRepository.findOneBy({ id: anomaly.id })

        if (!existingCase) {
            throw new Error(`No case exists with id: ${anomaly.id}`)
        }

        return this.commentRepository.find({
            where: {
                anomalyCase: existingCase
            }
        })
    },

    /**
     * Add a comment to an existing case
     * (may throw an exception if no existing case is found)
     * @param anomaly
     * @param insider
     */
    async likeCase(
        anomaly: DeepPartial<AnomalyCase>,
        insider: DeepPartial<Insider>
    ): Promise<AnomalyCaseComment> {
        if (!anomaly.id) {
            throw new Error('Case must include an `id`')
        }

        if (!insider.id) {
            throw new Error('Insider must include an `id`')
        }

        const existingCase = await this.caseRepository.findOneBy({ id: anomaly.id })
        const existingInsider = await insidersService.getInsiderById(insider.id)

        if (!existingCase) {
            throw new Error(`No case exists with id: ${anomaly.id}`)
        }

        if (!existingInsider) {
            throw new Error(`No case exists with id: ${insider.id}`)
        }

        const newLike = this.likeRepository.create()
        newLike.anomalyCase = existingCase
        newLike.createdBy = existingInsider

        return this.commentRepository.save(newLike)
    },

    /**
     * Retrieves a list of likes on a specific case
     * (may throw an exception if no existing case is found)
     * @param anomaly
     */
    async getCaseLikes(anomaly: DeepPartial<AnomalyCase>): Promise<AnomalyCaseLike[]> {
        if (!anomaly.id) {
            throw new Error('Case must include an `id`')
        }

        const existingCase = await this.caseRepository.findOneBy({ id: anomaly.id })

        if (!existingCase) {
            throw new Error(`No case exists with id: ${anomaly.id}`)
        }

        return this.likeRepository.find({
            where: {
                anomalyCase: existingCase
            }
        })
    },
}
