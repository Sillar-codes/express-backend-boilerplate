interface EntityId {
    _id: string;
}

export interface Entity extends EntityId {
    createdAt: Date;
    updatedAt: Date;
}