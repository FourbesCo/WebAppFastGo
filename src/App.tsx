
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/layout/Navigation";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import OpcoesPagamento from "./pages/OpcoesPagamento";
import InserirCartao from "./pages/InserirCartao";
import InserirProduto from "./pages/InserirProduto";
import Produtos from "./pages/Produtos";
import ListaItens from "./pages/ListaItens";
import Configuracoes from "./pages/Configuracoes";
import Clientes from "./pages/Clientes";
import NotFound from "./pages/NotFound";
import { useIsMobile } from "./hooks/use-mobile";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const isMobile = useIsMobile();
  
  return (
    <>
      <Navigation />
      <div className={`${isMobile ? 'pb-14 md:pb-0 md:pt-14' : 'pt-14'} w-full`}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/opcoes-pagamento" element={<OpcoesPagamento />} />
          <Route path="/inserir-cartao" element={<InserirCartao />} />
          <Route path="/inserir-produto" element={<InserirProduto />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/lista-itens" element={<ListaItens />} />
          <Route path="/configuracoes" element={<Configuracoes />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-center" />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
