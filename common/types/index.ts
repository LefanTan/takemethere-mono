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
    createdAt?: (Date | string),
    updatedAt?: (Date | string),
}

export type Page = {
    id?: string,
    userId: string,
    createdAt?: (Date | string),
    updatedAt?: (Date | string),
}

export type PageEntry = {
    id?: string,
    title?: string | null,
    pageId: string,
    createdAt?: (Date | string),
    updatedAt?: (Date | string),
}

export type Link = {
    id?: string,
    displayText: string,
    link: string,
    pageEntryId: string,
    mediaUrl?: string | null,
    createdAt?: (Date | string),
    updatedAt?: (Date | string),
}

export type Blog = {
    id?: string,
    name: string,
    rating?: number | null,
    location?: string | null,
    externalLink?: string | null,
    pageEntryId: string,
    mediaUrl?: string | null,
    createdAt?: (Date | string),
    updatedAt?: (Date | string),
}

export type EntryAnalytics = {
    id?: string,
    lifetimeClicks?: number,
    blogId: string,
    linkId: string,
}
