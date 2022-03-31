import { useState, useEffect } from 'react';
import CartModal from './CartModal';
import cartIcon from '../assets/graphics/bag.svg';

export default function CartIcon({ numInCart, setNumInCart }) {

    const [displayCartModal, setDisplayCartModal] = useState(false);
    const [displayAmountIcon, setDisplayAmountIcon] = useState(false);
    const [amountInCart, setAmountInCart] = useState('');

    
    useEffect(() => {
        if ((numInCart !== undefined) && (numInCart !== 0)) {
            setDisplayAmountIcon(true);
            setAmountInCart(numInCart);
        } else if (numInCart === 0) {
            setDisplayAmountIcon(false);
            setAmountInCart(numInCart);


        } else if ((numInCart === undefined) && (JSON.parse(localStorage.getItem('myCart'))) !== null && (JSON.parse(localStorage.getItem('myCart')).length !== 0) ) {
            setDisplayAmountIcon(true);
            setAmountInCart(JSON.parse(localStorage.getItem('myCart')).length)
        }
    }, [numInCart])

    // logic for our toggle functionality for the modal
    const toggleModal = () => displayCartModal ? setDisplayCartModal(false) : setDisplayCartModal(true);
    
    return (
        <div>
            <div key={numInCart} className="cart-icon-wrapper" onClick={toggleModal}>
                {displayAmountIcon ? 
                    <p className="cart-icon-amount">{amountInCart}</p> : null
                }
                <div className="cart-icon-container">
                    <img alt="cart-icon-img" src={cartIcon} className="cart-icon"></img>
                </div>
            </div>
            { displayCartModal ? <CartModal setNumInCart={setNumInCart} /> : null }
        </div>
    )
}