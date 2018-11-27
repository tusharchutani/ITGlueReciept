import './reciept.css';

import React, { Component } from 'react';
import { add_item, delete_item, edit_item } from '../../actions';

import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';

export class Item extends Component {

  constructor(props){
    super();
    this.state = {
      name:props.name,
      quantity:props.quantity,
      price:props.price
    }
  }

  handleNameChange = (e) => {
    this.setState({name: e.target.value}, ()=>{
      this.handlChange();
    });
    
  }
  handlePriceChange = (e) =>{
    this.setState({price: e.target.value},()=>{
      this.handlChange();
    });

  }

  handleQtyChange = (e) => {
    this.setState({quantity: e.target.value},()=>{
      this.handlChange();
    });
}

  handlChange = () =>{
    const newItem = {
      id: this.props.id,
      name: this.state.name,
      price: this.state.price,
      quantity: this.state.quantity
    }
    if(this.props.itemAdd){
      setTimeout(()=>{this.addItem()},1500);
    }else{
      this.props.editItem(newItem)
    }
  }

  addItem = () => {
    const newItem = {
      id: this.props.id,
      name: this.state.name,
      price: this.state.price,
      quantity: this.state.quantity
    }
    if(this.props.itemAdd){
      const { price, name, quantity} = this.state;
      //Do nothing if price and quantity is 0 and there is no name
      if(price > 0 && quantity > 0 && name !== ''){
        this.props.addItem(newItem);
        //reset it back
        this.setState({
          name:'',
          price:0,
          quantity:0
        });
      }
    }
  }

  componentDidUpdate(prevProps){
    if(prevProps.id !== this.props.id){
      this.setState({
        name: this.props.name,
        quantity: this.props.quantity,
        price: this.props.price
      });
    }
  }

  onDelete = () =>{
    this.props.deleteItem(this.props.id);
  }

  calulatePrice = () =>{

    const { price, quantity} = this.state
    if(price > 0 && quantity > 0){
      return price*quantity;
    }
    return 0;
  }

  render() {

    const showDeleteButton = (
      (this.state.name.length !== 0) && 
      (this.state.price) > 0 && 
      (this.state.quantity > 0) &&
       !this.props.itemAdd);

    return (
      <Grid container id="itemContainer">
        <Grid className="itemColumn" item xs={6}> 
          <TextField           
          variant="outlined" 
          className="itemTextField" 
          value={this.state.name}
          onChange={this.handleNameChange}
          onBlur={this.addItem}
          id="Name" 
          label="Name"/> 
        </Grid>
        <Grid
          id="priceColumn"
          className="itemColumn" item xs={2}> 
          <TextField 
          id="priceTextField"
          variant="outlined"
          className="itemTextField"
          value={this.state.price}
          onChange={this.handlePriceChange}
          onBlur={this.addItem}
          min="0"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          /> 
         </Grid>
        <Grid className="itemColumn" item xs={2}> 
          <TextField
            id="itemQty" 
            onChange={this.handleQtyChange}
            onBlur={this.addItem}
            variant="outlined"
            value={this.state.quantity}
            min="0"
            className="itemTextField"
            type="number" 
            label="Qty"/> 
        </Grid>
        <Grid className="itemColumn" item xs={1}>  
          ${this.calulatePrice()}
        </Grid>
        <Grid id="deleteContainer" className="itemColumn" item xs={1}>  
          {showDeleteButton && 
          <IconButton onClick={this.onDelete} id="iconButton" className="deleteIcon" aria-label="Delete">
                  <DeleteIcon />
            </IconButton>}
        </Grid>
    </Grid>
    );
  }
}

Item.defaultProps = {
  name:'',
  price:0,
  quantity:0
}

const mapActionsToProps = {
  addItem:add_item,
  deleteItem: delete_item,
  editItem: edit_item
}

export default connect(()=>{ return {}; }, mapActionsToProps)(Item);
