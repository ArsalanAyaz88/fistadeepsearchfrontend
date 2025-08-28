import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Search, Zap, Globe, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import fishLogo from "@/assets/fish-logo-clean.png";

const Home = () => {
  const features = [
    {
      icon: Search,
      title: "Deep Search",
      description: "Advanced AI-powered search capabilities that understand context and intent"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Get instant responses with our optimized search algorithms"
    },
    {
      icon: Globe,
      title: "Global Knowledge",
      description: "Access information from across the web with real-time updates"
    },
    {
      icon: MessageSquare,
      title: "Natural Conversation",
      description: "Chat naturally with voice and text input options"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src={fishLogo} alt="Fista Logo" className="w-8 h-8" />
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Fista
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/signup">
              <Button variant="default" className="bg-gradient-primary border-0 shadow-primary hover:shadow-glow transition-all duration-300">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent leading-tight">
              Next-Generation
              <br />
              Search Agent
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Experience the future of search with Fista AI agent that understands, 
              analyzes, and delivers exactly what you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/chat">
                <Button 
                  size="lg" 
                  className="bg-gradient-primary border-0 shadow-primary hover:shadow-glow transition-all duration-300 group"
                >
                  Start Searching
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-border hover:bg-muted/50"
              >
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Fista combines cutting-edge AI with intuitive design 
              to deliver unparalleled search experiences.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="p-6 bg-card/50 backdrop-blur-sm border-border hover:shadow-card transition-all duration-300 group hover:scale-105"
              >
                <div className="mb-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Search Experience?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of users who have already discovered the power of intelligent search.
            </p>
            <Link to="/signup">
              <Button 
                size="lg" 
                className="bg-gradient-primary border-0 shadow-primary hover:shadow-glow transition-all duration-300"
              >
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; 2024 Fista. Powered by AI.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;