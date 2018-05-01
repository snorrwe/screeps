import { Creep, Behaviour } from './creep';

export function harvest(creep: any, data: Creep) {
    const target: any = Game.getObjectById(data.target);
    let result: number = OK;
    if (target instanceof Source) {
        creep.say("Harvesting");
        result = creep.harvest(target);
        if (result == ERR_NOT_IN_RANGE) {
            result = creep.moveTo(target);
        }
    } else {
        creep.say("Unloading");
        result = creep.transfer(target, RESOURCE_ENERGY);
        if (result == ERR_NOT_IN_RANGE) {
            result = creep.moveTo(target);
        }
    }
    return result;
}

export function runHarvester(creedId: string, data: Creep) {
    //TODO
}

