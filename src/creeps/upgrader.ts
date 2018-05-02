import { CreepModel, Behaviour } from './creep';

export function runUpgrader(creepId: string, data: CreepModel): number {
    const creep = Game.creeps[creepId];
    if (!creep) {
        return ERR_INVALID_TARGET;
    }

    let target: any;
    if (!data.target) {
        if (!creep.carry[RESOURCE_ENERGY]) {
            target = Behaviour.findResource(RESOURCE_ENERGY, creep, data);
        } else {
            target = Behaviour.findUpgradeTarget(creep, data);
        }
    }

    if (!target) {
        data.target = null;
        return ERR_INVALID_TARGET;
    }

    let result: number;
    if (target instanceof StructureController) {
        result = Behaviour.upgrade(creep, target);
    } else {
        result = Behaviour.load(RESOURCE_ENERGY, creep, target);
    }
    if (result != OK) {
        data.target = null;
    }
    return result;
}


