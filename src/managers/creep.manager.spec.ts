import 'mocha';
import { expect } from 'chai';
import { mock } from 'sinon';

import { STATESKEY } from '../core/state';
import { CreepManager } from './creep.manager';

declare var global: any;
describe("CreepManager tests", () => {
    beforeEach(() => {
        global.Memory = {};
        global.Memory[STATESKEY] = {};
        global.Game = {
            rooms: {
                winnie: {
                    controller: { my: true }
                }
            },
            creeps: {
                1: { room: { name: "winnie" }, id: "tiggers" },
                2: { room: { name: "winnie" }, id: "kanga" },
                3: { room: { name: "winnie" }, id: "pooh" },
                4: { room: { name: "winnie" }, id: "eeyor" }
            }
        };
    });

    // it("controlPopulation retrieves the room by id", () => {
    //     let manager = new CreepManager();
    //     manager.creeps['tiggers'] = { role: 1, target: null, home: "winnie" };
    //     manager.creeps['kanga'] = { role: 2, target: null, home: "winnie" };
    //     manager.creeps['pooh'] = { role: 2, target: null, home: "winnie" };
    //     manager.creeps['eeyor'] = { role: 2, target: null, home: "winnie" };
    //
    //     manager.controlPopulation("winnie");
    // });
});



