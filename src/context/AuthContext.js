import { createContext, useContext, useEffect, useState } from "react";
import { signOut, GoogleAuthProvider ,signInWithPopup} from 'firebase/auth'
import { auth } from "../firebase_config";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);

    const loginGoogle = () => {
        const googleProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleProvider);
    };

    const logout = () => {
        signOut(auth);
    }

    useEffect(() => {
        const unsuscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
        });
        return unsuscribe
    }, []);

    return(
        <AuthContext.Provider value={{
            loginGoogle,
            logout,
            currentUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext);