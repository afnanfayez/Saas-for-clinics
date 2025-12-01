"use client";

import { useLanguage } from "@/context/LanguageContext";
import PreviousVisits from "@/components/PreviousVisits";
export default function MedicalHistory() {
    const { language } = useLanguage();
    const { visits } = useCreateAppointmentContext();

    const t = {
        title: language === "ar" ? "2. السجل الطبي" : "2. Medical History",
        desc: language === "ar"
            ? "الزيارات والتشخيصات السابقة للمريض"
            : "Patient's previous visits and diagnoses",
    };

    return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="mb-4">
                <h2 className="text-lg font-semibold text-slate-900 mb-1">
                    {t.title}
                </h2>
                <p className="text-sm text-slate-500">
                    {t.desc}
                </p>
            </div>

            <PreviousVisits visits={visits} showSummary={true} />
        </div>
    );
}
