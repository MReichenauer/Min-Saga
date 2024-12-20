import { onAuthStateChanged, signInWithPopup, User, signOut } from "firebase/auth";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { auth, googleProvider } from "@services/firebase";
import { useLocation, useNavigate } from "react-router-dom";

type AuthContextType = {
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  user: User | null;
  userImg: string;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userImg, setUserImg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();
  const location = useLocation();

  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      setUser(res.user);
      navigate(location.state?.from || "/");
    } catch (error) {
      console.error("Error signing in with Google:", error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const profileImage = currentUser.photoURL;
        setUserImg(
          profileImage ||
            "https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo="
        );
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ signInWithGoogle, logout, user, userImg, loading }}>
      {loading ? <p>Loading...</p> : <>{children}</>}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
