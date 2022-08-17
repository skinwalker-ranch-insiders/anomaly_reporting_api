import { DeepPartial } from 'typeorm'

import { database } from '../database'
import { ObservedEvent } from '../database/entities/observedEvent'
import { ObservedEventAttachment } from '../database/entities/observedEventAttachment'
import { ObservedEventComment } from '../database/entities/observedEventComment'
import { ObservedEventLike } from '../database/entities/observedEventLike'
import { Insider } from '../database/entities/insider'
import { insidersService } from './insidersService'
import { HttpError } from '../utilities/error'
import { ObservedEventChangeLog } from '../database/entities/observedEventChangeLog'
import { ObservedEventType } from '../database/entities/observedEventType'
import { ObservedEventTypeCategory } from '../database/entities/observedEventTypeCategory'
import { ObservedEventStatus } from '../database/entities/observedEventStatus'
import { ObservedEventCameraView } from '../database/entities/observedEventCameraView'
import { ObservedEventViewportPosition } from '../database/entities/observedEventViewportPosition'
import { convertPropertyNameToReadableName, notIn } from '../utilities/misc'
import { StatusName } from '../utilities/enum'
import { ObservedEventEscalationVote } from '../database/entities/observedEventEscalationVote'

/**
 * Includes service calls to create and retrieve observed events from the database
 */
export const observedEventService = {
    eventRepository: database.getRepository(ObservedEvent),
    attachmentRepository: database.getRepository(ObservedEventAttachment),
    cameraViewRepository: database.getRepository(ObservedEventCameraView),
    commentRepository: database.getRepository(ObservedEventComment),
    changeLogRepository: database.getRepository(ObservedEventChangeLog),
    likeRepository: database.getRepository(ObservedEventLike),
    escalationRepository: database.getRepository(ObservedEventEscalationVote),
    typeRepository: database.getRepository(ObservedEventType),
    typeCategoryRepository: database.getRepository(ObservedEventTypeCategory),
    statusRepository: database.getRepository(ObservedEventStatus),
    viewportPositionRepository: database.getRepository(ObservedEventViewportPosition),
    /**
     * List all events with options to sort and filter (WIP)
     */
    async list(): Promise<ObservedEvent[]> {
        return this.eventRepository.find()
    },
    /**
     * Retrieve a single event by its ID
     * @param eventId
     */
    async getEventById(eventId: number): Promise<ObservedEvent> {
        const existingEvent = await this.eventRepository.findOne({
            where: {
                id: eventId
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

        if (!existingEvent) {
            throw new HttpError(404, `No event exists with id: ${eventId}`)
        }

        return existingEvent
    },
    /**
     * Create and resolve with a single event
     * @param event
     */
    async createEvent(event: DeepPartial<ObservedEvent>): Promise<ObservedEvent> {
        if (notIn(event, 'createdBy')) {
            throw new HttpError(400, 'Missing required field: `createdBy`')
        }
        if (notIn(event, 'observedEventCameraView')) {
            throw new HttpError(400, 'Missing required field: `observedEventCameraView`')
        }
        if (notIn(event, 'observedEventViewportPosition')) {
            throw new HttpError(400, 'Missing required field: `observedEventViewportPosition`')
        }
        if (notIn(event, 'observedEventType')) {
            throw new HttpError(400, 'Missing required field: `observedEventType`')
        }
        if (notIn(event, 'observedEventTypeCategory')) {
            throw new HttpError(400, 'Missing required field: `observedEventTypeCategory`')
        }
        if (notIn(event, 'observedEventStatus')) {
            event.observedEventStatus = await this.getStatusByName(StatusName.Open)
        }

        const savedEvent = await this.eventRepository.save(this.eventRepository.create(event))

        return this.getEventById(savedEvent.id)
    },
    /**
     * Update an existing event
     * (may throw an error if no existing event is found)
     * @param eventId
     * @param event
     */
    async updateEvent(eventId: number, event: DeepPartial<ObservedEvent>): Promise<ObservedEvent> {
        const existingEvent = await this.getEventById(eventId)

        if (!existingEvent) {
            throw new HttpError(404, `No event exists with id: ${eventId}`)
        }

        const updatedFields = [] as string[]
        const ignoredFields = [
            'createdDate',
            'createdBy',
            'updatedDate',
            'updatedBy',
            'videoFeedTimestamp' // question about date comparisons...
        ]

        for (const property in event) {
            const key = property as keyof typeof event

            if (ignoredFields.some(ignoredField => ignoredField === key)) {
                continue
            }

            if (typeof event[key] === 'object') {
                if ((event[key] as any).id !== (existingEvent[key] as any).id) {
                    updatedFields.push(convertPropertyNameToReadableName(key))
                }
            } else if (event[key] !== existingEvent[key]) {
                updatedFields.push(convertPropertyNameToReadableName(key))
            }
        }

        await this.changeLogRepository.save(this.changeLogRepository.create({
            observedEvent: existingEvent,
            createdBy: event.updatedBy,
            message: `updated the fields: ${
                updatedFields.length <= 5
                    ? updatedFields.join(', ')
                    : updatedFields.slice(0, 5).join(', ')
            }`
        }))

        return this.eventRepository.save(this.eventRepository.merge(existingEvent, event))
    },
    /**
     * Retrieves a list of attached evidence to a specific event
     * (may throw an error if no existing event is found)
     * @param eventId
     */
    async listEventAttachments(eventId: number): Promise<ObservedEventAttachment[]> {
        const existingEvent = await this.eventRepository.findOneBy({ id: eventId })

        if (!existingEvent) {
            throw new HttpError(404, `No event exists with id: ${eventId}`)
        }

        return this.attachmentRepository.find({
            where: {
                observedEvent: existingEvent
            }
        })
    },
    /**
     * Attach evidence to an existing event
     * (may throw an error if no existing event is found)
     * @param eventId
     * @param attachment
     */
    async createEventAttachment(
        eventId: number,
        attachment: DeepPartial<ObservedEventAttachment>
    ): Promise<ObservedEventAttachment> {
        const existingEvent = await this.getEventById(eventId)

        if (!existingEvent) {
            throw new HttpError(404, `No event exists with id: ${eventId}`)
        }

        const newAttachment = this.attachmentRepository.create(attachment)
        newAttachment.observedEvent = existingEvent

        return this.attachmentRepository.save(newAttachment)
    },
    /**
     * Retrieve a list of change log entries of a specific event
     * (May throw an error if no existing even is found)
     * @param eventId
     */
    async listEventChangeLogs(eventId: number): Promise<ObservedEventChangeLog[]> {
        return this.changeLogRepository.find({
            where: {
                observedEvent: await this.getEventById(eventId)
            }
        })
    },
    /**
     * Add a change log entry to an existing event
     * (May throw an error if no existing event is found)
     * @param event
     * @param changeLog
     */
    async createEventChangeLog(
        event: DeepPartial<ObservedEvent>,
        changeLog: DeepPartial<ObservedEventChangeLog>
    ): Promise<ObservedEventChangeLog> {
        if (!event.id) {
            throw new HttpError(400, 'Event must include an `id`')
        }

        const existingEvent = await this.eventRepository.findOneBy({ id: event.id })

        if (!existingEvent) {
            throw new HttpError(404, `No event exists with id: ${event.id}`)
        }

        const newChangeLog = this.changeLogRepository.create(changeLog)
        newChangeLog.observedEvent = existingEvent

        return this.changeLogRepository.save(newChangeLog)
    },
    /**
     * Retrieves a list of escalation votes on a specific event
     * (may throw an error if no existing event is found)
     * @param eventId
     */
    async listEventEscalationVotes(eventId: number): Promise<ObservedEventEscalationVote[]> {
        return this.escalationRepository.find({
            where: {
                observedEvent: await this.getEventById(eventId)
            }
        })
    },
    /**
     * Creates a new escalation vote on a specific event
     * @param eventId
     * @param vote
     */
    async createEscalationVote(eventId: number, vote: DeepPartial<ObservedEventEscalationVote>): Promise<ObservedEventEscalationVote> {
        const existingEvent = await this.eventRepository.findOneBy({ id: eventId })

        if (!existingEvent) {
            throw new HttpError(404, `No event exists with id: ${eventId}`)
        }

        const newVote = this.escalationRepository.create(vote)
        newVote.observedEvent = existingEvent

        return this.changeLogRepository.save(newVote)
    },
    /**
     * Retrieves a list of comments on a specific event
     * (may throw an error if no existing event is found)
     * @param eventId
     */
    async listEventComments(eventId: number): Promise<ObservedEventComment[]> {
        return this.commentRepository.find({
            where: {
                observedEvent: await this.getEventById(eventId)
            }
        })
    },
    /**
     * Add a comment to an existing event
     * (may throw an error if no existing event is found)
     * @param eventId
     * @param comment
     */
    async createEventComment(
        eventId: number,
        comment: DeepPartial<ObservedEventComment>
    ): Promise<ObservedEventComment> {
        const existingEvent = await this.getEventById(eventId)

        if (!existingEvent) {
            throw new HttpError(404, `No event exists with id: ${eventId}`)
        }

        const newComment = this.commentRepository.create(comment)
        newComment.observedEvent = existingEvent

        return this.commentRepository.save(newComment)
    },
    /**
     * Update an existing comment on an event
     * (may throw an error if no existing event is found)
     * @param eventId
     * @param commentId
     * @param comment
     */
    async updateEventComment(
        eventId: number,
        commentId: number,
        comment: DeepPartial<ObservedEventComment>
    ): Promise<ObservedEventComment> {
        const existingEvent = await this.getEventById(eventId)

        if (!existingEvent) {
            throw new HttpError(404, `No event exists with id: ${eventId}`)
        }

        const existingComment = await this.commentRepository.findOne({
            where: {
                id: commentId
            }
        })

        if (!existingComment) {
            throw new HttpError(404, `No comment exists with id: ${commentId}`)
        }

        return this.commentRepository.save(this.commentRepository.merge(existingComment, comment))
    },
    /**
     * Retrieves a list of likes on a specific event
     * (may throw an error if no existing event is found)
     * @param eventId
     */
    async listEventLikes(eventId: number): Promise<ObservedEventLike[]> {
        return this.likeRepository.find({
            where: {
                observedEvent: await this.getEventById(eventId)
            }
        })
    },
    /**
     * Add a comment to an existing event
     * (may throw an error if no existing event is found)
     * @param event
     * @param insider
     */
    async createEventLike(
        event: DeepPartial<ObservedEvent>,
        insider: DeepPartial<Insider>
    ): Promise<ObservedEventComment> {
        if (!event.id) {
            throw new HttpError(400, 'Event must include an `id`')
        }

        if (!insider.id) {
            throw new HttpError(400, 'Insider must include an `id`')
        }

        const existingEvent = await this.eventRepository.findOneBy({ id: event.id })
        const existingInsider = await insidersService.getInsiderById(insider.id)

        if (!existingEvent) {
            throw new HttpError(404, `No event exists with id: ${event.id}`)
        }

        if (!existingInsider) {
            throw new HttpError(404, `No insider exists with id: ${insider.id}`)
        }

        const newLike = this.likeRepository.create()
        newLike.observedEvent = existingEvent
        newLike.createdBy = existingInsider

        return this.commentRepository.save(newLike)
    },
    /**
     * Retrieve a list of all event types
     */
    async listTypes(): Promise<ObservedEventType[]> {
        return this.typeRepository.find()
    },
    /**
     * Retrieve a list of all event type sub-categories
     */
    async listTypeCategories(): Promise<ObservedEventTypeCategory[]>  {
        return this.typeCategoryRepository.find()
    },
    /**
     * Retrieve a list of all event statuses
     */
    async listStatuses(): Promise<ObservedEventStatus[]> {
        return this.statusRepository.find()
    },
    /**
     * Retrieve a single status by its name
     * @param name
     */
    async getStatusByName(name: string): Promise<ObservedEventStatus> {
        const existingStatus = await this.statusRepository.findOne({
            where: {
                name
            }
        })

        if (!existingStatus) {
            throw new HttpError(404, `No status exists with name: ${name}`)
        }

        return existingStatus
    },
    /**
     * Retrieve a list of all available camera views
     */
    async listCameraViews(): Promise<ObservedEventCameraView[]> {
        return this.cameraViewRepository.find()
    },
    /**
     * Retrieve a list of all possible viewport positions
     */
    async listViewportPositions(): Promise<ObservedEventViewportPosition[]> {
        return this.viewportPositionRepository.find()
    }
}
