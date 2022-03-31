const deleteProduct = (productID) => {
    return {
        type: 'DELETE_PRODUCT',
        payload: productID
    }
}

export default deleteProduct;