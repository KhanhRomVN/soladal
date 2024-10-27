import { createRoute } from "@tanstack/react-router";
import HomePage from "../pages/HomePage";
import { RootRoute } from "./__root";
import AboutPage from "@/pages/AboutPage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import BaseLayout from "@/layouts/BaseLayout";
import MainLayout from "@/layouts/MainLayout";
import React from "react";

export const HomeRoute = createRoute({
    getParentRoute: () => RootRoute,
    path: "/",
    component: () => (
        <MainLayout>
            <HomePage />
        </MainLayout>
    ),
});

export const AboutRoute = createRoute({
    getParentRoute: () => RootRoute,
    path: "/about",
    component: () => (
        <BaseLayout>
            <AboutPage />
        </BaseLayout>
    ),
});

export const LoginRoute = createRoute({
    getParentRoute: () => RootRoute,
    path: "/login",
    component: () => (
        <BaseLayout>
            <LoginPage />
        </BaseLayout>
    ),
});

export const RegisterRoute = createRoute({
    getParentRoute: () => RootRoute,
    path: "/register",
    component: () => (
        <BaseLayout>
            <RegisterPage />
        </BaseLayout>
    ),
});

export const rootTree = RootRoute.addChildren([HomeRoute, AboutRoute, LoginRoute, RegisterRoute]);