import { actionTypes } from "../actions";
import _ from "lodash";

const shoppingCartListReducer = (shoppingCartList = [], action) => {
  let item = action.payload;
  let resultArr = [];
  switch (action.type) {
    case actionTypes.addToShoppingCartList:
      let flag = false;
      resultArr = shoppingCartList.map(orderItem => {
        if (_.isEqual(orderItem.item, item)) {
          flag = true;
          return { ...orderItem, quantity: orderItem.quantity + 1 };
        } else {
          return orderItem;
        }
      });

      if (!flag) {
        resultArr = [...shoppingCartList, { item: item, quantity: 1 }];
      }
      return resultArr;

    case actionTypes.decreaseFromShoppingCartList:
      const arr = shoppingCartList.map(orderItem => {
        if (_.isEqual(orderItem.item, item)) {
          return { ...orderItem, quantity: orderItem.quantity - 1 };
        } else {
          return orderItem;
        }
      });

      resultArr = arr.filter(ele => ele.quantity > 0);

      return resultArr;

    case actionTypes.increaseOrderItem:
      resultArr = shoppingCartList.map(orderItem => {
        if (_.isEqual(orderItem, item)) {
          return { ...orderItem, quantity: orderItem.quantity + 1 };
        } else {
          return orderItem;
        }
      });
      return resultArr;

    case actionTypes.decreaseOrderItem:
      const temp_arr = shoppingCartList.map(orderItem => {
        if (_.isEqual(orderItem, item)) {
          return { ...orderItem, quantity: orderItem.quantity - 1 };
        } else {
          return orderItem;
        }
      });

      resultArr = temp_arr.filter(ele => ele.quantity > 0);

      return resultArr;

    default:
      return shoppingCartList;
  }
};

export default shoppingCartListReducer;