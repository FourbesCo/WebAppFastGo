
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center py-12 animate-fade-in">
      <Container>
        <div className="text-center max-w-md mx-auto">
          <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
          <p className="text-2xl font-semibold mb-4">Página não encontrada</p>
          <p className="text-muted-foreground mb-8">
            A página que você está procurando não existe ou foi movida.
          </p>
          <div className="space-x-4">
            <Button asChild>
              <Link to="/">Voltar ao Início</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/menu">Ver Cardápio</Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default NotFound;
