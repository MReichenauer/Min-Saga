import { onAuthStateChanged, signInWithPopup, User, signOut } from "firebase/auth";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { auth, googleProvider } from "@services/firebase";
import { useNavigate } from "react-router-dom";

type AuthContextType = {
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const res = await signInWithPopup(auth, googleProvider);
      setUser(res.user);
      navigate("/");
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
    }
  };

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ signInWithGoogle, logout, user, loading }}>
      {loading ? <p>Loading...</p> : <>{children}</>}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
