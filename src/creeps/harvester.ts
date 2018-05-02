import { CreepModel, Behaviour } from './creep';

export function runHarvester(creedId: string, data: CreepModel): number {
    const creep = Game.creeps[creedId];
    if (!creep) {
        return;
    }
    const target = Game.getObjectById(data.target) || updateTarget(creep, data);
    return _runHarvester(creep, target, data);
}

function _runHarvester(creep: any, target: any, data: CreepModel): number {
    const _updateTarget = () => {
        updateTarget(creep, data);
        target = Game.getObjectById(data.target);
        return _runHarvester(creep, target, data);
    };
    if (target instanceof Source) {
        if (_.sum(creep.carry) >= creep.carryCapacity) {
            return _updateTarget();
        }
        return Behaviour.harvest(creep, target);
    }
    if (creep.carry[RESOURCE_ENERGY] == 0) {
        return _updateTarget();
    }
    return Behaviour.unload(creep, target);
}

function updateTarget(creep: any, data: CreepModel): void {
    let find: number = 0;
    if (_.sum(creep.carry) < creep.carryCapacity) {
        find = FIND_SOURCES;
    } else {
        find = FIND_MY_SPAWNS;
    }
    let result = creep.pos.findClosestByRange(find);
    data.target = result && result.id;
    return result;
}

