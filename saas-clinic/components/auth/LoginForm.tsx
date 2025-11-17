"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void>;
  error?: string;
  isSubmitting?: boolean;
  translations: {
    email: string;
    password: string;
    rememberMe: string;
    login: string;
    forgotPassword: string;
    welcome: string;
    signInPrompt: string;
    dontHaveAccount: string;
    registerClinic: string;
  };
  isRTL?: boolean;
}

export function LoginForm({
  onSubmit,
  error,
  isSubmitting = false,
  translations: t,
  isRTL = false,
}: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <div className="w-full max-w-md">
      <Card className="shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">{t.welcome}</CardTitle>
          <CardDescription>{t.signInPrompt}</CardDescription>
        </CardHeader>

        <CardContent>
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm text-center">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {t.email}
              </label>
              <div className="relative">
                <div
                  className={cn(
                    "absolute inset-y-0 flex items-center pointer-events-none",
                    isRTL ? "right-0 pr-3" : "left-0 pl-3"
                  )}
                >
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  className={cn(
                    errors.email && "border-red-300",
                    isRTL ? "pr-10 text-right" : "pl-10"
                  )}
                  placeholder="admin@platform.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {t.password}
              </label>
              <div className="relative">
                <div
                  className={cn(
                    "absolute inset-y-0 flex items-center pointer-events-none",
                    isRTL ? "right-0 pr-3" : "left-0 pl-3"
                  )}
                >
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className={cn(
                    errors.password && "border-red-300",
                    isRTL ? "pr-10 text-right" : "pl-10"
                  )}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={cn(
                    "absolute inset-y-0 flex items-center",
                    isRTL ? "left-0 pl-3" : "right-0 pr-3"
                  )}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                />
                <span className={cn("text-sm text-gray-700", isRTL ? "mr-2" : "ml-2")}>
                  {t.rememberMe}
                </span>
              </label>
              <a
                href="#"
                className="text-sm text-teal-600 hover:text-teal-700 font-medium"
              >
                {t.forgotPassword}
              </a>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full"
              size="lg"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                  {isRTL ? "جارٍ تسجيل الدخول..." : "Signing in..."}
                </>
              ) : (
                t.login
              )}
            </Button>

            {/* Join Us Link */}
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                {t.dontHaveAccount}{' '}
                <a href="/join-us" className="text-teal-600 hover:text-teal-700 font-medium">
                  {t.registerClinic}
                </a>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
