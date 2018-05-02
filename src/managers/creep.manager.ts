import { State } from '../core/state';
import { CreepModel, CreepRole, Behaviour } from '../creeps/creep';
import { runHarvester } from '../creeps/harvester';
import { runBuilder } from '../creeps/builder';
import { runUpgrader } from '../creeps/upgrader';
import { Schedule } from '../core/scheduler';
import { normalise } from '../core';

export enum TaskType {
}

export interface Task {
    type: TaskType;
    param: any;
}

interface CreepManagerData {
    creeps: { [key: string]: CreepModel }
}

// TODO
const targetRoleDistribution: { [key: number]: number } = {};
targetRoleDistribution[CreepRole.Harvester] = 1;
targetRoleDistribution[CreepRole.Builder] = 1;
targetRoleDistribution[CreepRole.Upgrader] = 1;
const targetPopulation = 6;//TODO

export class CreepManager {

    get creeps() { return this.state.data.creeps; }

    constructor(private state: State<CreepManagerData> = null) {
        this.state = this.state || new State<CreepManagerData>("creep-manager");
        this.state.data = this.state.data || { creeps: {} };
    }

    update() {
        this.updateCreeps();
        Schedule.execute(() => this.updatePopulation(), "CreepManager # updatePopulation", 10);
    }

    updatePopulation() {
        for (let room in Game.rooms) {
            this.controlPopulation(room);
        }
    }

    controlPopulation(roomid: string) {
        const room: Room = Game.rooms[roomid];
        if (!room || !room.controller || !room.controller.my) {
            return;
        }
        let creepsByRoles: any = {};
        for (const i in CreepRole) {
            creepsByRoles[i] = +0;
        }
        let total = 0;
        let max = 0;
        for (let id in Game.creeps) {
            const creep = Game.creeps[id];
            if (creep.room.name != roomid) {
                continue;
            }
            const creepData = this.creeps[id];
            if (!creepData) {
                continue
            }
            creepsByRoles[creepData.role] = creepsByRoles[creepData.role] || 0;
            creepsByRoles[creepData.role]++;
            total++;
            if (creepsByRoles[creepData.role] > max) {
                max = creepsByRoles[creepData.role];
            }
        }
        if (max) {
            normalise(creepsByRoles, max);
        }
        if (total >= targetPopulation) {
            return;
        }
        for (let i in creepsByRoles) {
            if (creepsByRoles[i] < targetRoleDistribution[+i]) {
                this.spawnCreep(roomid, +i);
                return;
            }
        }
    }

    spawnCreep(roomid: string, role: CreepRole) {
        let bodyParts: any[] = [];
        switch (role) {
            //TODO
            case CreepRole.Builder:
            case CreepRole.Harvester:
            case CreepRole.Upgrader:
                bodyParts = [WORK, CARRY, MOVE];
                break;
            default:
                console.log("Trying to spawn unimplemented creep role:", role);
        }
        const names = Object.keys(Game.creeps);
        let name: number | string = +names[names.length - 1] + 1 || 1;
        name = name.toString();

        const spawns = Game.rooms[roomid].find(FIND_MY_STRUCTURES, {
            filter: { structureType: STRUCTURE_SPAWN }
        } as any);
        const spawn = spawns[0];// TODO
        let result = (spawn as any).spawnCreep(bodyParts, name);
        console.log("Spawning creep, [role] [parts] [name] [result]:", CreepRole[role], bodyParts, name, result);
        if (result == OK) {
            this.creeps[name] = { role: role, target: null, home: roomid };
        }
    }

    updateCreeps() {
        const creeps = this.creeps;
        for (let i in Game.creeps) {
            const creep = Game.creeps[i];
            const id = i;
            if (!(id in creeps)) {
                creeps[id] = { role: CreepRole.Unknown, target: null, home: creep.room.name };
                this.assignRole(id, creep);
            }
            this.updateCreep(id);
        }
    }

    private assignRole(id: string, creep: Creep) {
        const creepStats: any = {};
        for (let id in creep.body) {
            const part = creep.body[id];
            creepStats[part.type] = creepStats[part.type] || 0;
            creepStats[part.type]++;
        }
        if (WORK in creepStats) {
            if (!(CARRY in creepStats) || !(MOVE in creepStats)) {
                console.log("Cannot assign role to creep:", creep);
                return;
            }
            if (creepStats[CARRY] > creepStats[MOVE]) {
                this.creeps[id].role = CreepRole.Builder;
            } else {
                this.creeps[id].role = CreepRole.Harvester;
            }
        } else {
            console.log("Cannot assign role to creep without WORK!", creep);
        }
    }

    updateCreep(id: string) {
        const data = this.creeps[id];
        switch (data.role) {
            case CreepRole.Harvester:
                runHarvester(id, data);
                break;
            case CreepRole.Builder:
                runBuilder(id, data);
            case CreepRole.Upgrader:
                runUpgrader(id, data);
                break;
            default:
                console.log("Unimplemented creep role:", this.creeps[id].role);
        }
    }
}
