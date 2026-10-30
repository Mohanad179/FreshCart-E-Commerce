"use client";

import Link from "next/link";
import { UserPlus } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const labelClass = "mb-2 block text-sm font-medium text-gray-900";
const inputClass =
  "h-11 w-full rounded-md border border-gray-200 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-600/20";
const socialClass =
  "flex h-11 w-full items-center justify-center gap-2 rounded-md border border-gray-200 bg-white text-sm font-medium text-gray-800 transition hover:bg-gray-50";

const Required = () => <span className="text-red-400">*</span>;

export default function SignupForm() {
  // TODO: replace with real password strength logic
  const strength = { label: "Weak", percent: 0 };

  // TODO: replace with react-hook-form logic
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <div className="mx-auto w-full max-w-xl rounded-2xl border border-gray-100 bg-white p-6 shadow-xl sm:p-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">Create Your Account</h2>
        <p className="mt-2 text-sm text-gray-600 sm:text-base">
          Start your fresh journey with us today
        </p>
      </div>

      {/* Social (design only) */}
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

      {/* Divider */}
      <div className="my-6 flex items-center gap-4">
        <span className="h-px flex-1 bg-gray-200" />
        <span className="text-sm text-gray-700">or</span>
        <span className="h-px flex-1 bg-gray-200" />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name <Required />
          </label>
          <input id="name" name="name" type="text" autoComplete="name" placeholder="Ali" className={inputClass} />
          {/* TODO: name error */}
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email <Required />
          </label>
          <input id="email" name="email" type="email" autoComplete="email" placeholder="ali@example.com" className={inputClass} />
          {/* TODO: email error */}
        </div>

        <div>
          <label htmlFor="password" className={labelClass}>
            Password <Required />
          </label>
          <input id="password" name="password" type="password" autoComplete="new-password" placeholder="create a strong password" className={inputClass} />
          <div className="mt-2 flex items-center gap-3">
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-red-500 transition-all"
                style={{ width: `${strength.percent}%` }}
              />
            </div>
            <span className="text-sm text-gray-700">{strength.label}</span>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Must be at least 8 characters with numbers and symbols
          </p>
          {/* TODO: password error */}
        </div>

        <div>
          <label htmlFor="rePassword" className={labelClass}>
            Confirm Password <Required />
          </label>
          <input id="rePassword" name="rePassword" type="password" autoComplete="new-password" placeholder="confirm your password" className={inputClass} />
          {/* TODO: confirm password error */}
        </div>

        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone Number <Required />
          </label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+1 234 567 8900" className={inputClass} />
          {/* TODO: phone error */}
        </div>

        <div>
          <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-800">
            <input type="checkbox" name="terms" className="size-4 shrink-0 rounded border-gray-300 accent-green-600" />
            <span>
              I agree to the{" "}
              <Link href="/terms" className="text-green-600 hover:underline">Terms of Service</Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-green-600 hover:underline">Privacy Policy</Link>{" "}
              <Required />
            </span>
          </label>
          {/* TODO: terms error */}
        </div>

        <Button
          type="submit"
          className="h-11 w-full gap-2 rounded-md bg-green-600 text-base font-semibold text-white hover:bg-green-700"
        >
          <UserPlus className="size-4" />
          Create My Account
        </Button>
      </form>

      {/* Footer */}
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