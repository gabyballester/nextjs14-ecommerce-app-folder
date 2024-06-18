"use client";

import { HTMLAttributes } from "react";
import { useParams, usePathname } from "next/navigation";
import { cn } from "@/lib";
import { NavLink } from "./nav-link";

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
  // TODO: Eliminar si no se usa
  // if (!params?.storeId) redirect("/");

  const routes = [
    {
      href: `/${params?.storeId}`,
      label: "Overview",
      active: pathname === `/${params?.storeId}`,
    },
    {
      href: `/${params?.storeId}/settings`,
      label: "Settings",
      active: pathname === `/${params?.storeId}/settings`,
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
