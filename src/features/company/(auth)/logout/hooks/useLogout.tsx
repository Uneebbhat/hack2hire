"use client";

import { useRouter } from "next/navigation";
import { logout } from "../../services/auth-service";

function useLogout() {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return { handleLogout };
}

export default useLogout;
