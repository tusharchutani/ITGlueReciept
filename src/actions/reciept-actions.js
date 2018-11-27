export const ADD_ITEM = 'add_item';
export const EDIT_ITEM = 'edit_item';
export const DELETE_ITEM = 'delete_item';


export function add_item(item){
    return { type: ADD_ITEM, payload: item }
}

export function edit_item(item){
    return { type: EDIT_ITEM, payload: item };
}

export function delete_item(item_id){
    return { type: DELETE_ITEM, payload: item_id }
}