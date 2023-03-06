import { IonContent, IonPage } from '@ionic/react';
import './Tab1.css';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      {/*<IonHeader>*/}
      {/*  <IonToolbar>*/}
      {/*    <IonTitle>Tab 1</IonTitle>*/}
      {/*  </IonToolbar>*/}
      {/*</IonHeader>*/}
      <IonContent fullscreen  className='bgColor' >
        {/*<IonHeader collapse="condense">*/}
        {/*  <IonToolbar>*/}
        {/*    <IonTitle size="large">Tab 1</IonTitle>*/}
        {/*  </IonToolbar>*/}
        {/*</IonHeader>*/}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
