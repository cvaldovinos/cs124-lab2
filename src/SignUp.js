import {useSignInWithEmailAndPassword, useCreateUserWithEmailAndPassword} from "react-firebase-hooks/auth";
import {useState} from 'react';

function SignUp(props) {
    const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(props.auth)
    const [email, setEmail] = useState("");
    const [passw, setPassword] = useState("");
    const [signUp, setSignUp] = useState(false);
    return (
        <div>
            <button id={"signUp"} onClick={() => {props.handleShowUserField("signUp")}}>Sign Up</button>
            {props.showUserField === "signUp" &&
                <div>
                    <input id="email" type={"text"} placeholder={"email"} onChange={(e) => setEmail(e.target.value)}></input>
                    <input id="password" type={"password"} placeholder={"password"} onChange={(e) => setPassword(e.target.value)}></input>
                    <button onClick={() => {
                        createUserWithEmailAndPassword(email, passw).catch(error => console.log(error))
                    }}>Sign Up
                    </button>
                </div>
            }
        </div>
    )
}
export default SignUp;