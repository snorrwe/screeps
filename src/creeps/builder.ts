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
            target = Behaviour.findBuildTarget(creep, data);
        }
    } else {
        target = Game.getObjectById(data.target)
    }
    if (!target) {
        data.target = null;
        return ERR_INVALID_TARGET;
    }
    let result: number = OK;
    if (target instanceof ConstructionSite) {
        result = Behaviour.build(creep, target);
    } else {
        result = Behaviour.load(RESOURCE_ENERGY, creep, target);
    }
    if (result != OK) {
        data.target = null;
    }
    return result;
}


