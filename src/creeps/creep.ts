import { Vector2 } from '../core/vector2';
import { State } from '../core/state';

export enum CreepRole {
    Unknown = 0,
    Harvester = 1,
    Builder = 2,
    Upgrader = 3
}

export interface CreepModel {
    role: CreepRole;
    target: any;
    home: string;
}

export module Behaviour {
    export function harvest(creep: Creep, target: any) {
        creep.say("Harvesting");
        let result: number = OK;
        result = creep.harvest(target);
        if (result == ERR_NOT_IN_RANGE) {
            result = moveTo(creep, target);
        }
        return result;
    }

    export function unload(creep: Creep, target: any) {
        creep.say("Unloading");
        let result: number = OK;
        result = creep.transfer(target, RESOURCE_ENERGY);
        if (result == ERR_NOT_IN_RANGE) {
            result = moveTo(creep, target);
        }
        return result;
    }

    export function load(resource: any, creep: Creep, target: any) {
        creep.say("L " + resource);
        let result = creep.withdraw(target, resource, creep.carryCapacity);
        if (result == ERR_NOT_IN_RANGE) {
            result = moveTo(creep, target);
        }
        return result;
    }

    export function moveTo(creep: Creep, target: any) {
        return creep.moveTo(target);
    }

    export function findResource(resource: any, creep: Creep, data: CreepModel) {
        let result = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
            filter: (struct: any) => {
                return struct.energy || struct.store && struct.store[resource] > 0;
            }
        });
        data.target = result && result.id;
        return result;
    }

    export function findBuildTarget(creep: Creep, data: any) {
        let result = creep.pos.findClosestByRange(FIND_MY_CONSTRUCTION_SITES);
        data.target = result && result.id;
        return result
    }

    export function build(creep: Creep, target: any): number {
        creep.say("Building");
        let result: number = creep.build(target);
        if (result == ERR_NOT_IN_RANGE) {
            result = Behaviour.moveTo(creep, target);
        }
        return result;
    }
}






