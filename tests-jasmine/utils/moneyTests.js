import {formatCurrency} from '../../js/utils/money.js';

describe('Test suuite : formatCurrenty method', () =>{
    it('converts cents into dollers', () => {
        expect(formatCurrency(2095)).toEqual('20.95');
    });


    it('converts zero into dollers', () => {
        expect(formatCurrency(0)).toEqual('0.00');
    });

    it('converts round up to nearest dollers', () => {
        expect(formatCurrency(2000.5)).toEqual('20.01');
    });
});