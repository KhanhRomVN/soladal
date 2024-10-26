import { createRoute } from "@tanstack/react-router";
import HomePage from "../pages/HomePage";
import { RootRoute } from "./__root";
import AboutPage from "@/pages/AboutPage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";

export const HomeRoute = createRoute({
    getParentRoute: () => RootRoute,
    path: "/",
    component: HomePage,
});

export const AboutRoute = createRoute({
    getParentRoute: () => RootRoute,
    path: "/about",
    component: AboutPage,
});

export const LoginRoute = createRoute({
    getParentRoute: () => RootRoute,
    path: "/login",
    component: LoginPage,
});

export const RegisterRoute = createRoute({
    getParentRoute: () => RootRoute,
    path: "/register",
    component: RegisterPage,
});

export const rootTree = RootRoute.addChildren([HomeRoute, AboutRoute, LoginRoute, RegisterRoute]);
