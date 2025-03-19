
import { useState, useEffect } from "react";
import { Container } from "@/components/ui/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { getOrders } from "@/lib/api";
import { Order } from "@/types";
import { 
  Clock, 
  Package2, 
  CheckCircle2, 
  ClipboardList,
  AlertCircle 
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        // Pass the user ID to get user orders
        const fetchedOrders = await getOrders("user1");
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        toast.error("Erro ao carregar seus pedidos");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "confirmed":
        return <Package2 className="h-5 w-5 text-blue-500" />;
      case "ready":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "completed":
        return <CheckCircle2 className="h-5 w-5 text-green-700" />;
      case "cancelled":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <ClipboardList className="h-5 w-5" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pendente";
      case "confirmed":
        return "Confirmado";
      case "ready":
        return "Pronto para retirada";
      case "completed":
        return "Finalizado";
      case "cancelled":
        return "Cancelado";
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "confirmed":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "ready":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "completed":
        return "bg-slate-100 text-slate-800 hover:bg-slate-200";
      case "cancelled":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  if (isLoading) {
    return (
      <Container className="py-12 min-h-screen">
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse text-lg text-muted-foreground">
            Carregando seus pedidos...
          </div>
        </div>
      </Container>
    );
  }

  return (
    <div className="min-h-screen py-8 animate-fade-in">
      <Container className="max-w-5xl">
        <h1 className="text-3xl font-bold mb-8">Meus Pedidos</h1>

        {orders.length === 0 ? (
          <div className="text-center py-16 space-y-6">
            <ClipboardList className="mx-auto h-12 w-12 text-muted-foreground" />
            <h2 className="text-xl font-semibold">Você não tem pedidos ainda</h2>
            <p className="text-muted-foreground">
              Faça seu primeiro pedido agora
            </p>
            <Button onClick={() => window.location.href = "/restaurants"}>
              Ver Restaurantes
            </Button>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <Card key={order.id} className="neomorphic overflow-hidden">
                <CardHeader className="bg-secondary/30 pb-4">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge
                          className={`${getStatusColor(order.status)} font-medium`}
                        >
                          <span className="flex items-center gap-1">
                            {getStatusIcon(order.status)}
                            {getStatusText(order.status)}
                          </span>
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          Pedido #{order.id.slice(-8)}
                        </span>
                      </div>
                      <CardTitle className="text-lg">
                        {format(new Date(order.createdAt), "dd 'de' MMMM 'às' HH:mm", {
                          locale: ptBR,
                        })}
                      </CardTitle>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground mb-1">
                        Retirada estimada:
                      </p>
                      <p className="font-semibold">
                        {order.estimatedPickupTime
                          ? format(
                              new Date(order.estimatedPickupTime),
                              "HH:mm",
                              { locale: ptBR }
                            )
                          : "Não definido"}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      {order.items.map((item, itemIndex) => (
                        <div
                          key={`${order.id}-item-${itemIndex}`}
                          className="flex justify-between"
                        >
                          <div>
                            <span>
                              {item.quantity}x {item.menuItem.name}
                            </span>
                            {item.specialInstructions && (
                              <p className="text-xs text-muted-foreground italic">
                                {item.specialInstructions}
                              </p>
                            )}
                          </div>
                          <span>R$ {item.totalPrice.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    {order.specialInstructions && (
                      <div className="bg-secondary/30 p-3 rounded-md text-sm">
                        <p className="font-semibold mb-1">Instruções:</p>
                        <p className="text-muted-foreground">
                          {order.specialInstructions}
                        </p>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {order.items.reduce(
                            (total, item) => total + item.quantity,
                            0
                          )}{" "}
                          itens
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Pagamento: {order.paymentMethod === "credit_card"
                            ? "Cartão de Crédito"
                            : order.paymentMethod === "debit_card"
                            ? "Cartão de Débito"
                            : order.paymentMethod === "pix"
                            ? "Pix"
                            : "Dinheiro"}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Total</p>
                        <p className="text-xl font-bold">
                          R$ {order.totalAmount.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
