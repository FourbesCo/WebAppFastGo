
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { AuthModal } from "@/components/auth/AuthModal";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus, ShoppingCart, Trash } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function Cart() {
  const { items, isLoading, updateItem, subtotal, totalItems } = useCart();
  const { status } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Carrinho | PickupEats";
  }, []);

  const handleQuantityChange = (index: number, delta: number) => {
    const item = items[index];
    const newQuantity = item.quantity + delta;
    updateItem({
      menuItem: item.menuItem,
      quantity: newQuantity,
      selectedOptions: item.selectedOptions,
      specialInstructions: item.specialInstructions
    });
  };

  const handleCheckout = () => {
    if (status === "authenticated") {
      navigate("/checkout");
    } else {
      setIsAuthModalOpen(true);
    }
  };

  if (isLoading) {
    return (
      <Container className="py-12 min-h-screen">
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse text-lg text-muted-foreground">
            Carregando seu carrinho...
          </div>
        </div>
      </Container>
    );
  }

  return (
    <div className="min-h-screen py-8 animate-fade-in">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Seu Carrinho</h1>

          {items.length === 0 ? (
            <div className="text-center py-16 space-y-6">
              <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground" />
              <h2 className="text-xl font-semibold">Seu carrinho está vazio</h2>
              <p className="text-muted-foreground">
                Adicione itens do cardápio para fazer seu pedido
              </p>
              <Button onClick={() => navigate("/menu")}>Ver Cardápio</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {items.map((item, index) => (
                  <Card
                    key={`${item.menuItem.id}-${index}`}
                    className="overflow-hidden neomorphic"
                  >
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row">
                        <div className="w-full sm:w-32 h-24 sm:h-auto">
                          <img
                            src={item.menuItem.image}
                            alt={item.menuItem.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4 flex-grow">
                          <div className="flex justify-between">
                            <h3 className="font-semibold">{item.menuItem.name}</h3>
                            <span className="font-semibold">
                              R$ {item.totalPrice.toFixed(2)}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {item.menuItem.description}
                          </p>
                          {item.specialInstructions && (
                            <p className="text-sm mt-2 italic">
                              Instruções: {item.specialInstructions}
                            </p>
                          )}
                          <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleQuantityChange(index, -1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="mx-3 w-6 text-center">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleQuantityChange(index, 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              onClick={() => updateItem({
                                menuItem: item.menuItem,
                                quantity: 0
                              })}
                            >
                              <Trash className="h-4 w-4 mr-2" />
                              Remover
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="lg:col-span-1">
                <Card className="neomorphic">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-lg font-semibold mb-4">Resumo do Pedido</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Subtotal ({totalItems} {totalItems === 1 ? "item" : "itens"})
                        </span>
                        <span>R$ {subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Taxa de serviço</span>
                        <span>R$ 0.00</span>
                      </div>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>R$ {subtotal.toFixed(2)}</span>
                    </div>
                    <Button
                      className="w-full mt-4"
                      size="lg"
                      onClick={handleCheckout}
                      disabled={items.length === 0}
                    >
                      Finalizar Pedido
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => navigate("/menu")}
                    >
                      Continuar Comprando
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </Container>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}
