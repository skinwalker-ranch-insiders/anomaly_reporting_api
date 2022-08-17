import { RoleName, StatusName } from './enum'

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

/**
 * Check if a role can escalate a given status
 * (Members cannot escalate, initial reviewers cannot escalate events in advanced review)
 * @param role
 * @param status
 */
export function canRoleNameEscalateStatusName(role: RoleName, status: StatusName): boolean {
    if (role === RoleName.Member) {
        return false
    } else if (status === StatusName.Open || status === StatusName.InitialReview) {
        return true
    } else if (role !== RoleName.Reviewer && status === StatusName.AdvancedReview) {
        return true
    } else {
        return false
    }
}
