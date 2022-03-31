let initialState = {
    products: []
}

const menuReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'ADD_PRODUCT':
            const concatedArr = state.products.concat(action.payload);
            return {
                products: concatedArr
            }
        case 'DELETE_PRODUCT':
            const newArray = state.products.filter((obj) => obj.id !== action.payload);
            return {
                products: newArray
            }
        case 'INCREASE_PRODUCT_QUANTITY':
            const productToIncrease = state.products.filter((obj) => obj.id === action.payload);
            productToIncrease[0].quantity++;
            return {
                products: state.products
            }
        case 'DECREASE_PRODUCT_QUANTITY':
            const productToDecrease = state.products.filter((obj) => obj.id === action.payload);
            productToDecrease[0].quantity--;
            return {
                products: state.products
            }
        default:
            return state;
    }
}

export default menuReducer;