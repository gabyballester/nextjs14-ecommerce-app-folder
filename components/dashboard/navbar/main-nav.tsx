"use client";

import { HTMLAttributes } from "react";
import { redirect, useParams, usePathname } from "next/navigation";
import { NavLink } from "./nav-link";
import { cn } from "@/lib";

export type DashboardRoute = {
  href: string;
  label: string;
  active: boolean;
};

export const MainNav = ({
  className,
  ...props
}: HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();
  const params = useParams();

  if (!params || !params.storeId) redirect("/");

  const routes: DashboardRoute[] = [
    {
      href: `/${params.storeId}`,
      label: "Overview",
      active: pathname === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/billboards`,
      label: "Billboards",
      active: pathname === `/${params.storeId}/billboards`,
    },
    {
      href: `/${params.storeId}/categories`,
      label: "Categories",
      active: pathname === `/${params.storeId}/categories`,
    },
    {
      href: `/${params.storeId}/sizes`,
      label: "Sizes",
      active: pathname === `/${params.storeId}/sizes`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: "Settings",
      active: pathname === `/${params.storeId}/settings`,
    },
  ];

  return (
    <nav
      {...props}
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
    >
      {routes.map((route) => (
        <NavLink key={route.href} route={route} />
      ))}
    </nav>
  );
};
