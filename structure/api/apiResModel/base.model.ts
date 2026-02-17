/**
 * Base interface for entities with audit fields
 */
export interface BaseEntity {
  createdBy: string;
  createdDateInMilliSeconds: number;
  updatedBy: string;
  updatedDateInMilliSeconds: number;
}
