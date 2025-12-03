"use client";

import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";
import { useRouter } from "next/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import PatientSearch from "@/components/PatientSearch";

export default function SearchPatientPage() {
  const { language } = useLanguage();
  const t = translations[language];
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-slate-500 mb-1">
              {t.patientsManagement || "إدارة المرضى"}
            </p>
            <h1 className="text-2xl font-bold text-slate-900">
              {t.searchPatient || "البحث عن مريض"}
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              {t.searchPatientSubtitle ||
                "أدخل رقم الهوية أو الهاتف لعرض المرضى المرتبطين بعيادتك."}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <button
              onClick={() => router.back()}
              className="text-sm text-teal-700 hover:text-teal-800 hover:underline"
            >
              {t.back || "رجوع"}
            </button>
          </div>
        </div>

        <PatientSearch showSelectedCard={true} />
      </div>
    </div>
  );
}
