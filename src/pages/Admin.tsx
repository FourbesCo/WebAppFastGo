
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Container } from "@/components/ui/container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ShieldAlert, Package, ClipboardList, PlusCircle, Pencil, Trash2, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";
import { Category, MenuItem, Order } from "@/types";
import { getAllOrders, getCategories, getMenuItems, updateOrderStatus, addMenuItem, updateMenuItem, deleteMenuItem } from "@/lib/api";

export default function Admin() {
  const { user, status } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState({
    orders: true,
    products: true,
  });

  // Form states
  const [editingProduct, setEditingProduct] = useState<MenuItem | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [productForm, setProductForm] = useState<Partial<MenuItem>>({
    name: "",
    description: "",
    price: 0,
    image: "",
    categoryId: "",
    popular: false,
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    featured: false,
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      navigate("/");
      return;
    }

    if (user && user.role !== "admin") {
      toast.error("Acesso restrito apenas para administradores");
      navigate("/");
      return;
    }

    const fetchData = async () => {
      try {
        setLoading({ orders: true, products: true });
        
        // Fetch orders
        const ordersData = await getAllOrders();
        setOrders(ordersData);
        
        // Fetch products and categories
        const productsData = await getMenuItems();
        const categoriesData = await getCategories();
        
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching admin data:", error);
        toast.error("Erro ao carregar dados administrativos");
      } finally {
        setLoading({ orders: false, products: false });
      }
    };

    fetchData();
  }, [status, user, navigate]);

  const handleOrderStatusChange = async (orderId: string, newStatus: Order["status"]) => {
    try {
      const updatedOrder = await updateOrderStatus(orderId, newStatus);
      
      setOrders(orders.map(order => 
        order.id === orderId ? updatedOrder : order
      ));
      
      toast.success(`Status do pedido atualizado para: ${newStatus}`);
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Erro ao atualizar status do pedido");
    }
  };

  const handleProductFormChange = (field: string, value: any) => {
    setProductForm(prev => ({ ...prev, [field]: value }));
  };

  const handleAddProduct = async () => {
    try {
      if (!productForm.name || !productForm.description || !productForm.price || !productForm.image || !productForm.categoryId) {
        toast.error("Preencha todos os campos obrigatórios");
        return;
      }

      const newProduct = await addMenuItem(productForm as Omit<MenuItem, "id">);
      setProducts([...products, newProduct]);
      
      setProductForm({
        name: "",
        description: "",
        price: 0,
        image: "",
        categoryId: "",
        popular: false,
        vegetarian: false,
        vegan: false,
        glutenFree: false,
        featured: false,
      });
      
      setIsAddDialogOpen(false);
      toast.success("Produto adicionado com sucesso!");
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Erro ao adicionar produto");
    }
  };

  const handleEditProduct = (product: MenuItem) => {
    setEditingProduct(product);
    setProductForm(product);
  };

  const handleUpdateProduct = async () => {
    if (!editingProduct) return;
    
    try {
      const updatedProduct = await updateMenuItem(editingProduct.id, productForm);
      
      setProducts(products.map(product => 
        product.id === editingProduct.id ? updatedProduct : product
      ));
      
      setEditingProduct(null);
      setProductForm({
        name: "",
        description: "",
        price: 0,
        image: "",
        categoryId: "",
        popular: false,
        vegetarian: false,
        vegan: false,
        glutenFree: false,
        featured: false,
      });
      
      toast.success("Produto atualizado com sucesso!");
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Erro ao atualizar produto");
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteMenuItem(id);
      setProducts(products.filter(product => product.id !== id));
      toast.success("Produto removido com sucesso!");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Erro ao remover produto");
    }
  };

  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">Pendente</Badge>;
      case "confirmed":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">Confirmado</Badge>;
      case "ready":
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Pronto</Badge>;
      case "completed":
        return <Badge variant="outline" className="bg-indigo-100 text-indigo-800 border-indigo-300">Entregue</Badge>;
      case "cancelled":
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">Cancelado</Badge>;
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg text-muted-foreground">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <Container>
        <div className="flex flex-col space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <ShieldAlert className="h-6 w-6 text-indigo-600" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
              Painel Administrativo
            </h1>
          </div>

          <Card className="border border-indigo-100 dark:border-gray-800">
            <CardHeader className="bg-gradient-to-r from-indigo-600 to-pink-500 text-white rounded-t-lg">
              <CardTitle>Bem-vindo ao Painel do Admin</CardTitle>
              <CardDescription className="text-indigo-100">
                Gerencie pedidos, produtos e configurações do FastGo
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Tabs defaultValue="orders" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="orders" className="flex items-center gap-2">
                    <ClipboardList className="h-4 w-4" />
                    Pedidos
                  </TabsTrigger>
                  <TabsTrigger value="products" className="flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    Produtos
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="orders" className="space-y-4">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Pedido ID</TableHead>
                          <TableHead>Cliente</TableHead>
                          <TableHead>Data</TableHead>
                          <TableHead>Valor</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {loading.orders ? (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-10">
                              <div className="animate-pulse text-muted-foreground">
                                Carregando pedidos...
                              </div>
                            </TableCell>
                          </TableRow>
                        ) : orders.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-10">
                              <div className="text-muted-foreground">
                                Nenhum pedido encontrado
                              </div>
                            </TableCell>
                          </TableRow>
                        ) : (
                          orders.map((order) => (
                            <TableRow key={order.id}>
                              <TableCell className="font-medium">{order.id.substring(0, 10)}...</TableCell>
                              <TableCell>{order.userId}</TableCell>
                              <TableCell>{new Date(order.createdAt).toLocaleString()}</TableCell>
                              <TableCell>R$ {order.totalAmount.toFixed(2)}</TableCell>
                              <TableCell>{getStatusBadge(order.status)}</TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <select
                                    className="px-2 py-1 text-xs rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    value={order.status}
                                    onChange={(e) => handleOrderStatusChange(order.id, e.target.value as Order["status"])}
                                  >
                                    <option value="pending">Pendente</option>
                                    <option value="confirmed">Confirmado</option>
                                    <option value="ready">Pronto</option>
                                    <option value="completed">Entregue</option>
                                    <option value="cancelled">Cancelado</option>
                                  </select>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>

                <TabsContent value="products" className="space-y-4">
                  <div className="flex justify-end mb-4">
                    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="bg-gradient-to-r from-indigo-600 to-pink-500 text-white">
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Adicionar Produto
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                          <DialogTitle>Adicionar Novo Produto</DialogTitle>
                          <DialogDescription>
                            Preencha os detalhes do novo produto para adicionar ao cardápio.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="name">Nome*</Label>
                              <Input
                                id="name"
                                value={productForm.name}
                                onChange={(e) => handleProductFormChange("name", e.target.value)}
                                placeholder="Nome do produto"
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="price">Preço (R$)*</Label>
                              <Input
                                id="price"
                                type="number"
                                step="0.01"
                                value={productForm.price}
                                onChange={(e) => handleProductFormChange("price", parseFloat(e.target.value))}
                                placeholder="0.00"
                                required
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="category">Categoria*</Label>
                            <Select
                              value={productForm.categoryId}
                              onValueChange={(value) => handleProductFormChange("categoryId", value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione uma categoria" />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map((category) => (
                                  <SelectItem key={category.id} value={category.id}>
                                    {category.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="description">Descrição*</Label>
                            <Textarea
                              id="description"
                              value={productForm.description}
                              onChange={(e) => handleProductFormChange("description", e.target.value)}
                              placeholder="Descrição do produto"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="image">URL da Imagem*</Label>
                            <Input
                              id="image"
                              value={productForm.image}
                              onChange={(e) => handleProductFormChange("image", e.target.value)}
                              placeholder="https://exemplo.com/imagem.jpg"
                              required
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="popular"
                                checked={productForm.popular}
                                onCheckedChange={(checked) => handleProductFormChange("popular", checked)}
                              />
                              <Label htmlFor="popular">Popular</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="featured"
                                checked={productForm.featured}
                                onCheckedChange={(checked) => handleProductFormChange("featured", checked)}
                              />
                              <Label htmlFor="featured">Destaque</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="vegetarian"
                                checked={productForm.vegetarian}
                                onCheckedChange={(checked) => handleProductFormChange("vegetarian", checked)}
                              />
                              <Label htmlFor="vegetarian">Vegetariano</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="vegan"
                                checked={productForm.vegan}
                                onCheckedChange={(checked) => handleProductFormChange("vegan", checked)}
                              />
                              <Label htmlFor="vegan">Vegano</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="glutenFree"
                                checked={productForm.glutenFree}
                                onCheckedChange={(checked) => handleProductFormChange("glutenFree", checked)}
                              />
                              <Label htmlFor="glutenFree">Sem Glúten</Label>
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancelar</Button>
                          <Button 
                            onClick={handleAddProduct}
                            className="bg-gradient-to-r from-indigo-600 to-pink-500 text-white"
                          >
                            Adicionar Produto
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Imagem</TableHead>
                          <TableHead>Nome</TableHead>
                          <TableHead>Categoria</TableHead>
                          <TableHead>Preço</TableHead>
                          <TableHead>Atributos</TableHead>
                          <TableHead>Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {loading.products ? (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-10">
                              <div className="animate-pulse text-muted-foreground">
                                Carregando produtos...
                              </div>
                            </TableCell>
                          </TableRow>
                        ) : products.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-10">
                              <div className="text-muted-foreground">
                                Nenhum produto encontrado
                              </div>
                            </TableCell>
                          </TableRow>
                        ) : (
                          products.map((product) => (
                            <TableRow key={product.id}>
                              <TableCell>
                                <img 
                                  src={product.image} 
                                  alt={product.name} 
                                  className="w-12 h-12 object-cover rounded-md"
                                />
                              </TableCell>
                              <TableCell className="font-medium">{product.name}</TableCell>
                              <TableCell>
                                {categories.find(cat => cat.id === product.categoryId)?.name || 'N/A'}
                              </TableCell>
                              <TableCell>R$ {product.price.toFixed(2)}</TableCell>
                              <TableCell>
                                <div className="flex flex-wrap gap-1">
                                  {product.popular && <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300">Popular</Badge>}
                                  {product.featured && <Badge variant="outline" className="bg-indigo-100 text-indigo-800 border-indigo-300">Destaque</Badge>}
                                  {product.vegetarian && <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Vegetariano</Badge>}
                                  {product.vegan && <Badge variant="outline" className="bg-emerald-100 text-emerald-800 border-emerald-300">Vegano</Badge>}
                                  {product.glutenFree && <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">Sem Glúten</Badge>}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <Dialog open={editingProduct?.id === product.id} onOpenChange={(open) => !open && setEditingProduct(null)}>
                                    <DialogTrigger asChild>
                                      <Button 
                                        variant="outline" 
                                        size="sm"
                                        onClick={() => handleEditProduct(product)}
                                      >
                                        <Pencil className="h-4 w-4 mr-1" />
                                        Editar
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[500px]">
                                      <DialogHeader>
                                        <DialogTitle>Editar Produto</DialogTitle>
                                      </DialogHeader>
                                      <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-2 gap-4">
                                          <div className="space-y-2">
                                            <Label htmlFor="edit-name">Nome*</Label>
                                            <Input
                                              id="edit-name"
                                              value={productForm.name}
                                              onChange={(e) => handleProductFormChange("name", e.target.value)}
                                              required
                                            />
                                          </div>
                                          <div className="space-y-2">
                                            <Label htmlFor="edit-price">Preço (R$)*</Label>
                                            <Input
                                              id="edit-price"
                                              type="number"
                                              step="0.01"
                                              value={productForm.price}
                                              onChange={(e) => handleProductFormChange("price", parseFloat(e.target.value))}
                                              required
                                            />
                                          </div>
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="edit-category">Categoria*</Label>
                                          <Select
                                            value={productForm.categoryId}
                                            onValueChange={(value) => handleProductFormChange("categoryId", value)}
                                          >
                                            <SelectTrigger>
                                              <SelectValue placeholder="Selecione uma categoria" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              {categories.map((category) => (
                                                <SelectItem key={category.id} value={category.id}>
                                                  {category.name}
                                                </SelectItem>
                                              ))}
                                            </SelectContent>
                                          </Select>
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="edit-description">Descrição*</Label>
                                          <Textarea
                                            id="edit-description"
                                            value={productForm.description}
                                            onChange={(e) => handleProductFormChange("description", e.target.value)}
                                            required
                                          />
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="edit-image">URL da Imagem*</Label>
                                          <Input
                                            id="edit-image"
                                            value={productForm.image}
                                            onChange={(e) => handleProductFormChange("image", e.target.value)}
                                            required
                                          />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                          <div className="flex items-center space-x-2">
                                            <Checkbox
                                              id="edit-popular"
                                              checked={productForm.popular}
                                              onCheckedChange={(checked) => handleProductFormChange("popular", checked)}
                                            />
                                            <Label htmlFor="edit-popular">Popular</Label>
                                          </div>
                                          <div className="flex items-center space-x-2">
                                            <Checkbox
                                              id="edit-featured"
                                              checked={productForm.featured}
                                              onCheckedChange={(checked) => handleProductFormChange("featured", checked)}
                                            />
                                            <Label htmlFor="edit-featured">Destaque</Label>
                                          </div>
                                          <div className="flex items-center space-x-2">
                                            <Checkbox
                                              id="edit-vegetarian"
                                              checked={productForm.vegetarian}
                                              onCheckedChange={(checked) => handleProductFormChange("vegetarian", checked)}
                                            />
                                            <Label htmlFor="edit-vegetarian">Vegetariano</Label>
                                          </div>
                                          <div className="flex items-center space-x-2">
                                            <Checkbox
                                              id="edit-vegan"
                                              checked={productForm.vegan}
                                              onCheckedChange={(checked) => handleProductFormChange("vegan", checked)}
                                            />
                                            <Label htmlFor="edit-vegan">Vegano</Label>
                                          </div>
                                          <div className="flex items-center space-x-2">
                                            <Checkbox
                                              id="edit-glutenFree"
                                              checked={productForm.glutenFree}
                                              onCheckedChange={(checked) => handleProductFormChange("glutenFree", checked)}
                                            />
                                            <Label htmlFor="edit-glutenFree">Sem Glúten</Label>
                                          </div>
                                        </div>
                                      </div>
                                      <DialogFooter>
                                        <Button 
                                          variant="outline" 
                                          onClick={() => setEditingProduct(null)}
                                        >
                                          Cancelar
                                        </Button>
                                        <Button 
                                          onClick={handleUpdateProduct}
                                          className="bg-gradient-to-r from-indigo-600 to-pink-500 text-white"
                                        >
                                          Salvar Alterações
                                        </Button>
                                      </DialogFooter>
                                    </DialogContent>
                                  </Dialog>

                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button 
                                        variant="outline" 
                                        size="sm"
                                        className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                                      >
                                        <Trash2 className="h-4 w-4 mr-1" />
                                        Remover
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                      <DialogHeader>
                                        <DialogTitle>Confirmar Exclusão</DialogTitle>
                                        <DialogDescription>
                                          Tem certeza que deseja excluir o produto "{product.name}"?
                                          Esta ação não pode ser desfeita.
                                        </DialogDescription>
                                      </DialogHeader>
                                      <DialogFooter className="mt-4">
                                        <Button variant="outline">Cancelar</Button>
                                        <Button 
                                          variant="destructive" 
                                          onClick={() => handleDeleteProduct(product.id)}
                                        >
                                          Excluir
                                        </Button>
                                      </DialogFooter>
                                    </DialogContent>
                                  </Dialog>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  );
}
