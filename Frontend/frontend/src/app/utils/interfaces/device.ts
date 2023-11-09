import { UserId } from "./userid";

export interface Device{
    id?: number,
    address?: string,
    description?: string,
    consumption?: string,
    userFk?: UserId
}