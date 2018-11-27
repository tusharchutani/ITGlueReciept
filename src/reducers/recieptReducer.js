import { ADD_ITEM, DELETE_ITEM, EDIT_ITEM } from '../actions';

const defaultState = {
    items:[],
    total:0
}
export default function recieptReducer(state=defaultState, action){
    const { type, payload } = action;
    switch(type){
        case ADD_ITEM:
            let item = setId(state, payload);
            let total = calculateTotal([...state.items, item]);
            return {
                total,
                items: [...state.items, item]
            }
        case DELETE_ITEM:
            const indexToBeRemoved = state.items.findIndex(item => (item.id===payload));
            const {items} = state;
            total = calculateTotal([...items.slice(0,indexToBeRemoved), ...items.slice(indexToBeRemoved+1)]);
            return {
                total,
                items: [
                    ...items.slice(0,indexToBeRemoved), ...items.slice(indexToBeRemoved+1)
                ]
            }
        case EDIT_ITEM:
            let updatedItems = updatedListOfItems(state.items, payload);
            let newTotal = calculateTotal(updatedItems);
            const updatedState = {...state};
            updatedState.items = updatedItems;
            updatedState.total = newTotal;
            return updatedState;
        default:
            return state;
    }
}

function setId(state, item){
    let items = state.items;
    let idOfNewItem;
    if(items.length === 0){
        idOfNewItem = 0;
    }else{
        idOfNewItem = state.items.slice(-1)[0].id+1;
    }
    item.id = idOfNewItem;
    return item;
}

function calculateTotal(items){
    let totalOfItems = items.map((item)=>{
        return (item.price*item.quantity);
    });
    
    let total = totalOfItems.reduce((total, num)=>(total+num),0);
    return total;
}

function updatedListOfItems(items, toUpdate){
    let updatedItems = items.map((item)=>{
        if(item.id == toUpdate.id){
            return toUpdate
        }
        return item
    });
    return updatedItems;
}