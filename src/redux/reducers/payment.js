import {
    GET_PAYMENT_TOTAL_SUCCESS,
    GET_PAYMENT_TOTAL_FAIL,
    PAYMENT_SUCCESS,
    PAYMENT_FAIL,
    RESET_PAYMENT_INFO,
    SET_PAYMENT_LOADING,
    REMOVE_PAYMENT_LOADING,
    REMOVE_ITEM_SUCCESS
} from '../actions/types';

const initialState = {
    made_payment: false,
    original_price: 0.0,
    total_after_coupon: 0.0,
    total_amount: 0.0,
    total_compare_amount: 0.0,
    estimated_tax: 0.0,
    shipping_cost: 0.0,
    loading: false
};

export default function Payment(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case GET_PAYMENT_TOTAL_SUCCESS:
            return {
                ...state,
                original_price: payload.original_price,
                total_after_coupon: payload.total_after_coupon,
                total_amount: payload.total_amount,
                total_compare_amount: payload.total_compare_amount,
                estimated_tax: payload.estimated_tax,
                shipping_cost: payload.shipping_cost
            };
        case GET_PAYMENT_TOTAL_FAIL:
            return {
                ...state,
                original_price: 0.00,
                total_after_coupon: 0.00,
                total_amount: 0.00,
                total_compare_amount: 0.00,
                estimated_tax: 0.00,
                shipping_cost: 0.00
            };
        case REMOVE_ITEM_SUCCESS: {
            const itemPrice = parseFloat(payload.itemPrice);
            return {
                ...state,
                total_amount: isNaN(itemPrice) ? state.total_amount : state.total_amount - itemPrice,
            };
        }
        case PAYMENT_SUCCESS:
            return { ...state, made_payment: true };
        case PAYMENT_FAIL:
            return { ...state, made_payment: false };
        case SET_PAYMENT_LOADING:
            return { ...state, loading: true };
        case REMOVE_PAYMENT_LOADING:
            return { ...state, loading: false };
        case RESET_PAYMENT_INFO:
            return { ...state, made_payment: false };
        default:
            return state;
    }
}
