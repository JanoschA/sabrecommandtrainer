import { useEffect } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { useTrainingStore } from "@/store/use-training-store";
import { t } from "@/lib/i18n";

import Home from "@/pages/Home";
import SelectTraining from "@/pages/Select";
import Settings from "@/pages/Settings";
import ActiveTraining from "@/pages/Active";
import Summary from "@/pages/Summary";
import History from "@/pages/History";
import Guide from "@/pages/Guide";
import Impressum from "@/pages/Impressum";
import Datenschutz from "@/pages/Datenschutz";
import KontaktPage from "@/pages/Kontakt";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/select" component={SelectTraining} />
      <Route path="/settings" component={Settings} />
      <Route path="/active" component={ActiveTraining} />
      <Route path="/summary" component={Summary} />
      <Route path="/history" component={History} />
      <Route path="/guide" component={Guide} />
      <Route path="/impressum" component={Impressum} />
      <Route path="/datenschutz" component={Datenschutz} />
      <Route path="/kontakt" component={KontaktPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function ScrollManager() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location]);

  return null;
}

function App() {
  const { language } = useTrainingStore();

  useEffect(() => {
    document.title = t("appTitle", language);
  }, [language]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <ScrollManager />
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
