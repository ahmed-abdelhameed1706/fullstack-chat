import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogout = () => {
  const { setAuthUser } = useAuthContext();
  const logout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setAuthUser(null);
    } catch (error: any) {
      toast.error(error.message);
      throw new Error(error.message);
    }
  };
  return logout;
};

export default useLogout;
