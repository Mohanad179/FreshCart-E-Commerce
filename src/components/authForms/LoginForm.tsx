"use client";

import { startTransition, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Mail, Lock, Eye, EyeOff, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { LoginValues } from "@/schemas/auth";
import { toast } from "sonner";
import { loginActions } from "@/app/(auth)/login/loginActions";

const inputWrapper = "relative flex items-center";

const inputClass =
  "h-12 w-full rounded-lg border border-gray-200 bg-gray-50/60 pl-11 pr-4 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-green-600 focus:bg-white focus:ring-2 focus:ring-green-600/20";

const socialClass =
  "flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-800 transition hover:bg-gray-50";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    defaultValues: { email: "", password: "", remember: false },
  });

  // onSubmit function to handle form submission
  const onSubmit = async (values: LoginValues) => {
    setServerMessage("");
     startTransition(async () => {
    const res = await loginActions(values);

    if (!res.success) {
      setServerMessage(res.message);
      toast.error(res.message);
      return;
    }

    toast.success("Login successful!");
    router.push("/");
    router.refresh();
  });
  };

  const errorText = (message?: string) =>
    message && (
      <p role="alert" className="mt-1 text-xs text-red-600">
        {message}
      </p>
    );

  return (
    <div className="mx-auto w-full max-w-xl rounded-2xl border border-gray-100 bg-white p-6 shadow-xl sm:p-10">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold">
          <span className="text-green-600">Fresh</span>
          <span className="text-gray-900">Cart</span>
        </h1>
        <h2 className="mt-4 text-2xl font-bold text-gray-900">Welcome Back!</h2>
        <p className="mt-2 text-sm text-gray-600 sm:text-base">
          Sign in to continue your fresh shopping experience
        </p>
      </div>

      {/* Social (design only) */}
      <div className="mt-8 space-y-3">
        <button type="button" className={socialClass}>
          <FcGoogle className="size-5" />
          Continue with Google
        </button>
        <button type="button" className={socialClass}>
          <FaFacebook className="size-5 text-[#1877F2]" />
          Continue with Facebook
        </button>
      </div>

      {/* Divider */}
      <div className="my-6 flex items-center gap-4">
        <span className="h-px flex-1 bg-gray-200" />
        <span className="text-xs font-medium uppercase text-gray-500">
          Or continue with email
        </span>
        <span className="h-px flex-1 bg-gray-200" />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Email Address
          </label>
          <div className={inputWrapper}>
            <Mail className="pointer-events-none absolute left-4 size-4 text-gray-400" />
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              className={inputClass}
              {...register("email")}
            />
          </div>
          {errorText(errors.email?.message)}
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-sm text-green-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <div className={inputWrapper}>
            <Lock className="pointer-events-none absolute left-4 size-4 text-gray-400" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Enter your password"
              className={`${inputClass} pr-12`}
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-4 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
          {errorText(errors.password?.message)}
        </div>

        <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-800">
          <input
            type="checkbox"
            className="size-4 rounded border-gray-300 accent-green-600"
            {...register("remember")}
          />
          Keep me signed in
        </label>

        {serverMessage && (
          <p role="alert" className="text-sm text-red-600">
            {serverMessage}
          </p>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-12 w-full rounded-lg bg-green-600 text-base font-semibold text-white shadow-md hover:bg-green-700"
        >
          {isSubmitting ? "Signing in…" : "Sign In"}
        </Button>
      </form>

      {/* Footer */}
      <div className="mt-6 border-t border-gray-100 pt-6 text-center">
        <p className="text-sm text-gray-700 sm:text-base">
          New to FreshCart?{" "}
          <Link
            href="/signup"
            className="font-semibold text-green-600 hover:underline"
          >
            Create an account
          </Link>
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <Lock className="size-3.5" /> SSL Secured
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="size-3.5" /> 50K+ Users
          </span>
          <span className="flex items-center gap-1.5">
            <Star className="size-3.5 fill-current" /> 4.9 Rating
          </span>
        </div>
      </div>
    </div>
  );
}
