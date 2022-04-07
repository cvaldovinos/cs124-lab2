import ListView from "./ListView";
import HomeView from "./HomeView";
import {useState} from 'react';
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDlfim9PmxloCfyskIlZd6xt2RxlWem-kw",
    authDomain: "cs124-lab3-fe950.firebaseapp.com",
    projectId: "cs124-lab3-fe950",
    storageBucket: "cs124-lab3-fe950.appspot.com",
    messagingSenderId: "331313494047",
    appId: "1:331313494047:web:cab4818df13adc8c9cfd2a"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);


function App() {
    const [listId, setListId] = useState(0);
    const [listView, setListView] = useState(true);
    const [title,setTitle] = useState("");
    let currentView= "listview";

   function handleListView(text) {
       setTitle(text);
       setListView(!listView);
   }

   function handleListId(newId) {
       setListId(newId);
   }

   // handleListView();

   if(listView){
        return (<HomeView onListView={handleListView}
                          db={db}
                          collection={collectionName}/>)
   } else{
        return (<ListView
            onListView={handleListView}
            title={title}
            db={db}
            collection={collectionName}/>)
   }
}

export default App;