import '../setupTests';

import  { ADD_ITEM, DELETE_ITEM, EDIT_ITEM } from '../actions';

import recieptReducer from './recieptReducer';

describe('Reciept reducers', ()=> {
    it('has a default state', ()=>{
        expect(recieptReducer(undefined, {})).toEqual({items: [], total: 0});
    });
    describe('Add item reducer', ()=>{
        let testItem = {id:1, name:'Salsa', price:10, quantity:1};
        it('Should add item when there are no items', ()=>{
            let data = recieptReducer(undefined, {type:ADD_ITEM, payload: testItem});
            expect(data).toEqual({total: 10, items:[testItem]})
        });

        it('Should add items when there already are items', ()=>{
            let preDefinedState = {
                items: [{id: 0, name:'Item 1', price:1, quantity: 5}, {id: 0, name:'Item 1', price:2, quantity: 5}],
                total: 15 
            }
            let data = recieptReducer(preDefinedState, {type:ADD_ITEM, payload: testItem});
            expect(data).toEqual({total: 25, items:[...preDefinedState.items, testItem]})
        });
        
        
    });

    describe('Delete item reducer', ()=>{
        let testItem = {id:3, name:'Salsa', price:10, quantity:1};
        it('The state should remain same if the item is not in the items', ()=>{
            let data = recieptReducer(undefined, {type:DELETE_ITEM, payload: testItem});
            expect(data).toEqual({total: 0, items:[]})
        });

        it('Should delete the item and update the total', ()=>{
            let preDefinedState = {
                items: [
                    {id: 0, name:'Item 1', price:1, quantity: 5}, 
                    {id: 0, name:'Item 1', price:2, quantity: 5},
                    testItem],
                total: 25 
            }
            let data = recieptReducer(preDefinedState, {type:DELETE_ITEM, payload: 3});
            expect(data).toEqual({total: 15, items:[ {id: 0, name:'Item 1', price:1, quantity: 5}, {id: 0, name:'Item 1', price:2, quantity: 5}]})
        });
        
    });


    describe('Edit item reducer', ()=>{
        
        let defaultState = {
            items: [{id:1, name:'Spicy Salsa', price: 1, quantity: 2}],
            total: 2
        }
        it('Should edit the item', ()=>{
            let testItem = {id:1, name:'Salsa', price:10, quantity:2};
            let data = recieptReducer(defaultState, {type:EDIT_ITEM, payload: testItem});
            expect(data).toEqual({total: 20, items:[{id:1, name:'Salsa', price:10, quantity:2}]})
        });

        it('Should not change the state when the item is not in the state',()=>{
            let testItem = {id:4, name:'Chips', price:10, quantity:2};
            let data = recieptReducer(defaultState, {type:EDIT_ITEM, payload: testItem});
            expect(data).toEqual(defaultState)
        })

        
    });
});