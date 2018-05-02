export interface IRecord<T> {
    data: T;
    modified: number;
}

export const STATESKEY = "states";

export class State<TData> {
    get data() { return this.record.data; }
    set data(v) { this.record.data = v; }

    private record: IRecord<TData> = { data: null, modified: null };

    private static states: any = [];

    constructor(private key: string, private statesKey: string = STATESKEY) {
        if (!(this.statesKey in Memory)) {
            Memory[this.statesKey] = {};
        }
        if (this.key in Memory[this.statesKey]) {
            this.record = Memory[this.statesKey][this.key];
        }
        State.states.push(this);
    }

    save(): void {
        this.record.modified = Game.time;
        Memory[this.statesKey][this.key] = this.record;
    }

    clear(): void {
        State.clear(this);
    }

    static clear(state: string | State<any>): void {
        if (state instanceof String) {
            state = State.states[state as string];
        }
        let affected: any = state;
        affected.record = { data: {} as any, modified: Game.time };
        delete Memory[affected.statesKey][affected.key];
        delete State.states[affected.key]
    }

    static saveAll(): void {
        for (let key in State.states) {
            State.states[key].save();
        }
    }
}
