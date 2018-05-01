import { Schedule } from './core/scheduler';
import { State } from './core/state';
import { CreepManager } from './managers/creep.manager';

export interface HiveData { }

export class Hive {

    constructor(
        private state: State<HiveData> = new State<HiveData>("hive-mind")
        , private creepManager: CreepManager = new CreepManager()
    ) {
    }

    tick(): boolean {
        return this.setup() && this.update() && this.teardown();
    }

    private setup(): boolean {
        try {
            Schedule.init();
            return true;
        } catch (error) {
            console.log("Error in Hive#setup", error);
            return false;
        }
    }

    private update(): boolean {
        try {
            this.creepManager.update();
            return true;
        } catch (error) {
            console.log("Error in Hive#update", error);
            return false;
        }
    }

    private teardown(): boolean {
        try {
            State.saveAll();
            return true;
        } catch (error) {
            console.log("Error in Hive#teardown", error);
            return false;
        }
    }
}

let hive = new Hive();
hive.tick();

