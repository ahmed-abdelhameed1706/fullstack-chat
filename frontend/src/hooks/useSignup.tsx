import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

type SignUpType = {
  fullName: string;
  username: string;
  password: string;
  confirmPassword: string;
  gender: string;
};

const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signUp = async (inputs: SignUpType) => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setAuthUser(data);
    } catch (error: any) {
      toast.error(error.message);
      throw new Error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return { signUp, isLoading };
};

export default useSignup;
