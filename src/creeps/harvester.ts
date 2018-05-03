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
    if (target instanceof Source) {
        if (_.sum(creep.carry) >= creep.carryCapacity) {
            target = updateTarget(creep, data);
            return _runHarvester(creep, target, data);
        }
        return Behaviour.harvest(creep, target);
    }
    if (creep.carry[RESOURCE_ENERGY] == 0) {
        target = updateTarget(creep, data);
        return _runHarvester(creep, target, data);
    }
    return Behaviour.unload(creep, target);
}

function updateTarget(creep: any, data: CreepModel) {
    if (_.sum(creep.carry) < creep.carryCapacity) {
        return Behaviour.findSource(creep, data);
    }
    let result = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
        filter: (s: any) => {
            s.storage && _.sum(s.storage) < s.storageCapacity;
        }
    });
    if (!result) {
        result = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
            filter: (s: any) => {
                return (s.energy && s.energy < s.energyCapacity) || s.energy === 0;
            }
        });
    }
    data.target = result && result.id;
    return result;
}
