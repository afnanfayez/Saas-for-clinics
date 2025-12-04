"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import PreviousVisits from "@/components/PreviousVisits";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function MedicalRecordPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { language } = useLanguage();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <Breadcrumbs />

        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-slate-500 mb-1">
              {language === "ar" ? "OU,O3OªU, OU,OúO\"US" : "Medical record"}
            </p>
            <h1 className="text-2xl font-bold text-slate-900">
              {language === "ar"
                ? "O3OªU,UŸ OU,OúO\"US U^OýUSOOñOO¦UŸ OU,O3OO\"U,Oc"
                : "Your medical record and previous visits"}
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              {language === "ar"
                ? "USU.UŸU+UŸ UØU+O OU,OOúU,OO1 O1U,U% U.U,OrOæ OýUSOOñOO¦UŸ U^O¦O'OrUSOæOO¦UŸ OU,O3OO\"U,Oc."
                : "Here you can view a summary of your previous visits and diagnoses."}
            </p>
          </div>
          <button
            onClick={() => router.push("/patient/dashboard")}
            className="text-sm text-teal-700 hover:text-teal-800 hover:underline"
          >
            {language === "ar" ? "OñOªU^O1" : "Back"}
          </button>
        </div>

        <PreviousVisits showSummary={true} />
      </div>
    </div>
  );
}
