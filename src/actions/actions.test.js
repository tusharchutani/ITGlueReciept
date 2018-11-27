import '../setupTests';

import {ADD_ITEM, DELETE_ITEM, EDIT_ITEM, add_item, delete_item, edit_item} from '../actions';

describe('Should return the correct actions', ()=>{

    let testItem = {id:1, name:'Salsa', price:10, qty:1};
    

    it('Should return the correct action for add item', ()=>{
        expect(add_item(testItem)).toEqual({type:ADD_ITEM,payload:testItem});
    });

    it('Should return the correct action for delete item', ()=>{
        expect(delete_item(testItem)).toEqual({type:DELETE_ITEM,payload:testItem});
    });

    it('Should return the correct action for edit item', ()=>{
        expect(edit_item(testItem)).toEqual({type:EDIT_ITEM,payload:testItem});
    });

});
