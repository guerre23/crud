import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import cartProduct from "react-router-dom";
import { setCartProductsThunk } from "../components/CartProduct";
import { postCheckout } from "../services";

const Cart = () => {

    const dispatch =  useDispatch();
    const cartValues = useSelector((state) => state.cart);
    const navigate = useNavigate()

    const [total, setTotal] = useState(0)
    const [confirmCheckout, setConfirmCheckout] = useState(false)

    useEffect(() => {
        dispatch(setConfirmCheckout());
    }, [dispatch]);

    useEffect(() => {
        let amount = 0;
        cartValues.forEach(item => amount += item.product.price * item.quantity);
        setTotal(amount)
    }, [cartValues])

    useEffect(() => {
        if(confirmCheckout){
            postCheckout()
              .then(() => {                 
                setConfirmCheckout(false)
                navigate('/cart/success')
              })
        }
    }, [confirmCheckout, navigate])

    const list = cartValues.map((item) => {
        return <cartProduct key={item.id} prodObj={item} />;
    });

    return(
        <div>
            <h1>cart</h1>
            <button onClick={() => setConfirmCheckout(true)} >Ckeckout</button>
            {total}
            {list}
        </div>
    )
}

export default Cart;