import { CreepModel, Behaviour } from './creep';

export function runBuilder(creepId: string, data: CreepModel): number {
    const creep = Game.creeps[creepId];
    if (!creep) {
        return ERR_INVALID_TARGET;
    }
    let target: any;
    if (!data.target) {
        if (!creep.carry[RESOURCE_ENERGY]) {
            target = Behaviour.findResource(RESOURCE_ENERGY, creep, data);
            if(!target){
                target = Behaviour.findSource(creep, data);
            }
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
    } else if (target instanceof Source) {
        result = Behaviour.harvest(creep, target);
    } else {
        result = Behaviour.load(RESOURCE_ENERGY, creep, target);
    }
    if (result != OK) {
        data.target = null;
    }
    return result;
}

