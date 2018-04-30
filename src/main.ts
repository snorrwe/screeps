import { Schedule } from './core/scheduler';
import { State } from './core/state';

export interface HiveData { }

export class Hive {

    constructor(private state: State<HiveData> = null) {
        if (!this.state) {
            this.state = new State<HiveData>("hive-mind");
        }
    }

    tick(): boolean {
        console.log("tick");
        return this.setup() && this.update() && this.teardown();
    }

    private setup(): boolean {
        try {
            State.init();
            return true;
        } catch (error) {
            console.log("Error in Hive#setup", error);
            return false;
        }
    }

    private update(): boolean {
        try {
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
