import ListView from "./ListView";
import HomeView from "./HomeView";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import {useState} from 'react';
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {useAuthState} from 'react-firebase-hooks/auth';
import {getAuth, signOut} from "firebase/auth";
import './App.css';

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
let collectionName = "cs124-lab3-fe950"; // collection for each list passed in from ListView

function App() {
    const auth = getAuth();
    const [user, loading, error] = useAuthState(auth);
    const [showUserField, setShowUserField] = useState("");

    function handleShowUserField(value) {
        if (value === showUserField){
            setShowUserField("")
        } else{
            setShowUserField(value);
        }

    }

    if (loading) {
        return (
            <div id={"loading"}> Loading... </div>
        )
    }
    if (user) {
        return (
            <div>
                <SignedInApp user={user} auth={auth}></SignedInApp>
            </div>
        )
    } else {
        return (
            <div id={"signInPage"}>
                <h1>Make your password your socail security number</h1>
                <SignIn auth={auth} showUserField={showUserField} handleShowUserField={handleShowUserField}></SignIn>
                <SignUp auth={auth} showUserField={showUserField} handleShowUserField={handleShowUserField}></SignUp>
                <p>© Christian and Chris. Do not steal this. We will sue you on Judge Judy</p>
            </div>
        )
    }
}

function SignedInApp(props) {
    const [listId, setListId] = useState(0);
    const [listView, setListView] = useState(false);
    const [title,setTitle] = useState("");

   function handleListView(text, newId) {
       setTitle(text);
       setListId(newId);
       setListView(!listView);
   }

   if(!listView){
        return (<HomeView onListView={handleListView}
                          db={db}
                          user={props.user}
                          auth={props.auth}
                          collection={collectionName}/>)
   } else {
        return (<ListView
            onListView={handleListView}
            title={title}
            listId={listId}
            db={db}
            user={props.user}
            collection={collectionName}/>)
   }
}

export default App;