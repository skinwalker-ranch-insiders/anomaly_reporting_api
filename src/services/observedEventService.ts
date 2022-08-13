import { DeepPartial } from 'typeorm'

import { database } from '../database'
import { ObservedEvent } from '../database/entities/observedEvent'
import { ObservedEventAttachment } from '../database/entities/observedEventAttachment'
import { ObservedEventComment } from '../database/entities/observedEventComment'
import { ObservedEventLike } from '../database/entities/observedEventLike'
import { Insider } from '../database/entities/insider'
import { insidersService } from './insidersService'

/**
 * Includes service calls to create and retrieve observed events from the database
 */
export const observedEventService = {
    eventRepository: database.getRepository(ObservedEvent),
    attachmentRepository: database.getRepository(ObservedEventAttachment),
    commentRepository: database.getRepository(ObservedEventComment),
    likeRepository: database.getRepository(ObservedEventLike),

    /**
     * List all events with options to sort and filter (WIP)
     */
    async list(): Promise<ObservedEvent[]> {
        return this.eventRepository.find()
    },

    /**
     * Retrieve a single event by its ID
     * @param id
     */
    async getCaseById(id: number): Promise<ObservedEvent | null> {
        return this.eventRepository.findOne({
            where: {
                id
            },
            relations: {
                createdBy: true,
                updatedBy: true,
                closedBy: true,
                observedEventCameraView: true,
                observedEventStatus: true,
                observedEventType: true,
                observedEventTypeCategory: true,
                observedEventViewportPosition: true,
            }
        })
    },

    /**
     * Create and resolve with a single event
     * @param event
     */
    async createCase(event: DeepPartial<ObservedEvent>): Promise<ObservedEvent> {
        return this.eventRepository.save(this.eventRepository.create(event))
    },

    /**
     * Update an existing event
     * (may throw an exception if no existing event is found)
     * @param event
     */
    async updateCase(event: DeepPartial<ObservedEvent>): Promise<ObservedEvent> {
        if (!event.id) {
            throw new Error('Event must include an `id`')
        }

        const existingEvent = await this.getCaseById(event.id)

        if (!existingEvent) {
            throw new Error(`No event exists with id: ${event.id}`)
        }

        return this.eventRepository.save(this.eventRepository.merge(existingEvent, event))
    },

    /**
     * Attach evidence to an existing event
     * (may throw an exception if no existing event is found)
     * @param event
     * @param attachment
     */
    async attachEvidenceToCase(
        event: DeepPartial<ObservedEvent>,
        attachment: DeepPartial<ObservedEventAttachment>
    ): Promise<ObservedEventAttachment> {
        if (!event.id) {
            throw new Error('Event must include an `id`')
        }

        const existingEvent = await this.eventRepository.findOneBy({ id: event.id })

        if (!existingEvent) {
            throw new Error(`No event exists with id: ${event.id}`)
        }

        const newAttachment = this.attachmentRepository.create(attachment)
        newAttachment.observedEvent = existingEvent

        return this.attachmentRepository.save(newAttachment)
    },

    /**
     * Retrieves a list of attached evidence to a specific event
     * (may throw an exception if no existing event is found)
     * @param event
     */
    async getCaseEvidence(event: DeepPartial<ObservedEvent>): Promise<ObservedEventAttachment[]> {
        if (!event.id) {
            throw new Error('Event must include an `id`')
        }

        const existingEvent = await this.eventRepository.findOneBy({ id: event.id })

        if (!existingEvent) {
            throw new Error(`No event exists with id: ${event.id}`)
        }

        return this.attachmentRepository.find({
            where: {
                observedEvent: existingEvent
            }
        })
    },

    /**
     * Add a comment to an existing event
     * (may throw an exception if no existing event is found)
     * @param event
     * @param comment
     */
    async addCommentToCase(
        event: DeepPartial<ObservedEvent>,
        comment: DeepPartial<ObservedEventComment>
    ): Promise<ObservedEventComment> {
        if (!event.id) {
            throw new Error('Event must include an `id`')
        }

        const existingEvent = await this.eventRepository.findOneBy({ id: event.id })

        if (!existingEvent) {
            throw new Error(`No event exists with id: ${event.id}`)
        }

        const newComment = this.commentRepository.create(comment)
        newComment.observedEvent = existingEvent

        return this.commentRepository.save(newComment)
    },

    /**
     * Retrieves a list of comments on a specific event
     * (may throw an exception if no existing event is found)
     * @param event
     */
    async getCaseComments(event: DeepPartial<ObservedEvent>): Promise<ObservedEventComment[]> {
        if (!event.id) {
            throw new Error('Event must include an `id`')
        }

        const existingEvent = await this.eventRepository.findOneBy({ id: event.id })

        if (!existingEvent) {
            throw new Error(`No event exists with id: ${event.id}`)
        }

        return this.commentRepository.find({
            where: {
                observedEvent: existingEvent
            }
        })
    },

    /**
     * Add a comment to an existing event
     * (may throw an exception if no existing event is found)
     * @param event
     * @param insider
     */
    async likeCase(
        event: DeepPartial<ObservedEvent>,
        insider: DeepPartial<Insider>
    ): Promise<ObservedEventComment> {
        if (!event.id) {
            throw new Error('Event must include an `id`')
        }

        if (!insider.id) {
            throw new Error('Insider must include an `id`')
        }

        const existingEvent = await this.eventRepository.findOneBy({ id: event.id })
        const existingInsider = await insidersService.getInsiderById(insider.id)

        if (!existingEvent) {
            throw new Error(`No event exists with id: ${event.id}`)
        }

        if (!existingInsider) {
            throw new Error(`No insider exists with id: ${insider.id}`)
        }

        const newLike = this.likeRepository.create()
        newLike.observedEvent = existingEvent
        newLike.createdBy = existingInsider

        return this.commentRepository.save(newLike)
    },

    /**
     * Retrieves a list of likes on a specific event
     * (may throw an exception if no existing event is found)
     * @param event
     */
    async getCaseLikes(event: DeepPartial<ObservedEvent>): Promise<ObservedEventLike[]> {
        if (!event.id) {
            throw new Error('Event must include an `id`')
        }

        const existingEvent = await this.eventRepository.findOneBy({ id: event.id })

        if (!existingEvent) {
            throw new Error(`No event exists with id: ${event.id}`)
        }

        return this.likeRepository.find({
            where: {
                observedEvent: existingEvent
            }
        })
    },
}