"use client";

import { useLanguage } from "@/context/LanguageContext";
import PatientSearch from "@/components/PatientSearch";
export default function PatientSelection() {
    const { language } = useLanguage();
    const { selectedPatient, handlePatientSelect, handleClearSelection } = useCreateAppointmentContext();

    const t = {
        title: language === "ar" ? "1. اختر المريض" : "1. Select Patient",
        desc: language === "ar"
            ? "ابحث عن المريض باستخدام رقم الهوية أو الهاتف"
            : "Search for the patient using national ID or phone",
        selectedTitle: language === "ar" ? "المريض المختار" : "Selected Patient",
        unnamed: language === "ar" ? "مريض بدون اسم" : "Unnamed patient",
        nationalId: language === "ar" ? "رقم الهوية: " : "National ID: ",
        phone: language === "ar" ? "الهاتف: " : "Phone: ",
        na: language === "ar" ? "غير متوفر" : "N/A",
        change: language === "ar" ? "تغيير" : "Change",
    };

    return (
        <div className="space-y-6">
            <div>
                <div className="mb-4">
                    <h2 className="text-lg font-semibold text-slate-900 mb-1">
                        {t.title}
                    </h2>
                    <p className="text-sm text-slate-500">
                        {t.desc}
                    </p>
                </div>

                <PatientSearch
                    onPatientSelect={handlePatientSelect}
                    showSelectedCard={false}
                />

                {/* Selected Patient Display */}
                {selectedPatient && (
                    <div className="mt-4 p-4 bg-teal-50 border border-teal-200 rounded-xl animate-in fade-in zoom-in duration-300">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-xs text-teal-700 font-medium mb-1">
                                    {t.selectedTitle}
                                </p>
                                <p className="text-base font-semibold text-slate-900">
                                    {selectedPatient.name || t.unnamed}
                                </p>
                                <p className="text-xs text-slate-600 mt-1">
                                    {t.nationalId}
                                    {selectedPatient.nationalId || t.na}
                                </p>
                                <p className="text-xs text-slate-600">
                                    {t.phone}
                                    {selectedPatient.phone || t.na}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={handleClearSelection}
                                className="text-xs text-teal-700 hover:text-teal-800 hover:underline"
                            >
                                {t.change}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
