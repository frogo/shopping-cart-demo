import React, { createContext, useState, useEffect } from 'react';
import { IonBadge, IonContent, IonHeader, IonInfiniteScroll, IonList, IonItem, IonAvatar, IonLabel,IonTitle, IonToolbar,IonButtons, IonButton, IonModal } from '@ionic/react';
import './Goods.css';
import axios from 'axios';
import Cart from '../components/Cart';
// Types
export type CartItemType = {
  id: number;
  description: string;
  photos: [string];
  price: number;
  name: string;
  amount: number;
};

export const Context = createContext({
  cartItems: [{}],
  handleAddToCart: (clickedItem: CartItemType) => {},
  handleRemoveFromCart: (id: number) => {}
})
const Goods: React.FC = () => {
  const [items, setItems] = useState<string[]>([]);
  const url = 'https://staging.api.1m.app/api/merchants/merchandises?merchantUserName=wokcano_tustin'
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);
  const handleAddToCart = (clickedItem: CartItemType) => {
    console.log('Add to cart', clickedItem)
    setCartItems(prev => {
      // 1. Is the item already added in the cart?
      const isItemInCart = prev.find(item => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map(item =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      // First time the item is added
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };
  useEffect(() => {
    (async () => {
        // const newItems = [];
        let res = await axios.get(url)
        const newItems = res.data.merchandises
        console.log('ccccc',newItems)
        setItems([...items, ...newItems]);
        // eslint-disable-next-line react-hooks/exhaustive-deps

        })()
      }, []);

  return (
    <IonContent>
            {/* <IonButton expand="block" onClick={() => setIsOpen(true)}>
          View cart
        </IonButton> */}
        <IonItem onClick={() => setIsOpen(true)}>
        <IonLabel>View cart</IonLabel>
        <IonBadge color="danger">{getTotalItems(cartItems)}</IonBadge>
      </IonItem>
        <IonModal isOpen={isOpen}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Modal</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <Context.Provider value={{cartItems, handleAddToCart, handleRemoveFromCart}}>
                          <Cart />
            </Context.Provider>

          </IonContent>
        </IonModal>
      <IonList>
        {items.map((item:any, index) => (
          <IonItem key={item.merchantId + index}>
            <IonAvatar slot="start">
              <img className='goods' src={item.photos || ''} alt=''/>
            </IonAvatar>
            <IonLabel>{item.name}</IonLabel>
            <IonLabel> ${item.price}</IonLabel>
            <IonLabel onClick={() => handleAddToCart(item)}>Add to cart</IonLabel>
          </IonItem>
        ))}
      </IonList>
      <IonInfiniteScroll>
        <div className="infinite-scroll-content">
         
        </div>
      </IonInfiniteScroll>
    </IonContent>
  );
}
export default Goods;