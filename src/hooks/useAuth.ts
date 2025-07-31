export const useAuth = () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const isLoggedIn = !!localStorage.getItem("accessToken");
  
    const logout = () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      window.location.href = "/login";
    };
  
    return { user, isLoggedIn, logout };
  };
  