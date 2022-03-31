const decreaseProductQuantity = (productID) => {
    return {
        type: 'DECREASE_PRODUCT_QUANTITY',
        payload: productID
    }
}

export default decreaseProductQuantity;