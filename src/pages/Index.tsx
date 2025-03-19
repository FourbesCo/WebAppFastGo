
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowRight, UtensilsCrossed } from "lucide-react";
import { MenuItem } from "@/types";
import { getMenuItems } from "@/lib/api";
import { useCart } from "@/context/CartContext";

export default function Index() {
  const [popularItems, setPopularItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    const loadPopularItems = async () => {
      try {
        const allItems = await getMenuItems();
        const popular = allItems.filter((item) => item.popular);
        setPopularItems(popular);
      } catch (error) {
        console.error("Failed to load popular items:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPopularItems();
  }, []);

  return (
    <div className="min-h-screen flex flex-col animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-[url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974')] bg-cover bg-center py-32">
        <div className="absolute inset-0 bg-black/40" />
        <Container className="relative z-10 text-white">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Peça antes, retire sem espera
            </h1>
            <p className="text-lg mb-8 text-white/90">
              Com o PickupEats, você pode fazer seu pedido, pagar e agendar sua retirada. 
              Sem filas, sem espera, apenas ótima comida.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="animate-pulse">
                <Link to="/menu">Ver Cardápio</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/menu">Saiba Mais</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-secondary/30">
        <Container>
          <h2 className="text-3xl font-bold text-center mb-12">
            Como Funciona
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Escolha seus itens",
                description:
                  "Navegue pelo cardápio e adicione seus favoritos ao carrinho.",
              },
              {
                step: "2",
                title: "Faça seu pedido",
                description:
                  "Finalize seu pedido e pague online de forma segura.",
              },
              {
                step: "3",
                title: "Retire sem espera",
                description:
                  "Vá até o restaurante no horário escolhido e retire seu pedido.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 rounded-xl neomorphic"
              >
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Popular Items */}
      <section className="py-20">
        <Container>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Mais Populares</h2>
            <Button asChild variant="ghost">
              <Link to="/menu" className="flex items-center gap-1">
                Ver todos <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="h-72 rounded-lg animate-pulse bg-muted"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularItems.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl overflow-hidden border transition-all duration-300 hover:shadow-lg neomorphic"
                >
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold mb-1">{item.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">
                        R$ {item.price.toFixed(2)}
                      </span>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => addItem(item.id)}
                      >
                        Adicionar
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* Incentive */}
      <section className="py-20 bg-primary text-primary-foreground">
        <Container className="text-center max-w-3xl">
          <UtensilsCrossed className="mx-auto h-12 w-12 mb-6" />
          <h2 className="text-3xl font-bold mb-4">
            Experimente uma nova maneira de pedir
          </h2>
          <p className="text-lg mb-8 text-primary-foreground/90">
            Rápido, fácil e sem complicações. Peça agora e descubra por que
            nossos clientes adoram o PickupEats.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/menu">Fazer Pedido</Link>
          </Button>
        </Container>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">PickupEats</h3>
              <p className="text-muted-foreground">
                A melhor maneira de pedir e retirar sua comida favorita sem
                espera.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/menu"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Cardápio
                  </Link>
                </li>
                <li>
                  <Link
                    to="/orders"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Meus Pedidos
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Meu Perfil
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Contato</h3>
              <address className="not-italic text-muted-foreground">
                <p>Rua dos Sabores, 123</p>
                <p>São Paulo, SP</p>
                <p className="mt-2">contato@pickupeats.com</p>
                <p>(11) 99999-8888</p>
              </address>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Horários</h3>
              <ul className="text-muted-foreground">
                <li>Segunda a Sexta: 10h - 22h</li>
                <li>Sábado e Domingo: 10h - 23h</li>
              </ul>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} PickupEats. Todos os direitos reservados.</p>
          </div>
        </Container>
      </footer>
    </div>
  );
}
