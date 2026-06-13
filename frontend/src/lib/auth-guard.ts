import { auth } from "@/utils/auth";
import { redirect } from "next/navigation";

export async function checkAuth() {
  try {
    // This will check the session from the backend
    // Better-auth should handle this via cookies
    const session = await auth.api.getSession({
      headers: {
        cookie: "", // Cookies are automatically sent by the browser
      },
    });

    if (!session) {
      return null;
    }

    return session;
  } catch (error) {
    console.error("Auth check failed:", error);
    return null;
  }
}

export async function requireAuth() {
  const session = await checkAuth();
  
  if (!session) {
    redirect("/login");
  }

  return session;
}
