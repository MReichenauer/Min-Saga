import { onAuthStateChanged, signInWithPopup, User, signOut } from "firebase/auth";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { auth, googleProvider } from "@services/firebase";
import { useLocation, useNavigate } from "react-router-dom";

type AuthContextType = {
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
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
      console.log("currentUser", currentUser);
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  console.log("user", user);
  return (
    <AuthContext.Provider value={{ signInWithGoogle, logout, user, loading }}>
      {loading ? <p>Loading...</p> : <>{children}</>}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
