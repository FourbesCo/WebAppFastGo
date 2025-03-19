import { useState, useEffect } from "react";
import { Container } from "@/components/ui/container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Restaurant, MenuItem, Order } from "@/types";
import { getMyRestaurants, getRestaurantOrders, updateMenuItem, deleteMenuItem, updateOrderStatus } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { BarChart, LineChart, PieChart } from "@/components/ui/chart";
import { 
  BarChart3, 
  LineChart as LineChartIcon, 
  PieChart as PieChartIcon, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Edit, 
  Trash2, 
  Plus,
  RefreshCw,
  Store
} from "lucide-react";
import { toast } from "sonner";

export default function RestaurantDashboard() {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        setIsLoading(true);
        
        // Get owner's restaurants
        const ownerRestaurants = await getMyRestaurants(user?.id);
        setRestaurants(ownerRestaurants);
        
        if (ownerRestaurants.length > 0) {
          setSelectedRestaurant(ownerRestaurants[0]);
          
          // Get orders for the first restaurant
          const restaurantOrders = await getRestaurantOrders(ownerRestaurants[0].id);
          setOrders(restaurantOrders);
        }
      } catch (error) {
        console.error("Failed to fetch restaurant data:", error);
        toast.error("Erro ao carregar dados dos restaurantes");
      } finally {
        setIsLoading(false);
      }
    };
    
    if (user?.id) {
      fetchRestaurantData();
    }
  }, [user]);

  const handleRestaurantChange = async (restaurantId: string) => {
    const restaurant = restaurants.find(r => r.id === restaurantId);
    if (!restaurant) return;
    
    setSelectedRestaurant(restaurant);
    
    try {
      const restaurantOrders = await getRestaurantOrders(restaurantId);
      setOrders(restaurantOrders);
    } catch (error) {
      console.error("Failed to fetch restaurant orders:", error);
      toast.error("Erro ao carregar pedidos do restaurante");
    }
  };
  
  const handleUpdateOrderStatus = async (orderId: string, status: Order["status"]) => {
    try {
      await updateOrderStatus(orderId, status);
      
      // Update local state
      setOrders(prevOrders => prevOrders.map(order => 
        order.id === orderId ? { ...order, status } : order
      ));
      
      toast.success(`Status do pedido atualizado para: ${status}`);
    } catch (error) {
      console.error("Failed to update order status:", error);
      toast.error("Erro ao atualizar status do pedido");
    }
  };
  
  const handleRefreshOrders = async () => {
    if (!selectedRestaurant) return;
    
    try {
      const restaurantOrders = await getRestaurantOrders(selectedRestaurant.id);
      setOrders(restaurantOrders);
      toast.success("Pedidos atualizados");
    } catch (error) {
      console.error("Failed to refresh orders:", error);
      toast.error("Erro ao atualizar pedidos");
    }
  };
  
  // Calculate order statistics
  const pendingOrders = orders.filter(order => order.status === 'pending').length;
  const confirmedOrders = orders.filter(order => order.status === 'confirmed').length;
  const readyOrders = orders.filter(order => order.status === 'ready').length;
  const completedOrders = orders.filter(order => order.status === 'completed').length;
  const cancelledOrders = orders.filter(order => order.status === 'cancelled').length;
  
  // Calculate total revenue
  const totalRevenue = orders
    .filter(order => ['completed', 'ready'].includes(order.status))
    .reduce((total, order) => total + order.totalAmount, 0);
  
  // Most popular items
  const popularItems: Record<string, number> = {};
  orders.forEach(order => {
    order.items.forEach(item => {
      const itemId = item.menuItem.id;
      if (!popularItems[itemId]) {
        popularItems[itemId] = 0;
      }
      popularItems[itemId] += item.quantity;
    });
  });
  
  // Sort items by popularity
  const sortedPopularItems = Object.entries(popularItems)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="min-h-screen py-8 animate-fade-in bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <Container>
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
              Dashboard do Restaurante
            </h1>
            
            {restaurants.length > 1 && (
              <div className="mt-4 sm:mt-0 flex items-center">
                <Label htmlFor="restaurant-select" className="mr-2">
                  Selecionar Restaurante:
                </Label>
                <select
                  id="restaurant-select"
                  value={selectedRestaurant?.id || ""}
                  onChange={(e) => handleRestaurantChange(e.target.value)}
                  className="border rounded p-2"
                >
                  {restaurants.map((restaurant) => (
                    <option key={restaurant.id} value={restaurant.id}>
                      {restaurant.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="h-32 rounded-lg animate-pulse bg-muted" />
              ))}
            </div>
          ) : !selectedRestaurant ? (
            <div className="text-center py-12">
              <Store className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-2xl font-bold mb-2">Nenhum restaurante encontrado</h2>
              <p className="text-muted-foreground mb-6">
                Você ainda não possui restaurantes cadastrados.
              </p>
              <Button>
                Cadastrar Meu Restaurante
              </Button>
            </div>
          ) : (
            <>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 md:grid-cols-4 w-full">
                  <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                  <TabsTrigger value="orders">Pedidos</TabsTrigger>
                  <TabsTrigger value="menu">Cardápio</TabsTrigger>
                  <TabsTrigger value="settings">Configurações</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-medium">Total de Vendas</CardTitle>
                        <CardDescription>Valor total de pedidos completados</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">R$ {totalRevenue.toFixed(2)}</div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-medium">Pedidos Ativos</CardTitle>
                        <CardDescription>Pedidos pendentes e confirmados</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{pendingOrders + confirmedOrders}</div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-medium">Pedidos Concluídos</CardTitle>
                        <CardDescription>Total de pedidos finalizados</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{completedOrders}</div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <BarChart3 className="mr-2 h-5 w-5" />
                          Status dos Pedidos
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <PieChart
                          data={[
                            { name: 'Pendentes', value: pendingOrders, color: '#f59e0b' },
                            { name: 'Confirmados', value: confirmedOrders, color: '#3b82f6' },
                            { name: 'Prontos', value: readyOrders, color: '#10b981' },
                            { name: 'Concluídos', value: completedOrders, color: '#6366f1' },
                            { name: 'Cancelados', value: cancelledOrders, color: '#ef4444' },
                          ]}
                        />
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <BarChart3 className="mr-2 h-5 w-5" />
                          Itens Mais Vendidos
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {sortedPopularItems.length > 0 ? (
                            sortedPopularItems.map(([itemId, quantity]) => {
                              const item = orders.flatMap(o => o.items).find(i => i.menuItem.id === itemId)?.menuItem;
                              return item ? (
                                <div key={itemId} className="flex justify-between items-center">
                                  <span className="font-medium truncate">{item.name}</span>
                                  <Badge>{quantity} vendidos</Badge>
                                </div>
                              ) : null;
                            })
                          ) : (
                            <p className="text-center text-muted-foreground">
                              Nenhum item vendido ainda
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="orders" className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">Pedidos Recentes</h2>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleRefreshOrders}
                      className="flex items-center"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Atualizar
                    </Button>
                  </div>
                  
                  {orders.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-lg text-muted-foreground">
                        Nenhum pedido encontrado
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID do Pedido</TableHead>
                            <TableHead>Data</TableHead>
                            <TableHead>Itens</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Ações</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {orders.map((order) => (
                            <TableRow key={order.id}>
                              <TableCell className="font-medium">
                                {order.id.substring(0, 8)}...
                              </TableCell>
                              <TableCell>
                                {new Date(order.createdAt).toLocaleString('pt-BR')}
                              </TableCell>
                              <TableCell>
                                {order.items.reduce((total, item) => total + item.quantity, 0)} itens
                              </TableCell>
                              <TableCell>
                                R$ {order.totalAmount.toFixed(2)}
                              </TableCell>
                              <TableCell>
                                <Badge
                                  className={
                                    order.status === 'pending' ? 'bg-yellow-500' :
                                    order.status === 'confirmed' ? 'bg-blue-500' :
                                    order.status === 'ready' ? 'bg-green-500' :
                                    order.status === 'completed' ? 'bg-indigo-500' :
                                    'bg-red-500'
                                  }
                                >
                                  {order.status === 'pending' ? 'Pendente' :
                                   order.status === 'confirmed' ? 'Confirmado' :
                                   order.status === 'ready' ? 'Pronto' :
                                   order.status === 'completed' ? 'Concluído' :
                                   'Cancelado'}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  {order.status === 'pending' && (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="text-blue-600 border-blue-200"
                                      onClick={() => handleUpdateOrderStatus(order.id, 'confirmed')}
                                    >
                                      Confirmar
                                    </Button>
                                  )}
                                  
                                  {order.status === 'confirmed' && (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="text-green-600 border-green-200"
                                      onClick={() => handleUpdateOrderStatus(order.id, 'ready')}
                                    >
                                      Pronto
                                    </Button>
                                  )}
                                  
                                  {order.status === 'ready' && (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="text-indigo-600 border-indigo-200"
                                      onClick={() => handleUpdateOrderStatus(order.id, 'completed')}
                                    >
                                      Concluir
                                    </Button>
                                  )}
                                  
                                  {['pending', 'confirmed'].includes(order.status) && (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="text-red-600 border-red-200"
                                      onClick={() => handleUpdateOrderStatus(order.id, 'cancelled')}
                                    >
                                      Cancelar
                                    </Button>
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="menu" className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">Gerenciar Cardápio</h2>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar Item
                    </Button>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                    <p className="text-center text-muted-foreground py-4">
                      Aqui você poderá gerenciar os itens do cardápio do seu restaurante.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                      {/* Menu item cards would go here */}
                      <Card className="border-dashed border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center h-48 cursor-pointer hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
                        <div className="text-center p-6">
                          <Plus className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="font-medium">Adicionar Novo Item</p>
                        </div>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="settings" className="space-y-6">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                    <h2 className="text-xl font-bold mb-6">Configurações do Restaurante</h2>
                    
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="restaurant-name">Nome do Restaurante</Label>
                          <Input 
                            id="restaurant-name" 
                            defaultValue={selectedRestaurant.name}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="restaurant-phone">Telefone</Label>
                          <Input 
                            id="restaurant-phone" 
                            defaultValue={selectedRestaurant.phone}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="restaurant-email">Email</Label>
                          <Input 
                            id="restaurant-email" 
                            type="email"
                            defaultValue={selectedRestaurant.email || ""}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="restaurant-address">Endereço</Label>
                          <Input 
                            id="restaurant-address" 
                            defaultValue={selectedRestaurant.address}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="restaurant-description">Descrição</Label>
                        <Textarea 
                          id="restaurant-description" 
                          defaultValue={selectedRestaurant.description}
                          rows={4}
                        />
                      </div>
                      
                      <Button className="w-full sm:w-auto">
                        Salvar Alterações
                      </Button>
                    </form>
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </Container>
    </div>
  );
}
