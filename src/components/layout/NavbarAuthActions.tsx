"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, User, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { logoutAction } from "@/services/loginService";

type Variant = "header" | "mobile" | "desktop";

export default function NavbarAuthActions({ variant, isLoggedIn }: { variant: Variant; isLoggedIn: boolean }) {
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const router = useRouter();

  const logout = async () => {
    await logoutAction();
    setIsLogoutDialogOpen(false);
    router.push("/");
    router.refresh();
  };

  let authActions: ReactNode;

  if (variant === "header") {
    if (isLoggedIn) {
      authActions = (
        <AlertDialogTrigger
          render={
            <button
              type="button"
              className="flex items-center gap-2 cursor-pointer"
            />
          }
        >
          <LogOut className="size-4 text-red-500" /> Log Out
        </AlertDialogTrigger>
      );
    } else {
      authActions = (
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
  } else if (variant === "mobile") {
    authActions = isLoggedIn ? (
      <AlertDialogTrigger
        render={
          <Button className="mt-4 cursor-pointer rounded-full bg-red-500 hover:bg-red-600" />
        }
      >
        <LogOut className="size-4" /> Log Out
      </AlertDialogTrigger>
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
  } else {
    authActions = isLoggedIn ? (
      <AlertDialogTrigger
        render={
          <Button className="hidden rounded-full bg-red-500 cursor-pointer px-6 hover:bg-red-600 lg:inline-flex" />
        }
      >
        <LogOut className="size-4" /> Log Out
      </AlertDialogTrigger>
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

  return (
    <AlertDialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
      {authActions}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Log out?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to logout?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
          <Button type="button" variant="destructive" className="cursor-pointer" onClick={logout}>
            Log Out
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
