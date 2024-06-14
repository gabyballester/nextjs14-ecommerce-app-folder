import Link from "next/link";
import React from "react";
import { DashboardRoute } from "./main-nav";
import { cn } from "@/lib";

export const NavLink = ({ route }: { route: DashboardRoute }) => {
  return (
    <Link
      href={route.href}
      className={cn(
        "font-medum transition.colors hovver:text-primary text-sm",
        route.active ? "dard:text-white text-black" : "text-muted-foreground",
      )}
    >
      {route.label}
    </Link>
  );
};
