
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Goods from '../components/Goods';
import './Tab2.css';

const Tab2: React.FC = () => {
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Goods</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Goods />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
