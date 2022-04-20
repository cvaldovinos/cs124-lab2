import {useSignInWithEmailAndPassword, useSignInWithGoogle, useSendPasswordResetEmail} from "react-firebase-hooks/auth";
import {useState} from 'react';

function SignIn(props) {
    const [signIn, setSignIn] = useState(false);
    const [signInWithEmailAndPassword, userEP, loadingEP, errorEP] = useSignInWithEmailAndPassword(props.auth)
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(props.auth)
    const [sendPasswordResetEmail, userPR, loadingPR, errorPR] = useSendPasswordResetEmail(props.auth)
    const [email, setEmail] = useState("");
    const [passw, setPassword] = useState("");

    return (
        <div>
            {/*<input id="email" type={"text"} onChange={(e) => setEmail(e.target.value)}></input>*/}
            {/*<input id="password" type={"password"} onChange={(e) => setPassword(e.target.value)}></input>*/}
            {/*<button onClick={() => signInWithEmailAndPassword(email, passw)}>Sign In</button>*/}
            <button onClick={() => signInWithGoogle() }>Sign In With Google</button>
        </div>
    )

}

export default SignIn