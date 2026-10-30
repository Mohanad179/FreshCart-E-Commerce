"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, User, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

type Variant = "header" | "mobile" | "desktop";

export default function NavbarAuthActions({ variant }: { variant: Variant }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const syncAuthState = () => {
      setIsLoggedIn(
        Boolean(
          localStorage.getItem("token") || sessionStorage.getItem("token"),
        ),
      );
    };

    syncAuthState();
    window.addEventListener("storage", syncAuthState);
    window.addEventListener("auth-change", syncAuthState);
    return () => {
      window.removeEventListener("storage", syncAuthState);
      window.removeEventListener("auth-change", syncAuthState);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("auth-change"));
    router.push("/");
    router.refresh();
  };

  if (variant === "header") {
    if (isLoggedIn) {
      return (
        <button
          type="button"
          onClick={logout}
          className="flex items-center gap-2 cursor-pointer"
        >
          <LogOut className="size-4 text-red-500" /> Log Out
        </button>
      );
    }
    return (
      <>
        <Link href="/login" className="flex items-center gap-2">
          <User className="size-4 text-primary" /> Sign In
        </Link>
        <Link href="/signup" className="flex items-center gap-2">
          <UserPlus className="size-4 text-primary" /> Sign Up
        </Link>
      </>
    );
  }

  if (variant === "mobile") {
    return isLoggedIn ? (
      <Button
        type="button"
        onClick={logout}
        className="mt-4 cursor-pointer rounded-full bg-red-500 hover:bg-red-600"
      >
        <LogOut className="size-4" /> Log Out
      </Button>
    ) : (
      <>
        <Button
          render={<Link href="/login" />}
          className="mt-4 cursor-pointer rounded-full"
        >
          Sign In
        </Button>
        <Button
          render={<Link href="/signup" />}
          variant="outline"
          className="cursor-pointer rounded-full"
        >
          Sign Up
        </Button>
      </>
    );
  }

  return isLoggedIn ? (
    <Button
      type="button"
      onClick={logout}
      className="hidden rounded-full bg-red-500 cursor-pointer px-6 hover:bg-red-600 lg:inline-flex"
    >
      <LogOut className="size-4" /> Log Out
    </Button>
  ) : (
    <Button
      nativeButton={false}
      render={<Link href="/login" />}
      className="hidden rounded-full px-6 lg:inline-flex"
    >
      <User className="size-4" /> Sign In
    </Button>
  );
}
