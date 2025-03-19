
import { User, AuthStatus } from "@/types";
import { getCurrentUser, login, logout, register, updateProfile } from "@/lib/api";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  status: AuthStatus;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: { name: string; email: string; password: string; role?: "user" | "restaurant_owner" }) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  updateLocation: (latitude: number, longitude: number) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<AuthStatus>("loading");

  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await getCurrentUser();
        setUser(user);
        setStatus(user ? "authenticated" : "unauthenticated");
        
        // Request geolocation if user exists and has no location
        if (user && !user.location) {
          requestGeolocation();
        }
      } catch (error) {
        console.error("Failed to load user:", error);
        setStatus("unauthenticated");
      }
    };

    loadUser();
  }, []);

  const requestGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          handleUpdateLocation(latitude, longitude);
        },
        (error) => {
          console.error("Geolocation error:", error);
          toast.error("Não foi possível obter sua localização");
        }
      );
    } else {
      toast.error("Geolocalização não suportada pelo seu navegador");
    }
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      setStatus("loading");
      const user = await login(email, password);
      setUser(user);
      setStatus("authenticated");
      
      // Request geolocation after login if no location
      if (!user.location) {
        requestGeolocation();
      }
      
      toast.success("Login bem-sucedido!");
    } catch (error) {
      setStatus("unauthenticated");
      toast.error("Falha no login. Verifique suas credenciais.");
      throw error;
    }
  };

  const handleRegister = async (userData: {
    name: string;
    email: string;
    password: string;
    role?: "user" | "restaurant_owner";
  }) => {
    try {
      setStatus("loading");
      const user = await register(userData);
      setUser(user);
      setStatus("authenticated");
      
      // Request geolocation after registration
      requestGeolocation();
      
      toast.success("Registro bem-sucedido!");
    } catch (error) {
      setStatus("unauthenticated");
      toast.error("Falha no registro.");
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setStatus("unauthenticated");
      toast.success("Logout realizado com sucesso!");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  const handleUpdateProfile = async (userData: Partial<User>) => {
    try {
      const updatedUser = await updateProfile(userData);
      setUser(updatedUser);
      toast.success("Perfil atualizado com sucesso!");
    } catch (error) {
      toast.error("Falha ao atualizar perfil.");
      throw error;
    }
  };

  const handleUpdateLocation = async (latitude: number, longitude: number) => {
    try {
      if (!user) return;
      
      const updatedUser = await updateProfile({
        location: { latitude, longitude }
      });
      
      setUser(updatedUser);
    } catch (error) {
      console.error("Failed to update location:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        status,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
        updateProfile: handleUpdateProfile,
        updateLocation: handleUpdateLocation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
