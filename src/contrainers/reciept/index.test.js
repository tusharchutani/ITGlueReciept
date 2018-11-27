import '../../setupTests';

import { mount, shallow } from 'enzyme';

import {Item} from './item';
import React from 'react';
import {Reciept} from './index';
import { wrap } from 'module';

describe('<Reciept>', ()=> {

    describe('Items',()=>{
        it('Should have 3 text boxes when we are not adding and all the fields are filled out', () => {
            let wrapper =  shallow(<Item itemAdd={false} name="a" price={1} quantity={2}/>);
            expect(wrapper.find('.itemTextField').length).toEqual(3);
            expect(wrapper.find('#iconButton').length).toEqual(1);
          });
          it('Should have 3 text boxes when we are not adding but no delete button when one of the required fields is empty', () => {
            let wrapper =  shallow(<Item itemAdd={false} name="a" price={0} quantity={2}/>);
            expect(wrapper.find('.itemTextField').length).toEqual(3);
            expect(wrapper.find('#iconButton').length).toEqual(0);
          });
    });

    describe('Should render the Items and heading', ()=>{
        let items = [
            {id:0, name:'Item 1', price:1,quantity: 1},
            {id:1, name:'Item 2', price:2,quantity: 2},
            {id:2, name:'Item 2', price:1,quantity: 3}
        ];
        
            let wrapper =  shallow(<Reciept items={items}/>);
            for(let i = 0; i < items.length; i++){
                let item = wrapper.find({id:i});
                expect(item.props('name').name).toEqual(items[i].name);
                expect(item.props('price').price).toEqual(items[i].price);
                expect(item.props('quantity').quantity).toEqual(items[i].quantity);
            }

    });


});

