import React, { useState, useEffect } from 'react';
// redux
import { useDispatch } from 'react-redux';
import increaseProductQuantity from '../redux/actions/increaseProductQuantity';
import decreaseProductQuantity from '../redux/actions/decreaseProductQuantity';
import deleteProduct from '../redux/actions/deleteProduct';
import increaseArrow from '../assets/graphics/arrow-up.svg';
import decreaseArrow from '../assets/graphics/arrow-down.svg';
// routing


// function that calculates the price and also checks the quantity and multiplies it with the price.
function calcTotalPrice(array) {
    if (array === null) return 0;
    let price = 0;
    for (const product of array) {
        price += product.price;
        price *= product.quantity;
    }
    return price;
}


function calcAmountInCart(myCart) {
    let amount = 0;
    for (const product of myCart) {
        amount += product.quantity;
    }
    return amount;
}

export default function CartModal({ setNumInCart }) {

    const [localData, setLocalData] = useState([]); // state for the data from our localStorage
    const [totalPrice, setTotalPrice] = useState('');
    const dispatch = useDispatch();
   // const history = useHistory();

    // on mounting we update our states.
    useEffect(() => {
        const myCart = JSON.parse(localStorage.getItem('myCart'));
        setLocalData(myCart);
        setTotalPrice(calcTotalPrice(myCart));
    }, [])

    
    const handleIncreaseQuantity = (id) => {
        for (const obj of localData) {
            if (obj.id === id) {
                obj.quantity++;
                dispatch(increaseProductQuantity(id));
            }
        }
        localStorage.setItem('myCart', JSON.stringify(localData));
        const myCart = JSON.parse(localStorage.getItem('myCart'));
        setLocalData(myCart);  
        setTotalPrice(calcTotalPrice(myCart));  
        setNumInCart(calcAmountInCart(myCart));
    }

    
    const handleDecreaseQuantity = (id) => {
        for (const obj of localData) {
            if ((obj.id === id) && (obj.quantity !== 1)) {
                obj.quantity--;
                dispatch(decreaseProductQuantity(id));
                localStorage.setItem('myCart', JSON.stringify(localData));
                const myCart = JSON.parse(localStorage.getItem('myCart'));
                setLocalData(myCart);  
                setTotalPrice(calcTotalPrice(myCart));
                setNumInCart(calcAmountInCart(myCart));
                
            // If quantity is 1 then we remove it from our array
            } else if ((obj.id === id) && (obj.quantity === 1)) {
                const index = localData.indexOf(obj);
                localData.splice(index, 1);
                dispatch(deleteProduct(id));
                localStorage.setItem('myCart', JSON.stringify(localData));
                const myCart = JSON.parse(localStorage.getItem('myCart'));
                setTotalPrice(calcTotalPrice(myCart));
                setNumInCart(calcAmountInCart(myCart));
            }
        }
    }

    return (
        <div className="modal-container">
            <h1 className="modal-heading">Din beställning</h1>
            <div>
                <div className="modal-products-container">
                    {((localData === null) || (localData === undefined)) ? null : 
                        <div>
                            {localData.map((data) => (
                                <div className="product-item" key={data.id}>
                                    <div className="product-menu-item">
                                        <div className="product-menu-item-container">
                                            <h3 className="product-item-title">{data.title}</h3>
                                            <div className="menu-list-divider-container">
                                                <hr className="menu-list-divider"/>
                                            </div>
                                        </div>
                                        <p className="product-item-price">{data.price} kr</p>
                                    </div>
                                    <div className="amount-arrows">
                                        <img src={increaseArrow} alt="arrow-up" className="increase-up-arrow" onClick={() => handleIncreaseQuantity(data.id)} />
                                        <p>{data.quantity}</p>
                                        <img src={decreaseArrow} alt="arrow-down" className="decrease-down-arrow" onClick={() => handleDecreaseQuantity(data.id)} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    } 
                </div>
                <div className="total-amount-container">
                    <h3 className="total-label">Total</h3>
                    <div className="menu-list-divider-container">
                        <hr className="menu-list-divider"/>
                    </div>
                    <p className="total-price">{totalPrice} kr</p>
                </div>
                <p className="tax-shipping-label">inkl moms + drönarleverans</p>
                <a href='/Status'><button className="btn" >Take my money!</button></a>
                
            </div>
        </div>
    )
}
