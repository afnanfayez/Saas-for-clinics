"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";
import { useRouter } from "next/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import PatientSearch, { LookupPatient } from "@/components/PatientSearch";
import PreviousVisits, { Visit } from "@/components/PreviousVisits";

export default function CreateAppointmentPage() {
  const { language } = useLanguage();
  const t = translations[language];
  const router = useRouter();

  const [selectedPatient, setSelectedPatient] = useState<LookupPatient | null>(null);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [doctor, setDoctor] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [complaint, setComplaint] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePatientSelect = (patient: LookupPatient) => {
    setSelectedPatient(patient);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPatient) {
      alert(language === "ar" ? "يرجى اختيار مريض أولاً" : "Please select a patient first");
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Replace with actual API call
      const response = await fetch("/api/clinic/appointments/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patientId: selectedPatient.patientId,
          date: appointmentDate,
          time: appointmentTime,
          doctor,
          specialty,
          complaint,
          notes,
        }),
      });

      if (response.ok) {
        alert(
          language === "ar"
            ? "تم إنشاء الموعد بنجاح"
            : "Appointment created successfully"
        );
        router.push("/reception/dashboard");
      } else {
        throw new Error("Failed to create appointment");
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
      alert(
        language === "ar"
          ? "حدث خطأ أثناء إنشاء الموعد"
          : "An error occurred while creating the appointment"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClearForm = () => {
    setSelectedPatient(null);
    setAppointmentDate("");
    setAppointmentTime("");
    setDoctor("");
    setSpecialty("");
    setComplaint("");
    setNotes("");
  };

  // Dummy data for previous visits - In production, fetch this from API based on selectedPatient
  const dummyVisits: Visit[] = selectedPatient
    ? [
        {
          date: "2025-02-28",
          clinic: language === "ar" ? "عيادة الجلدية" : "Dermatology Clinic",
          diagnosis:
            language === "ar" ? "حساسية جلدية مزمنة" : "Chronic skin allergy",
          doctor: language === "ar" ? "د. حازم ربيع" : "Dr. Hazem Rabee",
        },
        {
          date: "2025-01-15",
          clinic: language === "ar" ? "عيادة العيون" : "Ophthalmology",
          diagnosis: language === "ar" ? "قصر نظر بسيط" : "Mild myopia",
          doctor: language === "ar" ? "د. سناء شحادة" : "Dr. Sanaa Shahada",
        },
        {
          date: "2024-12-10",
          clinic: language === "ar" ? "عيادة الأسنان" : "Dental Clinic",
          diagnosis: language === "ar" ? "تسوس الأسنان" : "Tooth decay",
          doctor: language === "ar" ? "د. أحمد الحلو" : "Dr. Ahmad Al-Helo",
        },
      ]
    : [];

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-slate-500 mb-1">
              {t.patientsManagement || "إدارة المرضى"}
            </p>
            <h1 className="text-2xl font-bold text-slate-900">
              {t.newAppointment || "موعد جديد"}
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              {language === "ar"
                ? "ابحث عن المريض وقم بإنشاء موعد جديد له"
                : "Search for a patient and create a new appointment"}
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Patient Search Section */}
          <div>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-slate-900 mb-1">
                {language === "ar" ? "1. اختر المريض" : "1. Select Patient"}
              </h2>
              <p className="text-sm text-slate-500">
                {language === "ar"
                  ? "ابحث عن المريض باستخدام رقم الهوية أو الهاتف"
                  : "Search for the patient using national ID or phone"}
              </p>
            </div>

            <PatientSearch
              onPatientSelect={handlePatientSelect}
              showSelectedCard={false}
            />

            {/* Selected Patient Display */}
            {selectedPatient && (
              <div className="mt-4 p-4 bg-teal-50 border border-teal-200 rounded-xl">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-teal-700 font-medium mb-1">
                      {language === "ar" ? "المريض المختار" : "Selected Patient"}
                    </p>
                    <p className="text-base font-semibold text-slate-900">
                      {selectedPatient.name || (language === "ar" ? "مريض بدون اسم" : "Unnamed patient")}
                    </p>
                    <p className="text-xs text-slate-600 mt-1">
                      {language === "ar" ? "رقم الهوية: " : "National ID: "}
                      {selectedPatient.nationalId || (language === "ar" ? "غير متوفر" : "N/A")}
                    </p>
                    <p className="text-xs text-slate-600">
                      {language === "ar" ? "الهاتف: " : "Phone: "}
                      {selectedPatient.phone || (language === "ar" ? "غير متوفر" : "N/A")}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedPatient(null)}
                    className="text-xs text-teal-700 hover:text-teal-800 hover:underline"
                  >
                    {language === "ar" ? "تغيير" : "Change"}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Previous Visits Section - Shows when patient is selected */}
          {selectedPatient && (
            <div>
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-slate-900 mb-1">
                  {language === "ar" ? "2. السجل الطبي" : "2. Medical History"}
                </h2>
                <p className="text-sm text-slate-500">
                  {language === "ar"
                    ? "الزيارات والتشخيصات السابقة للمريض"
                    : "Patient's previous visits and diagnoses"}
                </p>
              </div>

              <PreviousVisits visits={dummyVisits} showSummary={true} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
