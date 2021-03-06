import React from "react";
import { connect } from "react-redux";

import {
  renderNewShoppingCart,
  deleteOrder,
  continuePay
} from "../../_actions";
import { makeDate } from "../../_helpers";
import OrderItem from "./OrderItem";

/**
 * main function to render JSX
 * @param {React.Props} props
 * @returns {JSX} order card component
 */
class OrderCard extends React.Component {
  state = { isShowDetail: false };
  /**
   * render list of order items for certain order
   * @param {Array} list
   * @returns {String}
   */
  renderOrderList = list => {
    let summary = "";
    list.map(orderItem => {
      summary += `${orderItem.name} x ${orderItem.quantity}, `;
    });
    return summary;
  };
  /**
   * get order total quantity of items
   * @param {Array} list
   * @returns {Integer} total_quantity
   */
  getTotalQuantity = list => {
    let count = 0;
    list.map(orderItem => {
      count += orderItem.quantity;
    });

    return count;
  };
  /**
   *
   */
  renderOrderListTotal = list => {
    let total = 0;

    list.map(orderItem => {
      total += parseFloat(orderItem.total);
    });

    return (
      <span>
        <span className="title">{this.props.labels.order_card_total}:</span>
        <span className="value">$ {total.toFixed(2)}</span>
      </span>
    );
  };
  /**
   * get order status in text name
   * @param {Integer} order_status_id
   * @returns {JSX} name of status
   */
  getStatusName = id => {
    switch (parseInt(id)) {
      case 2:
        return (
          <span className="status pending">
            {this.props.labels.order_card_status_2}
          </span>
        );
      case 1:
        return (
          <span className="status saved" onClick={this.continueOrder}>
            {this.props.labels.order_card_status_1}
          </span>
        );
      case 3:
        return (
          <span className="status complete">
            {this.props.labels.order_card_status_3}
          </span>
        );
      case 6:
        return (
          <span className="status pending">
            {this.props.labels.order_card_status_6}
          </span>
        );

      default:
        break;
    }
  };

  /**
   * call action delete order by calling api
   * @param {void}
   * @returns {void}
   */

  deleteOrder = () => {
    this.props.deleteOrder(this.props.order);
  };
  /**
   * call aciont function to change state in redux store
   * @param {void}
   * @returns {Void} call action function
   */
  continueOrder = () => {
    this.props.renderNewShoppingCart(this.props.order);
  };
  /**
   * function - return JSX for order item card
   */
  renderOrderListDetail = list => {
    return (
      <div className="list">
        {list.map(orderItem => {
          return (
            <OrderItem
              key={`orderItem${orderItem.order_product_id}`}
              orderItem={orderItem}
            />
          );
        })}
      </div>
    );
  };

  renderOrderDetailFooter = ({ order_id, status_id }) => {
    if (parseInt(status_id) !== 1 && parseInt(status_id) !== 6) {
      return null;
    }
    if (parseInt(status_id) === 1) {
      return (
        <div className="footer">
          <button
            onClick={() => {
              this.props.deleteOrder(order_id);
              this.setState({ isShowDetail: false });
            }}
          >
            {this.props.labels.order_card_delete}
          </button>
        </div>
      );
    }
    if (parseInt(status_id) === 6) {
      return (
        <div className="footer">
          <button
            onClick={() => {
              this.props.continuePay(order_id);
              this.setState({ isShowDetail: false });
            }}
          >
            去支付
          </button>
        </div>
      );
    }
  };

  render() {
    const order = this.props.order;
    return (
      <div className="component-order-card">
        <div
          className="header"
          onClick={() =>
            this.setState({ isShowDetail: !this.state.isShowDetail })
          }
        >
          <span className="information-row">
            <span className="title">
              {this.props.labels.order_card_invoice_no}:
            </span>
            <span className="value">{order.invoice_no}</span>
          </span>
          <span className="toggle">
            <i className="material-icons">
              {this.state.isShowDetail
                ? `keyboard_arrow_down`
                : `keyboard_arrow_up`}
            </i>
          </span>
        </div>
        <div className="card-body">
          <div className="information">
            <span className="information-row">
              <span className="title">
                {this.props.labels.order_card_created_date}:{" "}
              </span>
              <span className="value"> {makeDate(order.create_date)}</span>
            </span>
            <span className="information-row">
              <span className="title">
                {this.props.labels.order_card_pick_address}:{" "}
              </span>
              <span className="value"> {order.store_name}</span>
            </span>
            <span className="information-row">
              <span className="title">
                {this.props.labels.order_card_pick_date}:{" "}
              </span>
              <span className="value"> {order.picked_date}</span>
            </span>
            <span className="information-row">
              <span className="title">
                {this.props.labels.order_card_pick_order_items}:{" "}
              </span>
              <span className="value">
                {this.renderOrderList(order.order_items)}
              </span>
            </span>
          </div>
          <div className="quantity-status">
            {this.getStatusName(order.status_id)}

            <span className="quantity">
              <span className="value">
                {this.getTotalQuantity(order.order_items)}
              </span>
              <span className="unit">{`items`}</span>
            </span>
          </div>
        </div>
        {this.state.isShowDetail ? (
          <div className="card-detail">
            <div className="header">
              {this.renderOrderListTotal(order.order_items)}
            </div>
            {this.renderOrderListDetail(order.order_items)}
            {this.renderOrderDetailFooter(order)}
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = ({ labels }) => {
  return { labels };
};

export default connect(
  mapStateToProps,
  { renderNewShoppingCart, deleteOrder, continuePay }
)(OrderCard);
