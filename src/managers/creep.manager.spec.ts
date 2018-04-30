import 'mocha';
import { expect } from 'chai';

import { STATESKEY } from '../core/state';
import { CreepManager } from './creep.manager';

declare var global: any;
describe("CreepManager tests", () => {
    beforeEach(() => {
        global.Memory = {};
        global.Memory[STATESKEY] = {};
        global.Game = { time: 234 };
    });

    it("", () => {
        let manager = new CreepManager();
    });
});

