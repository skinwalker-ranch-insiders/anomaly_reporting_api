import { StatusName } from './enum'

/**
 * Returns the next event status' name in the review workflow
 * @param statusName
 */
export function getNextStatusName(statusName: StatusName): StatusName {
    switch (statusName) {
        case StatusName.Open: return StatusName.InitialReview
        case StatusName.InitialReview: return StatusName.AdvancedReview
        case StatusName.AdvancedReview: return StatusName.Escalated
        case StatusName.Escalated: return StatusName.Closed
        case StatusName.Closed: return StatusName.Archived
        default: return StatusName.Open
    }
}
