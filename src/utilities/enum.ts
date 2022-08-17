export enum HttpMethod {
    Get = 'GET',
    Delete = 'DELETE',
    Patch = 'PATCH',
    Post = 'POST'
}

export enum IdField {
    Insider = 'insider_id',
    InsiderRole = 'insider_role_id',
    ObservedEvent = 'observed_event_id',
    ObservedEventAttachment = 'observed_event_attachment_id',
    ObservedEventCameraView = 'observed_event_camera_view_id',
    ObservedEventChangeLog = 'observed_event_change_log_id',
    ObservedEventComment = 'observed_event_comment_id',
    ObservedEventEscalationVote = 'observed_event_escalation_vote_id',
    ObservedEventLike = 'observed_event_like_id',
    ObservedEventStatus = 'observed_event_status_id',
    ObservedEventType = 'observed_event_type_id',
    ObservedEventTypeCategory = 'observed_event_type_category_id',
    ObservedEventViewportPosition = 'observed_event_viewport_position_id'
}

export enum RoleName {
    Admin = 'Admin',
    SWRTeam = 'SWR Team Member',
    AdvancedReviewer = 'Advanced Reviewer',
    Reviewer = 'Reviewer',
    Member = 'Member'
}

export enum StatusName {
    Open = 'Open',
    InitialReview = 'Initial Review',
    AdvancedReview = 'Advanced Review',
    Escalated = 'Escalated',
    Closed = 'Closed',
    Archived = 'Archived'
}

export enum ViewportPositionName {
    TopLeft = 'Top Left',
    TopCenter = 'Top Center',
    TopRight = 'Top Right',
    MiddleLeft = 'Middle Left',
    MiddleCenter = 'Middle Center',
    MiddleRight = 'Middle Right',
    BottomLeft = 'Bottom Left',
    BottomCenter = 'Bottom Center',
    BottomRight = 'Bottom Right'
}
