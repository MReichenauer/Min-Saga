import {
  onAuthStateChanged,
  signInWithPopup,
  User,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
} from "firebase/auth";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { auth, googleProvider } from "@services/firebase";
import useNavigateBack from "@hooks/helpers/useNavigateBack";
import FadeInOutLoader from "@components/fadeInOutLoader/FadeInOutLoader";

type AuthContextType = {
  signInWithGoogle: () => Promise<void>;
  registerWithEmail: (email: string, password: string) => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  user: User | null;
  userImg: string;
  loading: boolean;
  uid: string;
};

const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [uid, setUid] = useState<string>("");
  const [userImg, setUserImg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const navigateBack = useNavigateBack();

  const registerWithEmail = async (email: string, password: string) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(res.user);
      setUser(res.user);
      navigateBack();
    } catch (error) {
      console.error("Error creating account:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      setUser(res.user);
      navigateBack();
    } catch (error) {
      console.error("Error signing in with Email:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      console.log("Password reset email sent successfully to: ", email);
    } catch (error) {
      console.error("Error sending password reset email:", error);
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      setUser(res.user);
      navigateBack();
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
            "https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo=" // add default image
        );
        setUid(currentUser.uid);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        registerWithEmail,
        signInWithEmail,
        resetPassword,
        signInWithGoogle,
        logout,
        user,
        userImg,
        uid,
        loading,
      }}
    >
      {loading ? (
        <>
          <FadeInOutLoader loadingState="Laddar..." />{" "}
        </>
      ) : (
        <>{children}</>
      )}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
