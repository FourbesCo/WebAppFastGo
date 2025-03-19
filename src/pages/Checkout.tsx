import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import { createOrder, clearCart } from "@/lib/api";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function Checkout() {
  const { items, subtotal } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (items.length === 0) {
      toast.error("Seu carrinho está vazio");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const order = await createOrder(paymentMethod, specialInstructions);
      setOrderId(order.id);
      setIsSuccess(true);
      await clearCart();
      toast.success("Pedido realizado com sucesso!");
    } catch (error) {
      console.error("Erro ao finalizar pedido:", error);
      toast.error("Erro ao finalizar pedido");
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isSuccess) {
    return (
      <div className="min-h-screen py-8 animate-fade-in">
        <Container className="max-w-3xl">
          <Card className="border-2 border-green-100 dark:border-green-900">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-2xl sm:text-3xl">Pedido Confirmado!</CardTitle>
              <CardDescription className="text-lg">
                Seu pedido #{orderId?.slice(-8)} foi recebido pelo restaurante
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p>
                Você receberá uma notificação quando seu pedido estiver pronto para retirada.
              </p>
              <p className="font-medium">
                Obrigado por pedir pelo FastGo!
              </p>
            </CardContent>
            <CardFooter className="flex justify-center gap-4 flex-wrap">
              <Button 
                onClick={() => navigate("/orders")}
                className="bg-gradient-to-r from-indigo-600 to-pink-500 text-white hover:from-indigo-700 hover:to-pink-600"
              >
                Ver Meus Pedidos
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate("/")}
              >
                Voltar ao Início
              </Button>
            </CardFooter>
          </Card>
        </Container>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen py-8 animate-fade-in">
      <Container className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-8">Finalizar Pedido</h1>
        
        <div className="grid gap-8 md:grid-cols-5">
          <div className="md:col-span-3">
            <form onSubmit={handleSubmit}>
              <Card>
                <CardHeader>
                  <CardTitle>Método de Pagamento</CardTitle>
                  <CardDescription>
                    Selecione como deseja pagar seu pedido
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup 
                    value={paymentMethod} 
                    onValueChange={setPaymentMethod}
                    className="space-y-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="credit_card" id="credit_card" />
                      <Label htmlFor="credit_card">Cartão de Crédito</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="debit_card" id="debit_card" />
                      <Label htmlFor="debit_card">Cartão de Débito</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="pix" id="pix" />
                      <Label htmlFor="pix">Pix</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash">Dinheiro na Entrega</Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Instruções Especiais</CardTitle>
                  <CardDescription>
                    Alguma observação para o restaurante?
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Ex: Sem cebola, preparação especial, etc..."
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    rows={4}
                  />
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-gradient-to-r from-indigo-600 to-pink-500 text-white hover:from-indigo-700 hover:to-pink-600"
                    type="submit"
                    disabled={isLoading || items.length === 0}
                  >
                    {isLoading ? "Processando..." : "Confirmar Pedido"}
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </div>
          
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {items.length === 0 ? (
                    <p className="text-muted-foreground text-center py-6">
                      Seu carrinho está vazio
                    </p>
                  ) : (
                    <>
                      {items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>
                            {item.quantity}x {item.menuItem.name}
                          </span>
                          <span>R$ {item.totalPrice.toFixed(2)}</span>
                        </div>
                      ))}
                      
                      <Separator className="my-2" />
                      
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>R$ {subtotal.toFixed(2)}</span>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}
