"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";
import { useRouter } from "next/navigation";
import PatientSearch, { LookupPatient } from "@/components/PatientSearch";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function SearchPatientPage() {
    const { language } = useLanguage();
    const t = translations[language];
    const router = useRouter();

    const [selectedPatient, setSelectedPatient] = useState<LookupPatient | null>(null);
    const [searchPerformed, setSearchPerformed] = useState(false);

    const handlePatientSelect = (patient: LookupPatient) => {
        setSelectedPatient(patient);
        setSearchPerformed(true);
    };

    const handleRegisterNew = () => {
        router.push("/reception/patients/register");
    };

    const handleClear = () => {
        setSelectedPatient(null);
        setSearchPerformed(false);
    };

    return (
        <div className="min-h-screen bg-slate-50 py-8 px-4">
            <div className="max-w-5xl mx-auto">
                <Breadcrumbs />

                <div className="mb-6 flex items-center justify-between gap-3">
                    <div>
                        <p className="text-xs text-slate-500 mb-1">
                            {t.patientsManagement || "Patients management"}
                        </p>
                        <h1 className="text-2xl font-bold text-slate-900">
                            {t.searchPatient || "Search for a patient"}
                        </h1>
                        <p className="text-sm text-slate-500 mt-1">
                            {language === "ar"
                                ? "ابحث عن مريض موجود أو سجل مريض جديد"
                                : "Search for an existing patient or register a new one"}
                        </p>
                    </div>

                    <button
                        onClick={() => router.back()}
                        className="text-sm text-teal-700 hover:text-teal-800 hover:underline"
                    >
                        {t.back || "Back"}
                    </button>
                </div>

                <PatientSearch
                    showSelectedCard={false}
                    onPatientSelect={handlePatientSelect}
                    onSearchStart={() => {
                        setSelectedPatient(null);
                        setSearchPerformed(false);
                    }}
                />

                {selectedPatient && (
                    <div className="mt-6 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-6 py-4 border-b border-slate-100">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                                        <svg
                                            className="w-5 h-5 text-emerald-600"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-slate-900">
                                            {language === "ar" ? "تم العثور على المريض" : "Patient Found"}
                                        </h2>
                                        <p className="text-xs text-slate-600 mt-0.5">
                                            {language === "ar"
                                                ? "المريض مسجل في النظام"
                                                : "Patient is registered in the system"}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleClear}
                                    className="text-sm text-slate-600 hover:text-slate-800 hover:underline"
                                >
                                    {language === "ar" ? "مسح" : "Clear"}
                                </button>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                                        {t.fullNameLabel || "Full name"}
                                    </p>
                                    <p className="text-sm font-semibold text-slate-900">
                                        {selectedPatient.name || "-"}
                                    </p>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                                        {t.nationalIdLabel || "National ID"}
                                    </p>
                                    <p className="text-sm font-semibold text-slate-900">
                                        {selectedPatient.nationalId || "-"}
                                    </p>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                                        {t.phoneLabel || "Phone"}
                                    </p>
                                    <p className="text-sm font-semibold text-slate-900">
                                        {selectedPatient.phone || "-"}
                                    </p>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                                        {language === "ar" ? "معرف المريض" : "Patient ID"}
                                    </p>
                                    <p className="text-sm font-semibold text-slate-900">
                                        {selectedPatient.patientId || selectedPatient.raw?.patient_id || "-"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
