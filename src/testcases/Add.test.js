//Testcases

import Add, {subtract} from "../components/smallJsComponents/Add";

describe('Give Sum', ()=>{
    it('1st test',()=>{
        expect(Add(2,3)).toBe(5);
    })
})

describe('Give Subtract', ()=>{
    it('2nd test',()=>{
        expect(subtract(2,3)).toBe(1);
    })
})
