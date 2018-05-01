import { expect } from 'chai';
global.Memory = {};
import { State } from './state';
import { Schedule, ExecutionResult } from './scheduler';

declare var global: any;

describe("Scheduler tests", () => {
    beforeEach(() => {
        global.Memory = {};
        Schedule.init();
    });

    afterEach(() => {
    });

    it("Can schedule work to execute", () => {
        let result = null;
        let execute = () => {
            return Schedule.execute(() => "winnie", "pooh", 5);
        };
        for (let i = 0; i < 4; ++i) {
            result = execute();
            expect(result).to.not.be.null;
            expect(result.status).to.equal(ExecutionResult.NotExecuted);
        }
        result = execute();
        expect(result).to.not.be.null;
        expect(result.status).to.equal(ExecutionResult.Executed);
        expect(result.value).to.equal("winnie");
    });
});

