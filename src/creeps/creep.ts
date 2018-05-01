import { Vector2 } from '../core/vector2';
import { State } from '../core/state';

export enum CreepRole {
    Unknown = 0,
    Harvester = 1,
    Builder = 2,
    Upgrader = 3
}

export interface Creep {
    role: CreepRole;
    target: any;
}

export module Behaviour {
}


