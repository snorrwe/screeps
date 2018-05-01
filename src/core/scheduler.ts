import { State } from './state';

interface ScheduleRecord {
    timeToExecute: number;
}

interface ScheduleData {
    [key: string]: ScheduleRecord
}

export enum ExecutionResult {
    NotExecuted = 0,
    Executed,
    ForceExecuted
}

export module Schedule {
    const state = new State<ScheduleData>("Scheduler");

    export const execute = (
        callback: () => any
        , key: string
        , interval: number
        , force = false
    ) => {
        let result: any = { status: ExecutionResult.NotExecuted, value: null };
        if (!(key in state.data)) {
            state.data[key] = { timeToExecute: interval };
        }
        if (force || !--state.data[key].timeToExecute) {
            result.value = callback();
            result.status = !state.data[key].timeToExecute
                ? ExecutionResult.Executed
                : ExecutionResult.ForceExecuted;
            state.data[key].timeToExecute = interval;
        }
        return result;
    };

    export const init = () => {
        state.data = state.data || {};
    };

    export const collectGarbage = () => {
    };
}

