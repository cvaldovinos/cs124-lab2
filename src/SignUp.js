import {useSignInWithEmailAndPassword, useCreateUserWithEmailAndPassword} from "react-firebase-hooks/auth";
import {useState} from 'react';

function SignUp(props) {
    const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(props.auth)
    const [email, setEmail] = useState("");
    const [passw, setPassword] = useState("");
    return (
        <div>
            <div>
                <input id="email" type={"text"} onChange={(e) => setEmail(e.target.value)}></input>
                <input id="password" type={"password"} onChange={(e) => setPassword(e.target.value)}></input>
                <button onClick={() => {createUserWithEmailAndPassword(email, passw).catch(error => console.log(error))}}>Sign Up</button>
            </div>
        </div>
    )
}
export default SignUp;