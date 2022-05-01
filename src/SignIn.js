import {useSignInWithEmailAndPassword, useSignInWithGoogle, useSendPasswordResetEmail} from "react-firebase-hooks/auth";
import {Fragment, useState} from 'react';
import './SignIn.css'

function SignIn(props) {
    // const [signIn, setSignIn] = useState(false);
    const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(props.auth)
    const [signInWithGoogle] = useSignInWithGoogle(props.auth)
    const [sendPasswordResetEmail] = useSendPasswordResetEmail(props.auth)
    const [email, setEmail] = useState("");
    const [passw, setPassword] = useState("");

    return (
        <Fragment>
            <div>
                {props.showUserField !== "signIn" && <button id={"signIn"} onClick={() => {props.handleShowUserField("signIn")}}>Sign In</button>}
            </div>
            <div>
            {props.showUserField === "signIn" && <div id={"popup"}>
                <div>
                    <input id="email" type={"text"} placeholder={"email"} onChange={(e) => setEmail(e.target.value)}/>
                    <input id="password" type={"password"} placeholder={"password"} onChange={(e) => setPassword(e.target.value)}/>
                    <button onClick={() => signInWithEmailAndPassword(email, passw)}>Log in</button>
                </div>
                <div>
                    <button id={"forgotPass"} onClick={() => sendPasswordResetEmail(email)}>Forgot password?</button>
                </div>
                <div>
                    <button onClick={() => signInWithGoogle() }> <img id={"googleLogo"} alt={""} src={"https://aws1.discourse-cdn.com/auth0/optimized/3X/8/a/8a06490f525c8f65d4260204bc3bc7b0e1fb0ba7_2_500x500.png"}/> Log In With Google</button>
                </div>
            </div>
            }
            </div>
        </Fragment>
    )

}

export default SignIn