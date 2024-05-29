export const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_PRODUCTS":
            return { ...state, products: action.payload }
        case "ADD_TO_CART":
            return { ...state, cart: [...state.cart, {...action.payload}] }
        case "REMOVE_FROM_CART":
            return { ...state, cart: state.cart.filter((item) => {
                console.log('item.id',item.id,'action id', action.payload.product_id)
                item.id !== action.payload.product_id
            })}
        default:
            break;
    }
}