export enum HttpMethod {
    Get = 'GET',
    Delete = 'DELETE',
    Patch = 'PATCH',
    Post = 'POST'
}

export enum RoleName {
    Admin = 'Admin',
    SWRTeam = 'SWR Team Member',
    SrReviewer = 'Senior Reviewer',
    Reviewer = 'Reviewer',
    Member = 'Member'
}

export enum ObservedEventTypeName {
    Anomaly = 'Anomaly',
    NonAnomaly = 'Non-Anomaly',
    Contagion = 'Poltergeist Contagion',
    Other = 'Other'
}

export enum AnomalyTypeCategoryName {
    UAP = 'UAP (Orb, Smoke, Lights, etc.)',
    UFO = 'UFO (Physical Flying Object)',
    Glitch = 'Technical Glitch',
    Other = 'Other'
}

export enum NonAnomalyTypeCategoryName {
    Animal = 'Insect or Other Animal',
    Weather = 'Weather Phenomenon',
    People = 'One or Multiple People',
    Other = 'Other'
}

export enum ContagionTypeCategoryName {
    Hitchhiker = 'Hitchhiker Effect',
    ElectronicHitchhiker = 'Electronic Hitchhiker Effect',
    CompromisedCognition = 'Compromised Cognition',
    Illness = 'Sickness or Illness',
    Nightmare = 'Nightmare',
    Other = 'Other'
}
