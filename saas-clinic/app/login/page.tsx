"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import Button from "@/Component/Button";
import { useAuth } from "@/context/AuthContext";

// ----------------- Validation schema -----------------
const loginSchema = z.object({
  email: z.string().email("صيغة بريد إلكتروني غير صحيحة"),
  password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const router = useRouter();
  const { login, user } = useAuth();

  const [serverError, setServerError] = useState("");

  // ----------------- react-hook-form -----------------
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // ----------------- Redirect if already logged in -----------------
  useEffect(() => {
    if (!user) return;

    if (user.is_platform_admin) {
      router.push("/platform/dashboard");
    } else {
      switch (user.role) {
        case "manager":
          router.push("/clinic/dashboard");
          break;
        case "doctor":
          router.push("/doctor/dashboard");
          break;
        case "secretary":
          router.push("/reception/dashboard");
          break;
        case "patient":
          router.push("/patient/dashboard");
          break;
        default:
          router.push("/clinic/dashboard");
      }
    }
  }, [user, router]);

  // ----------------- Submit handler -----------------
  const onSubmit = async (data: LoginFormData) => {
    setServerError("");

    try {
      await login(data.email, data.password);
      // التوجيه يتم داخل الـ AuthContext بعد نجاح تسجيل الدخول
    } catch (err: unknown) {
      console.error("Login error:", err);

      if (err && typeof err === "object" && "response" in err) {
        const axiosError = err as {
          response?: {
            status?: number;
            data?: { message?: string; error?: string };
          };
        };

        const status = axiosError.response?.status;
        const errorMessage =
          axiosError.response?.data?.message ||
          axiosError.response?.data?.error;

        if (status === 500 || status === 502) {
          setServerError("خطأ في الخادم. يرجى المحاولة لاحقاً.");
        } else if (status === 422) {
          setServerError(
            "خطأ في التحقق من البيانات: " + (errorMessage || "بيانات غير صحيحة")
          );
        } else if (errorMessage) {
          setServerError(errorMessage);
        } else {
          setServerError(`فشل تسجيل الدخول (HTTP ${status}).`);
        }
      } else if (err && typeof err === "object" && "message" in err) {
        const networkError = err as { message?: string };
        setServerError(
          networkError.message || "تعذّر الاتصال بالخادم. تأكد أن السيرفر يعمل."
        );
      } else {
        setServerError("حدث خطأ غير متوقع. حاول مرة أخرى.");
      }
    }
  };

  // ----------------- UI (تصميمك القديم كما هو تقريباً) -----------------
  return (
    <div className="min-h-screen w-full bg-[#f3f7f6] flex items-center justify-center p-6">
      {/* خلفية ناعمة */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="w-72 h-72 rounded-full bg-[var(--color-primary-light)] blur-3xl absolute -top-16 -left-10" />
        <div className="w-80 h-80 rounded-full bg-[var(--color-primary-light)] blur-3xl absolute bottom-10 right-10" />
      </div>

      {/* البطاقة */}
      <div
        dir="rtl"
        className="relative z-10 w-full max-w-[520px] bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-[var(--color-primary-light)] p-8 md:p-10 space-y-6"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-primary-dark)]">
            أهلًا بعودتك!
          </h1>
        </div>

        {/* رسالة خطأ من السيرفر */}
        {serverError && (
          <div className="p-3 bg-red-100 text-red-700 text-sm rounded-lg text-center">
            {serverError}
          </div>
        )}

        <form
          className="space-y-5"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          {/* البريد الإلكتروني */}
          <div>
            <label className="block text-sm text-[var(--color-primary-dark)] mb-1">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              placeholder="admin@platform.com"
              {...register("email")}
              className="w-full px-4 py-2.5 border border-[var(--color-primary-light)] rounded-lg bg-white text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* كلمة المرور */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm text-[var(--color-primary-dark)]">
                كلمة المرور
              </label>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              {...register("password")}
              className="w-full px-4 py-2.5 border border-[var(--color-primary-light)] rounded-lg bg-white text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
            <a
              href="#"
              className="text-xs text-[var(--color-primary-dark)] hover:underline flex justify-end mt-3"
            >
              نسيت كلمة المرور؟
            </a>
          </div>

          {/* زر تسجيل الدخول – بنفس الـ Button تبعك */}
          <Button
            title={isSubmitting ? "جاري تسجيل الدخول..." : "تسجيل دخول"}
          />

          {/* فاصل */}
          <div className="relative text-center">
            <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gray-200"></span>
            <span className="relative bg-white px-3 text-xs text-gray-500">
              أو
            </span>
          </div>

          {/* تسجيل Google */}
          <button
            type="button"
            className="w-full h-11 rounded-lg border border-gray-200 bg-white flex items-center justify-center gap-2 text-sm text-gray-700 hover:bg-gray-50 transition"
          >
            <svg aria-hidden className="w-5 h-5" viewBox="0 0 48 48">
              <path
                fill="#FFC107"
                d="M43.611 20.083H42V20H24v8h11.303C33.83 32.91 29.29 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.156 7.957 3.043l5.657-5.657C34.676 6.012 29.627 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
              />
              <path
                fill="#FF3D00"
                d="M6.306 14.691l6.571 4.818C14.39 16.021 18.9 12 24 12c3.059 0 5.842 1.156 7.957 3.043l5.657-5.657C34.676 6.012 29.627 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
              />
              <path
                fill="#4CAF50"
                d="M24 44c5.217 0 10.088-1.993 13.746-5.254l-6.342-5.372C29.31 34.705 26.797 36 24 36c-5.267 0-9.793-3.07-11.693-7.463l-6.567 5.06C8.146 39.647 15.54 44 24 44z"
              />
              <path
                fill="#1976D2"
                d="M43.611 20.083H42V20H24v8h11.303c-1.356 3.91-5.897 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.156 7.957 3.043l5.657-5.657C34.676 6.012 29.627 4 24 4c-11.046 0-20 8.954-20 20s8.954 20 20 20c10.493 0 19.25-7.615 19.25-20 0-1.333-.139-2.667-.389-3.917z"
              />
            </svg>
            <span>المتابعة باستخدام Google</span>
          </button>

          <p className="text-center text-sm text-gray-600">
            ليس لديك حساب؟
            <Link href="/joinUs">
              <span className="text-[var(--color-primary-dark)] hover:underline font-medium ml-1">
                انضم إلينا
              </span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
