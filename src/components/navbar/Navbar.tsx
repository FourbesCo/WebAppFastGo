
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { AuthModal } from "@/components/auth/AuthModal";
import { Container } from "@/components/ui/container";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  ShoppingCart,
  User,
  ShieldCheck,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

export function Navbar() {
  const { user, status, logout } = useAuth();
  const { totalItems } = useCart();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const navigate = useNavigate();

  const isAdmin = user?.role === "admin";

  return (
    <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[250px] sm:w-[300px]">
                <div className="flex flex-col gap-4 py-4">
                  <Link
                    to="/"
                    className="text-lg font-semibold hover:text-primary"
                  >
                    Início
                  </Link>
                  <Link
                    to="/menu"
                    className="text-lg font-semibold hover:text-primary"
                  >
                    Menu
                  </Link>
                  {user && (
                    <>
                      <Link
                        to="/orders"
                        className="text-lg font-semibold hover:text-primary"
                      >
                        Meus Pedidos
                      </Link>
                      <Link
                        to="/profile"
                        className="text-lg font-semibold hover:text-primary"
                      >
                        Meu Perfil
                      </Link>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          className="text-lg font-semibold text-primary"
                        >
                          <ShieldCheck className="inline-block mr-2 h-5 w-5" />
                          Área do Admin
                        </Link>
                      )}
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>

            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">FastGo</span>
            </Link>

            <nav className="ml-8 hidden md:flex items-center space-x-4">
              <Link
                to="/"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Início
              </Link>
              <Link
                to="/menu"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Menu
              </Link>
              {user && (
                <>
                  <Link
                    to="/orders"
                    className="text-sm font-medium hover:text-primary transition-colors"
                  >
                    Meus Pedidos
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="text-sm font-medium text-indigo-500 hover:text-indigo-700 transition-colors flex items-center"
                    >
                      <ShieldCheck className="mr-1 h-4 w-4" />
                      Admin
                    </Link>
                  )}
                </>
              )}
            </nav>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              aria-label="Cart"
              onClick={() => navigate("/cart")}
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0"
                >
                  {totalItems}
                </Badge>
              )}
            </Button>

            {status === "authenticated" && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-1"
                    aria-label="User menu"
                  >
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline-block max-w-[100px] truncate">
                      {user.name}
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <User className="mr-2 h-4 w-4" />
                    Perfil
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/orders")}>
                    <Bell className="mr-2 h-4 w-4" />
                    Meus Pedidos
                  </DropdownMenuItem>
                  {isAdmin && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => navigate("/admin")}>
                        <ShieldCheck className="mr-2 h-4 w-4" />
                        Área do Admin
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={async () => {
                      await logout();
                      navigate("/");
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-gradient-to-r from-indigo-600 to-pink-500 hover:from-indigo-700 hover:to-pink-600 text-white"
              >
                Entrar
              </Button>
            )}
          </div>
        </div>
      </Container>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}
