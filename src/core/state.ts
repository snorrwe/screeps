export interface IRecord<T> {
    data: T;
    modified: number;
}

let states: { [key: string]: State<any> } = {};

export const STATESKEY = "states";

export class State<TData> {
    get data() { return this.record.data; }
    set data(v) { this.record.data = v; }

    private record: IRecord<TData> = { data: null, modified: null };

    private static states: any;

    constructor(private key: string) {
    }

    static init(): void {
        if (!Memory[STATESKEY]) Memory[STATESKEY] = {};
        if (!State.states) State.states = Memory[STATESKEY];
    }

    save(): void {
        this.record.modified = Game.time;
        Memory[STATESKEY][this.key] = this.record;
    }

    clear(): void {
        State.clear(this);
    }

    static clear(state: string | State<any>): void {
        if (state instanceof String) {
            state = states[state as string];
        }
        let affected: any = state;
        affected.record = { data: {} as any, modified: Game.time };
        delete Memory[STATESKEY][affected.key];
        delete states[affected.key]
    }

    static saveAll(): void {
        for (let key in states) {
            states[key].save();
        }
    }
}



