import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import { Eye, EyeOff, Lock, User, LogOut, Cpu, Monitor, HardDrive, CircuitBoard, Check, AlertCircle, Loader2 } from "lucide-react";

const USERS = [
  { user: "admin", pass: "6677" },
  { user: "pedro", pass: "1234" },
  { user: "maria", pass: "9999" },
];

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const usernameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    usernameRef.current?.focus();
  }, [isLoggedIn]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Preencha todos os campos para continuar.");
      return;
    }

    setIsLoading(true);

    // Simular delay de autenticação
    await new Promise((r) => setTimeout(r, 1200));

   const userExists = USERS.find(
  (u) => u.user === username && u.pass === password
);

if (userExists) {
      setShowSuccess(true);
      toast.success("Login realizado com sucesso!", {
        description: `Bem-vindo de volta, ${username}!`,
      });
      setTimeout(() => {
        setIsLoggedIn(true);
        setIsLoading(false);
        setShowSuccess(false);
      }, 1000);
    } else {
      setIsLoading(false);
      setError("Usuário ou senha incorretos. Verifique suas credenciais.");
      toast.error("Falha na autenticação", {
        description: "Verifique seu usuário e senha.",
      });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    setError("");
    toast.info("Sessão encerrada com segurança.");
  };

  if (isLoggedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        {/* Background decorativo */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />
        </div>

        <div className="relative z-10 w-full max-w-lg animate-fade-in">
          <Card className="border-border/50 bg-card/80 backdrop-blur-sm glow-blue">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-accent/20 glow-green">
                <Check className="h-10 w-10 text-accent text-glow-green" />
              </div>
              <CardTitle className="text-3xl font-bold text-foreground">
                Bem-vindo, <span className="text-primary">{username}</span>!
              </CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                Você está conectado ao painel da wolftec Components.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Mini dashboard simulado */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Monitor, label: "Monitores", value: "124" },
                  { icon: Cpu, label: "Processadores", value: "89" },
                  { icon: HardDrive, label: "SSDs", value: "203" },
                  { icon: CircuitBoard, label: "Placas-mãe", value: "67" },
                ].map((item, i) => (
                  <div
                    key={item.label}
                    className="flex flex-col items-center gap-2 rounded-lg border border-border/50 bg-muted/30 p-4 transition-all duration-300 hover:border-primary/50 hover:bg-muted/50"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <item.icon className="h-6 w-6 text-primary" />
                    <span className="text-xs text-muted-foreground">{item.label}</span>
                    <span className="text-lg font-bold text-foreground">{item.value}</span>
                  </div>
                ))}
              </div>

              <Button
                onClick={handleLogout}
                variant="outline"
                className="w-full gap-2 border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                <LogOut className="h-4 w-4" />
                Sair da conta
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      {/* Background decorativo */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/3 h-40 w-40 -translate-x-1/2 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md animate-fade-in">
        {/* Logo / Branding */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20 glow-blue">
            <CircuitBoard className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Wolf<span className="text-primary">Tech</span> Components
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Painel de controle — Hardware & Componentes
          </p>
        </div>

        <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Lock className="h-5 w-5 text-primary" />
              Acesso ao Sistema
            </CardTitle>
            <CardDescription>
              Informe suas credenciais para acessar o painel.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Campo de Usuário */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium">
                  Usuário
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="username"
                    ref={usernameRef}
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setError("");
                    }}
                    placeholder="Digite seu usuário"
                    className="pl-10 transition-all focus:glow-blue"
                    autoComplete="username"
                  />
                </div>
              </div>

              {/* Campo de Senha */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Senha
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    placeholder="Digite sua senha"
                    className="pl-10 pr-10 transition-all focus:glow-blue"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                    aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Mensagem de erro */}
              {error && (
                <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive animate-fade-in">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {error}
                </div>
              )}

              {/* Sucesso */}
              {showSuccess && (
                <div className="flex items-center gap-2 rounded-lg border border-accent/30 bg-accent/10 p-3 text-sm text-accent animate-fade-in">
                  <Check className="h-4 w-4 shrink-0" />
                  Autenticação bem-sucedida! Entrando...
                </div>
              )}

              {/* Botão de login */}
              <Button type="submit" className="w-full gap-2 font-semibold" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Verificando...
                  </>
                ) : (
                  "Entrar"
                )}
              </Button>
            </form>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              🔒 Conexão segura · Ambiente protegido
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
