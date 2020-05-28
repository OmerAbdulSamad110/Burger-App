import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

function start(state) {
    return updateObject(state, { loading: true });
}

function failed(state) {
    return updateObject(state, { loading: false });
}

function purchaseBurgerInit(state, action) {
    return updateObject(state, { purchased: false })
}
function purchaseBurgerSuccess(state, action) {
    return updateObject(
        state,
        {
            loading: false,
            purchased: true,
            orders: state.orders.concat(action.orderData)
        });
}

function fetchOrdersSuccess(state, action) {
    return updateObject(
        state,
        {
            loading: false,
            orders: action.orders
        });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_INIT:
            return purchaseBurgerInit(state, action);
        case actionTypes.PURCHASE_BURGER_START:
            return start(state);
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            return purchaseBurgerSuccess(state, action);
        case actionTypes.PURCHASE_BURGER_FAILED:
            return failed(state);
        case actionTypes.FETCH_ORDERS_START:
            return start(state);
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return fetchOrdersSuccess(state, action);
        case actionTypes.FETCH_ORDERS_FAILED:
            return failed(state);
        default:
            return state;
    }
}

export default reducer
