import './reciept.css';

import React, { Component } from 'react';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Item from './item';
import { connect } from 'react-redux';

export class Reciept extends Component {
    

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
        <div className="titleContainer">
            <Grid container>
                    <Grid item xs={6}> <h5> Item </h5> </Grid>
                    <Grid item xs={2}> <h5> Price </h5> </Grid>
                    <Grid item xs={2}> <h5> Quantity</h5> </Grid>
                    <Grid item xs={1}> <h5> Total </h5> </Grid>
                    <Grid item xs={1}>  </Grid> 
            </Grid>
        </div>
        {items.map((item, index)=>{
            return (<Item
                key={`item-${index}`}
                {...item}
                />);
        })}

        <Item itemAdd={true} />      

        <Grid id="titleContainer" container>
            <Grid item xs={8}> </Grid>
            <Grid item xs={4}> 
            <div className="totalContainer">
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
                </div>
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