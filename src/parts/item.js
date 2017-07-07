import React, { Component } from 'react'
import '../css/list.css';

class Item extends Component {

  constructor(props) {
    super(props)
    this.state = {
      available: true
    }
    this.borrowItem = this.borrowItem.bind(this)
    this.returnItem = this.returnItem.bind(this)
    this.editItem = this.editItem.bind(this)
  }

  render() {
    var available
    if (this.props.staff === '' || this.props.staff === undefined || this.props.staff === null) {
      available = <button className="remove property property-button" onClick={this.borrowItem}>Borrow</button>
    } else {
      available = <button className="remove property property-button" onClick={this.returnItem}>Return</button>
    }
    return (
      <div className="Computer" key={this.props.id}>
        <div className="property">
          {this.props.id}
        </div>
        <div className="property property-staff">
          {this.props.staff}
        </div>
        <div className="property">
          {this.props.room_length}
        </div>
        <div className="property">
          {this.props.program_a}
        </div>
        <div className="property">
          {this.props.model_b}
        </div>
        <div className="property">
          {this.props.brand_c}
        </div>
        {available}
        <button className="remove property property-button" onClick={this.editItem}>Edit</button>
      </div>
    )
  }

  borrowItem() {
    const id = this.props.id
    const type = this.props.type
    this.props.popUp(id, 'borrow', type)
  }

  returnItem() {
    const id = this.props.id
    const type = this.props.type
    this.props.popUp(id, type)
  }

  editItem() {
    const id = this.props.id
    const type = this.props.type
    this.props.editItem(id, type)
  }

}
export default Item;
