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
    export function harvest(creep: any, target: any) {
        let result: number = OK;
        creep.say("Harvesting");
        result = creep.harvest(target);
        if (result == ERR_NOT_IN_RANGE) {
            result = creep.moveTo(target);
        }
        return result;
    }

    export function unload(creep: any, target: any) {
        let result: number = OK;
        creep.say("Unloading");
        result = creep.transfer(target, RESOURCE_ENERGY);
        if (result == ERR_NOT_IN_RANGE) {
            result = creep.moveTo(target);
        }
        return result;
    }
}
