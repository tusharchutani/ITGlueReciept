import './reciept.css';

import React, { Component } from 'react';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Item from './item';
import { connect } from 'react-redux';

class Reciept extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            items:[],
            lastProductId:0,
            total:0
        }
    }
    onChange = (edittedItem)=>{
        // let items = this.state.items.map((item)=>{
        //     if(item.id === edittedItem.id){
        //         return edittedItem;
        //     }
        //     return item;
        // });
        // this.setState({items}, ()=>{
        //     this.calculateTotal();
        // });
    }

    calculateWithTaxes = () =>{
        return Math.round(this.props.total*1.05* 100) / 100;
    }
    calculateTax = () =>{
        return Math.round(this.props.total * 0.05 * 100)/100;
    }
  render() {
      const { items } = this.props;
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
        {items.map((item, index)=>{
            return (<Item 
                key={index}
                {...item}
                onDelete={this.onDelete} 
                onChange={this.onChange}
                />);
        })}

        <Item itemAdd={true} />      

        <Grid id="titleContainer" container>
            <Grid item xs={8}> </Grid>
            <Grid className="totalContainer" item xs={4}> 
                <table>
                    <tbody>
                    <tr>
                        <td>Subtotal</td>
                        <td>${this.props.total}</td>
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

const mapStateToProps = state =>{

    return {
        items: state.reciept.items, 
        total: state.reciept.total
    };
}



export default connect(mapStateToProps)(Reciept);