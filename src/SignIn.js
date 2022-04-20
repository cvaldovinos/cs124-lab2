import {useSignInWithEmailAndPassword, useSignInWithGoogle, useSendPasswordResetEmail} from "react-firebase-hooks/auth";
import {useState} from 'react';
import './SignIn.css'

function SignIn(props) {
    const [signIn, setSignIn] = useState(false);
    const [signInWithEmailAndPassword, userEP, loadingEP, errorEP] = useSignInWithEmailAndPassword(props.auth)
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(props.auth)
    const [sendPasswordResetEmail, userPR, loadingPR, errorPR] = useSendPasswordResetEmail(props.auth)
    const [email, setEmail] = useState("");
    const [passw, setPassword] = useState("");

    return (
        <div>
            <button id={"signIn"} onClick={() => {props.handleShowUserField("signIn")}}>Sign In</button>
            {props.showUserField === "signIn" && <div id={"popup"}>
                <input id="email" type={"text"} onChange={(e) => setEmail(e.target.value)}></input>
                <input id="password" type={"password"} onChange={(e) => setPassword(e.target.value)}></input>
                <button onClick={() => signInWithEmailAndPassword(email, passw)}>Log In</button>
                <button onClick={() => sendPasswordResetEmail(email)}>Forgot password?</button>
                <button onClick={() => signInWithGoogle() }> <img id={"googleLogo"} src={"https://aws1.discourse-cdn.com/auth0/optimized/3X/8/a/8a06490f525c8f65d4260204bc3bc7b0e1fb0ba7_2_500x500.png"}/> Log In With Google</button>
            </div>
            }
        </div>
    )

}

export default SignIn