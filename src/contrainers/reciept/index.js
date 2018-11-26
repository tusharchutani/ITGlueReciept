import './reciept.css';

import React, { Component } from 'react';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Item from './item';

class Reciept extends Component {
    
    constructor(){
        super();
        this.state = {
            items:[],
            lastProductId:0,
            total:0
        }
    }
    onChange = (edittedItem)=>{
        console.log("Eddited item is ");
        console.log(edittedItem);
        let items = this.state.items.map((item)=>{
            if(item.id === edittedItem.id){
                return edittedItem;
            }
            return item;
        });
        this.setState({items}, ()=>{
            this.calculateTotal();
        });
    }

    onDelete = (id) => {
        const items = this.state.items.filter((item)=>{
            return item.id !== id;
        });
        this.setState({items}, ()=>{
            this.calculateTotal();
        });        
    }
    addItem = (item) =>{
        let items = this.state.items;
        let idOfNewItem;
        if(items.length === 0){
            idOfNewItem = 0;
        }else{
            idOfNewItem = this.state.items.slice(-1)[0].id+1;
        }
        
        item.id = idOfNewItem;
        items.push(item);
        this.setState({items});
        this.calculateTotal();
    }

    calculateTotal = () =>{
        let totalOfItems = this.state.items.map((item)=>{
            console.log("The price is "+item.price + " Q:"+item.quantity);
            return (item.price*item.quantity);
        });
        
        let total = totalOfItems.reduce((total, num)=>(total+num));
        
        this.setState({total});
    }

    calculateWithTaxes = () =>{
        return Math.round(this.state.total*1.05* 100) / 100;
    }
    calculateTax = () =>{
        return Math.round(this.state.total * 0.05 * 100)/100;
    }
  render() {
    return (
        <Card className="recieptCard">
            <div>
        <Grid id="titleContainer" container>
            <Grid item xs={6}> <h5> Item </h5> </Grid>
            <Grid item xs={2}> <h5> Price </h5> </Grid>
            <Grid item xs={2}> <h5> Quantity</h5> </Grid>
            <Grid item xs={1}> <h5> Total </h5> </Grid>
            <Grid item xs={1}>  </Grid> 
        </Grid>
        {this.state.items.map((item, index)=>{
            return (<Item 
                key={index}
                {...item}
                onDelete={this.onDelete} 
                onChange={this.onChange}
                />);
        })}

        <Item onAddItem={this.addItem} itemAdd={true} />      

        <Grid id="titleContainer" container>
            <Grid item xs={8}> </Grid>
            <Grid className="totalContainer" item xs={4}> 
                <table>
                    <tbody>
                    <tr>
                        <td>Subtotal</td>
                        <td>${this.state.total}</td>
                    </tr>
                    <tr>
                        <td>Tax(5%)</td>
                        <td> ${this.calculateTax()} </td>
                    </tr>
                    <tr>
                        <td>Total</td>
                        <td> ${this.calculateWithTaxes()} </td>
                    </tr>
                    </tbody>
                </table>
            </Grid>
        </Grid>

        </div>
        </Card>
    );
  }
}


export default Reciept;