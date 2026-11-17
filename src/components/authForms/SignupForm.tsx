"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlus } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { signupSchema, SignupValues } from "@/schemas/auth";
import { toast } from "sonner";
import { signupActions } from "@/services/signupService";
import { zodResolver } from "@hookform/resolvers/zod";

const labelClass = "mb-2 block text-sm font-medium text-gray-900";
const inputClass =
  "h-11 w-full rounded-md border border-gray-200 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-600/20";
const socialClass =
  "flex h-11 w-full items-center justify-center gap-2 rounded-md border border-gray-200 bg-white text-sm font-medium text-gray-800 transition hover:bg-gray-50";

export default function SignupForm() {
  const router = useRouter();
  const [serverMessage, setServerMessage] = useState("");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
      terms: false,
    },
  });

  const password = useWatch({ control, name: "password" }) ?? "";
  const strength =
    password.length < 8
      ? { label: "Weak", percent: 25 }
      : /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)
        ? { label: "Strong", percent: 100 }
        : { label: "Fair", percent: 60 };

  const onSubmit = async (values: SignupValues) => {
    setServerMessage("");

    const res = await signupActions(values);

    if (!res.success) {
      setServerMessage(res.message);
      toast.error(res.message);
      return;
    }

    toast.success("Signed up successfully, please log in.");
    router.push("/login");
  };

  const errorText = (message?: string) =>
    message && (
      <p role="alert" className="mt-1 text-xs text-red-600">
        {message}
      </p>
    );

  return (
    <div className="mx-auto w-full max-w-xl rounded-2xl border border-gray-100 bg-white p-6 shadow-xl sm:p-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          Create Your Account
        </h2>
        <p className="mt-2 text-sm text-gray-600 sm:text-base">
          Start your fresh journey with us today
        </p>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-3">
        <button type="button" className={socialClass}>
          <FcGoogle className="size-5" />
          Google
        </button>
        <button type="button" className={socialClass}>
          <FaFacebook className="size-5 text-[#1877F2]" />
          Facebook
        </button>
      </div>
      <div className="my-6 flex items-center gap-4">
        <span className="h-px flex-1 bg-gray-200" />
        <span className="text-sm text-gray-700">or</span>
        <span className="h-px flex-1 bg-gray-200" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name <span className="text-red-400">*</span>
          </label>
          <input
            id="name"
            autoComplete="name"
            placeholder="Ali"
            className={inputClass}
            {...register("name")}
          />
          {errorText(errors.name?.message)}
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email <span className="text-red-400">*</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="ali@example.com"
            className={inputClass}
            {...register("email")}
          />
          {errorText(errors.email?.message)}
        </div>
        <div>
          <label htmlFor="password" className={labelClass}>
            Password <span className="text-red-400">*</span>
          </label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            placeholder="Create a strong password"
            className={inputClass}
            {...register("password")}
          />
          <div className="mt-2 flex items-center gap-3">
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-green-600 transition-all"
                style={{ width: `${strength.percent}%` }}
              />
            </div>
            <span className="text-sm text-gray-700">{strength.label}</span>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            At least 8 characters, including a number and symbol.
          </p>
          {errorText(errors.password?.message)}
        </div>
        <div>
          <label htmlFor="rePassword" className={labelClass}>
            Confirm Password <span className="text-red-400">*</span>
          </label>
          <input
            id="rePassword"
            type="password"
            autoComplete="new-password"
            placeholder="Confirm your password"
            className={inputClass}
            {...register("rePassword")}
          />
          {errorText(errors.rePassword?.message)}
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone Number <span className="text-red-400">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+1 234 567 8900"
            className={inputClass}
            {...register("phone")}
          />
          {errorText(errors.phone?.message)}
        </div>
        <div>
          <label
            htmlFor="terms"
            className="flex cursor-pointer items-start gap-3 text-sm text-gray-800"
          >
            <input
              id="terms"
              type="checkbox"
              className="mt-0.5 size-4 shrink-0 rounded border-gray-300 accent-green-600"
              {...register("terms")}
            />
            <span>
              I agree to the{" "}
              <Link href="/terms" className="text-green-600 hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-green-600 hover:underline">
                Privacy Policy
              </Link>{" "}
              <span className="text-red-400">*</span>
            </span>
          </label>
          {errorText(errors.terms?.message)}
        </div>
        {serverMessage && (
          <p role="status" className="text-sm text-red-600">
            {serverMessage}
          </p>
        )}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-11 w-full gap-2 rounded-md bg-green-600 text-base font-semibold text-white hover:bg-green-700 disabled:opacity-60"
        >
          <UserPlus className="size-4" />
          {isSubmitting ? "Creating account…" : "Create My Account"}
        </Button>
      </form>
      <div className="mt-6 border-t border-gray-100 pt-6 text-center">
        <p className="text-sm text-gray-700 sm:text-base">
          Already have an account?{" "}
          <Link href="/login" className="text-green-600 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}