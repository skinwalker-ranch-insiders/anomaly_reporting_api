export enum HttpMethod {
    Get = 'GET',
    Delete = 'DELETE',
    Patch = 'PATCH',
    Post = 'POST'
}

export enum IdField {
    Insider = 'insider_id',
    InsiderRole = 'insider_role_id',
    ObservedEvent = 'observed_event_id'
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
