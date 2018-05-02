import { Creep, Behaviour } from './creep';

export function runBuilder(creepId: string, data: Creep): number {
    const creep = Game.creeps[creepId];
    if (!creep) {
        return ERR_INVALID_TARGET;
    }
    let target: any;
    if (!data.target) {
        if (!creep.carry[RESOURCE_ENERGY]) {
            target = Behaviour.findResource(RESOURCE_ENERGY, creep, data);
        } else {
            target = findBuildTarget(creep, data);
        }
    } else {
        target = Game.getObjectById(data.target)
    }
    if (!target) {
        return ERR_INVALID_TARGET;
    }
    let result: number = OK;
    if (target instanceof ConstructionSite) {
        result = build(creep, target);
    } else {
        result = Behaviour.load(RESOURCE_ENERGY, creep, target);
    }
    if (result != OK) {
        data.target = null;
    }
    return result;
}

function findBuildTarget(creep: any, data: any) {
    let result = creep.pos.findClosestByRange(FIND_MY_CONSTRUCTION_SITES, {
    });
    data.target = result && result.id;
    return result
}

function build(creep: any, target: any): number {
    creep.say("Building");
    let result = creep.build(target);
    if(result == ERR_NOT_IN_RANGE){
        result = Behaviour.moveTo(creep, target);
    }
    return result;
}
