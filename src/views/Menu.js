import { useEffect, useState } from 'react';
// redux
import { useDispatch, useSelector } from 'react-redux'; 
import addProduct from '../redux/actions/addProduct';
import deleteProduct from '../redux/actions/deleteProduct';
import increaseProductQuantity from '../redux/actions/increaseProductQuantity';
import decreaseProductQuantity from '../redux/actions/decreaseProductQuantity';
import Nav from '../components/Nav';
// icons
//import CartModal from '../components/CartModal';
import CartIcon from '../components/CartIcon';
import addIcon from '../assets/graphics/add.svg';


export default function Menu() {

    const dispatch = useDispatch();
    const products = useSelector(state => state.products);
    const [menu, setMenus] = useState([]);
    const [numProductsInCart, setNumProductsInCart] = useState();

    useEffect(() => {
        const fetchmenu = async () => {
        let response = await fetch("https://my-json-server.typicode.com/zocom-christoffer-wallenberg/airbean/menu"
        );
         const data = await response.json();
         data.forEach((element) => {
            element.amount = 1;
        });
        console.log(data);
        setMenus(data);
    };
        
        // when we reload the page we want to check if there is something in our localStorage.
        // if there is, we want to add it to our redux.
        if (localStorage.getItem('myCart') !== null) {
            const myCart = JSON.parse(localStorage.getItem('myCart'));
            dispatch(addProduct(myCart));
        
            // we loop through our localStorage and we synchronize our menu state with the quantity from localStorage.
            for (let i = 0; i < myCart.length; i++) {
                for (let j = 0; j < menu.length; j++) {
                    if (myCart[i].id === menu[j].id) {
                        const localStorageQuanity = myCart[i].quantity;
                        menu[j].quantity = localStorageQuanity;
                    }
                }
            }
        }
        // eslint-disable-next-line
        fetchmenu();
    }, []);
    console.log(menu);

    useEffect(() => {
        // same use as above except that we now even listen to changes in our redux in order to sync our cart.
        const myCart = JSON.parse(localStorage.getItem('myCart'));
        if ((localStorage.getItem('myCart') !== null) && (myCart.length !== 0)) {
            for (let i = 0; i < myCart.length; i++) {
                for (let j = 0; j < menu.length; j++) {
                    if (myCart[i].id === menu[j].id) {
                        const localStorageQuanity = myCart[i].quantity;
                        menu[j].quantity = localStorageQuanity;
                    }
                }
            }
        } else {
            // here we make a deep copy of our menu array and we loop through our new array and assign quantity to 0.
            let menuArr = Object.assign([], menu);
            for (const obj of menuArr) {
                obj.quantity = 0;
            }
            setMenus(menuArr);
        }
        // eslint-disable-next-line
    }, [products])

    const handleClickedProduct = (id) => {
        let foundProduct = false;
        for (const obj of products) {
            if (obj.id === id) {
                foundProduct = true;
            }
        }
        if (foundProduct) {
            // If our product was found in our redux state, we decrease the quantity to 0 then we delete it.
            dispatch(decreaseProductQuantity(id));
            dispatch(deleteProduct(id));

            // we also delete it from our localStorage below.
            const getLocalCart = JSON.parse(localStorage.getItem('myCart'));
            const removedProductArr = JSON.stringify(getLocalCart.filter((obj) => obj.id !== id));
            localStorage.setItem('myCart', removedProductArr);

            // we check how many products are in the array and add this amount to our numProductsInCart
            setNumProductsInCart(JSON.parse(localStorage.getItem('myCart')).length);
        } else {
            // If our product was NOT found in our redux state, we add it then increase its quantity to 1.
            dispatch(addProduct(menu[id-1]));
            dispatch(increaseProductQuantity(id));

            // we also add it to localStorage and our cart amount to our numProductsInCart
            if (localStorage.getItem('myCart') === null) {
                localStorage.setItem('myCart', JSON.stringify([menu[id-1]]));
                setNumProductsInCart(JSON.parse(localStorage.getItem('myCart')).length);
            } else {
                localStorage.setItem('myCart', JSON.stringify([...JSON.parse(localStorage.getItem('myCart')), menu[id-1]]));
                setNumProductsInCart(JSON.parse(localStorage.getItem('myCart')).length);
            }
        }
    }

    return (
        <div className="menu-container">
            <header className="heading-cart-styling">
                <Nav />
                <div className="header-cart-icon-container">
                    <CartIcon numInCart={numProductsInCart} setNumInCart={setNumProductsInCart} />
                </div>
            </header>
            <h1 className="menu-heading">Meny</h1>
            <main className="menu-wrapper">
                {menu.map((menu) => (
                <section className="product-container" key={menu.id}>
                    <div className="add-to-cart-container">
                        <div onClick={() => handleClickedProduct(menu.id)} className="add-to-cart-btn">
                            {(menu.quantity !== 0) ? 
                                <p className="add-to-cart-btn-text remove-from-cart">-</p>
                            :
                                <img alt="add-icon-svg" src={addIcon} className="add-to-cart-btn-text" />
                            }
                        </div>
                    </div>
                    <div className="menu-list-container">
                        <div className="menu-list">
                            <p className="menu-list-title">{menu.title}</p>
                            <div className="menu-list-divider-container">
                                <hr className="menu-list-divider"/>
                            </div>
                            <p className="menu-list-price">{menu.price} kr</p>
                        </div>
                        <p className="menu-list-description">{menu.desc}</p>
                    </div>
                </section>
                ))}
            </main>
        </div>
    )
}   