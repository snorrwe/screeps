import 'mocha';
import { expect } from 'chai';
import * as sinon from 'sinon';

import { State, STATESKEY } from './state';

declare var global: any;

describe("State tests", () => {
    beforeEach(() => {
        global.Memory = {};
        global.Memory[STATESKEY] = {};
        global.Game = { time: 234 };
    });

    afterEach(() => {
        global.Memory = undefined;
    });

    it("save() saves the record to memory", () => {

        let state = new State<string>("pudding");
        state.data = "winnie-the-pooh";
        state.save();

        expect(global.Memory[STATESKEY]["pudding"].data).to.equal("winnie-the-pooh");
    });

    it("clear() clears the record from memory", () => {
        global.Memory[STATESKEY]["pudding"] = { data: "winnie-the-pooh" };

        let state = new State<string>("pudding");
        expect(global.Memory[STATESKEY]["pudding"].data).to.equal("winnie-the-pooh");

        state.clear();

        expect("pudding" in global.Memory[STATESKEY]).to.be.false;
    });

    it("reads state from memory", () => {
        global.Memory[STATESKEY]["pudding"] = {data:"tiggers"};

        let state = new State<string>("pudding");

        expect(state.data).to.equal("tiggers");
    });
});


