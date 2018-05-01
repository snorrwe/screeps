import { State } from '../core/state';
import { Creep, CreepRole, Behaviour } from '../creeps/creep';
import { runHarvester } from '../creeps/harvester';

export enum TaskType {
}

export interface Task {
    type: TaskType;
    param: any;
}

interface CreepManagerData {
    creeps: { [key: string]: Creep }
}

export class CreepManager {

    private get creeps() { return this.state.data.creeps; }

    constructor(private state: State<CreepManagerData> = null) {
        this.state = this.state || new State<CreepManagerData>("creep-manager");
        this.state.data = this.state.data || { creeps: {} };
    }

    update() {
        this.updateCreeps();
    }

    updateCreeps() {
        const creeps = this.creeps;
        for (let i in Game.creeps) {
            const creep = Game.creeps[i];
            const id = creep.id;
            if (!(id in creeps)) {
                creeps[id] = { role: CreepRole.Unknown, target: null };
                this.assignRole(id, creep);
            }
            this.updateCreep(id);
        }
    }

    private assignRole(id: string, creep: any) {
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
            default:
                console.log("Unimplemented creep role:", this.creeps[id].role);
        }
    }
}
