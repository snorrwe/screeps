import { State } from '../core/state';

interface CreepManagerData {};

export class CreepManager {
    constructor(private state: State<CreepManagerData> = null) {
        if (!this.state) {
            this.state = new State<CreepManagerData>("creep-manager");
        }
    }
}

