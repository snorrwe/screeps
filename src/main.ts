import {} from './core/scheduler';
import { State } from './core/state';
declare var module: any;

export interface HiveData { }

export class Hive {

    constructor(private state: State<HiveData> = null) {
        if (!this.state) {
            this.state = new State<HiveData>("hive-mind");
        }
    }

    tick(): boolean {
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
            return true;
        } catch (error) {
            console.log("Error in Hive#teardown", error);
            return false;
        }
    }
}

module.exports.loop = function() {
    let hive = new Hive();
    hive.tick();
};



