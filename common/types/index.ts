// AUTO GENERATED FILE BY @kalissaac/prisma-typegen
// DO NOT EDIT


export enum PLAN {
    FREE = 'FREE',
    PREMIUM = 'PREMIUM',
}


export type User = {
    id?: string,
    username: string,
    email: string,
    plan?: PLAN,
    pageId: string,
    createdAt?: (Date | string),
    updatedAt?: (Date | string),
}

export type Page = {
    id?: string,
    createdAt?: (Date | string),
    updatedAt?: (Date | string),
}

export type PageEntry = {
    id?: string,
    linkId?: string | null,
    blogId?: string | null,
    pageId?: string | null,
    createdAt?: (Date | string),
    updatedAt?: (Date | string),
}

export type Link = {
    id?: string,
    displayText: string,
    link: string,
    mediaUrl?: string | null,
    entryAnalyticsId: string,
    createdAt?: (Date | string),
    updatedAt?: (Date | string),
}

export type Blog = {
    id?: string,
    name: string,
    rating?: number | null,
    location?: string | null,
    externalLink?: string | null,
    entryAnalyticsId: string,
    mediaUrl?: string | null,
    lifetimeClicks?: number,
    createdAt?: (Date | string),
    updatedAt?: (Date | string),
}

export type EntryAnalytics = {
    id?: string,
    lifetimeClicks?: number,
}
