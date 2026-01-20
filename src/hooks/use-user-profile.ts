import { useState, useEffect } from "react";
import { api } from "@/lib/api";

export function useUserProfile() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await api.getCurrentUser();
        if (userData && userData.email) {
          setUser({
            name:
              userData.firstName && userData.lastName
                ? `${userData.firstName} ${userData.lastName}`
                : userData.email.split("@")[0],
            email: userData.email,
          });
        } else {
          setUser({ name: "Guest User", email: "" });
        }
      } catch (e) {
        setUser({ name: "Guest User", email: "" });
      }
    };
    fetchUser();
  }, []);

  return {
    user,
  };
}
