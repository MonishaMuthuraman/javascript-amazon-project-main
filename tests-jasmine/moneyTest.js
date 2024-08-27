import {formatCurrency} from "../scripts/utils/money.js";

describe('TestSuite: formatCurrency',()=>
{
    it('convert cents into dollars',()=>{
        expect(formatCurrency(1025)).toEqual('10.25');
        
    });
    it('works with 0',()=>{
        expect(formatCurrency(0)).toEqual('0.00');
    });
    it('rounds up to nearest cents',()=>{
        expect(formatCurrency(2000.5)).toEqual('20.01');
    });
    it('works with large numbers',()=>{
        expect(formatCurrency(2004)).toEqual('20.04');
    });
});