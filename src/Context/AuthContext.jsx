import { useEffect, useState, useContext, createContext } from "react";
import { supabase } from "../supabaseClient";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState(undefined);
  const [successMsg, setsuccessMsg] = useState("");

  //  Sign Up
  const signUpNewUser = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      console.error("There was a problem signing up:", error);
      return { success: false, error };
    }
    setsuccessMsg("Sign up successful!");
    console.log("Sign up successful:", data);
    return { success: true, data };
  };

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Initial session:", session);
      setSession(session);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth state changed. New session:", session);
      setSession(session);
    });

    // Cleanup subscription on unmount
    return () => subscription?.unsubscribe();
  }, []);

  // Sign In
  const signInUser = async ({ email, password }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        console.error("sign in error occured:", error);
        return { success: false, error: error.message };
      }
      setsuccessMsg("Sign in successful!");

      console.log("sign in success", data);
      return { success: true, data };
    } catch (error) {
      console.error("an error occured", error);
    }
  };

  // Sign Out
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Sign out error:", error);
        return { success: false, error };
      }
      setsuccessMsg("Sign out successful!");

      console.log("Successfully signed out");
      return { success: true };
    } catch (error) {
      console.error("An error occurred during sign out:", error);
      return { success: false, error };
    }
  };

  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      console.log("an error occured", error);
    } else {
      console.log("Signin with google success!");
      return { success: true, data };
    }
  };

  const signInWithGitHub = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });
    if (error) {
      console.log("an error occured!");
    } else {
      return { success: true, data };
    }
  };
  return (
    <AuthContext.Provider
      value={{
        session,
        successMsg,
        signUpNewUser,
        signInUser,
        signOut,
        signInWithGoogle,
        signInWithGitHub,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
