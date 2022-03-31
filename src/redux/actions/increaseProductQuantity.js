const increaseProductQuantity = (productID) => {
    return {
        type: 'INCREASE_PRODUCT_QUANTITY',
        payload: productID
    }
}

export default increaseProductQuantity;