import Header from "components/Header";
import LoadingScreen from "components/core/LoadingScreen";
import Home from "pages/home/Home";
import Lending from "pages/lending/Lending";
import Register from "pages/lending/Lending";
import MarketPage from "pages/market/MarketPage";
import MarketDetail from "pages/marketDetail/MarketDetail";
import { Suspense } from "react";
import {
  useRoutes
} from "react-router-dom";

export default function Routers() {

  const routes = useRoutes([
    {
      path: "",
      element: <Suspense fallback={<LoadingScreen />}>
        <Home />
      </Suspense>,
    },
    {
      path: "/lending",
      element: <Suspense fallback={<LoadingScreen />}>
        <Lending />
      </Suspense>,
    },
    {
      path: "/market",
      element: <Suspense fallback={<LoadingScreen />}>
        <MarketPage />
      </Suspense>,
    },
    {
      path: "/market/:id",
      element: <Suspense fallback={<LoadingScreen />}>
        <MarketDetail />
      </Suspense>,
    }
  ]);

  return <>
    <Header />
    {routes}
  </>
  return routes;
}
