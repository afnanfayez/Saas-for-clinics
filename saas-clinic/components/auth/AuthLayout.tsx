"use client";

import { cn } from "@/lib/utils";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  languageSwitcher?: React.ReactNode;
  demoCredentials?: {
    admin?: string;
    manager?: string;
    doctor?: string;
  };
  language?: "en" | "ar";
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "4xl";
}

export function AuthLayout({
  children,
  title,
  subtitle,
  languageSwitcher,
  demoCredentials,
  language = "en",
  maxWidth = "md",
}: AuthLayoutProps) {
  const isRTL = language === "ar";

  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "4xl": "max-w-4xl",
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-linear-to-br from-teal-50 via-white to-cyan-50 p-4"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>

      <div className={`w-full ${maxWidthClasses[maxWidth]} relative`}>
        {/* Language Switcher */}
        {languageSwitcher && (
          <div className="absolute top-0 right-0 mb-4">{languageSwitcher}</div>
        )}

        {/* Header Banner */}
        <div className="bg-linear-to-r from-teal-600 to-cyan-600 px-8 py-10 text-white text-center relative rounded-t-2xl mt-16">
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-teal-400 via-cyan-400 to-teal-500"></div>

          {/* Logo/Icon */}
          <div className="mb-4 flex justify-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
              <svg
                className="w-10 h-10 text-teal-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-2xl font-bold mb-2">{title}</h1>
          <p className="text-teal-100 text-sm">{subtitle}</p>
        </div>

        {/* Main Content */}
        {children}

        {/* Demo Credentials */}
        {demoCredentials && (
          <div className="mt-6 bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-md">
            <h3 className="font-semibold text-gray-800 mb-2 text-sm">
              {isRTL ? "🔐 بيانات التجربة:" : "🔐 Demo Credentials:"}
            </h3>
            <div className="text-xs text-gray-600 space-y-1">
              {demoCredentials.admin && (
                <p>
                  <strong>{isRTL ? "المدير:" : "Admin:"}</strong>{" "}
                  {demoCredentials.admin}
                </p>
              )}
              {demoCredentials.manager && (
                <p>
                  <strong>{isRTL ? "مدير العيادة:" : "Manager:"}</strong>{" "}
                  {demoCredentials.manager}
                </p>
              )}
              {demoCredentials.doctor && (
                <p>
                  <strong>{isRTL ? "الطبيب:" : "Doctor:"}</strong>{" "}
                  {demoCredentials.doctor}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
