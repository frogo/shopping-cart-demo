import React, { useContext } from "react"
import {IonButton, IonThumbnail} from "@ionic/react";
// import { CartItemType } from './Goods';
import { Context } from './Goods'
import './Cart.css'
const Cart: React.FC = () => {
  const { cartItems, handleAddToCart, handleRemoveFromCart }  = useContext(Context)
  const calculateTotal = (items: any) =>
    items.reduce((ack: number, item:any) => ack + item.amount * item.price, 0);

  return (
   <div>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? <p>No items in cart.</p> : null}
      {cartItems.map((item:any) => (
          <div>
          <div>
            <h3>{item.name}</h3>
            <div className='information'>
              <p>Price: ${item.price}</p>
              <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
            </div>
            <div className='buttons'>
              <IonButton
                size='small'
                onClick={() => handleRemoveFromCart(item.id)}
              >
                -
              </IonButton>
              <p>{item.amount}</p>
              <IonButton
                size='small'
                onClick={() => handleAddToCart(item)}
              >
                +
              </IonButton>
            </div>
          </div>
          <IonThumbnail>
        <img src={item.photos[0]||''} alt={item.name} />
      </IonThumbnail>
        </div>
      ))}
      <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
    </div>
  );
};

export default Cart;
