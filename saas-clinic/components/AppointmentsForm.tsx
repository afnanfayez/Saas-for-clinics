"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface AppointmentFormProps {
  doctors?: { name: string; specialty: string }[];
  initialDoctor?: string;
  initialDate?: string;
  initialTime?: string;
  initialNotes?: string;
  onSubmit?: (data: any) => void;
  onClear?: () => void;
}

export default function AppointmentForm({
  doctors = [],
  initialDoctor = "",
  initialDate = "",
  initialTime = "",
  initialNotes = "",
  onSubmit,
  onClear,
}: AppointmentFormProps) {
  const { language } = useLanguage();
  const [doctor, setDoctor] = useState(initialDoctor);
  const [specialty, setSpecialty] = useState("");
  const [appointmentDate, setAppointmentDate] = useState(initialDate);
  const [appointmentTime, setAppointmentTime] = useState(initialTime);
  const [notes, setNotes] = useState(initialNotes);

  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);

  // عند اختيار الطبيب يتم تحديث التخصص
  useEffect(() => {
    const selectedDoctor = doctors.find((d) => d.name === doctor);
    if (selectedDoctor) {
      setSpecialty(selectedDoctor.specialty);
    } else {
      setSpecialty("");
    }
    setAppointmentDate("");
    setAppointmentTime("");
    setAvailableDates([]);
    setAvailableTimes([]);
  }, [doctor, doctors]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ doctor, specialty, appointmentDate, appointmentTime, notes });
  };

  const handleClear = () => {
    setDoctor("");
    setSpecialty("");
    setAppointmentDate("");
    setAppointmentTime("");
    setNotes("");
    setAvailableDates([]);
    setAvailableTimes([]);
    onClear?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Doctor + Specialty */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            {language === "ar" ? "الطبيب" : "Doctor"}
          </label>
          <select
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            required
          >
            <option value="" hidden>
              {language === "ar" ? "اختر الطبيب" : "Select Doctor"}
            </option>
            {doctors.map((d) => (
              <option key={d.name} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            {language === "ar" ? "التخصص" : "Specialty"}
          </label>
          <input
            value={specialty}
            readOnly
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base bg-gray-50 cursor-not-allowed"
          />
        </div>
      </div>

      {/* Date + Time */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            {language === "ar" ? "تاريخ الموعد" : "Appointment Date"}
          </label>
          <select
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            required
          >
            <option value="" hidden>
              {language === "ar" ? "اختر التاريخ" : "Select Date"}
            </option>
            {availableDates.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            {language === "ar" ? "وقت الموعد" : "Appointment Time"}
          </label>
          <select
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            required
          >
            <option value="" hidden>
              {language === "ar" ? "اختر الوقت" : "Select Time"}
            </option>
            {availableTimes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          {language === "ar" ? "ملاحظات إضافية" : "Additional Notes"}
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder={language === "ar" ? "أي ملاحظات إضافية" : "Any additional notes"}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          rows={3}
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-2">
        <button
          type="button"
          onClick={handleClear}
          className="px-5 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition text-base font-medium"
        >
          {language === "ar" ? "مسح" : "Clear"}
        </button>
        <button
          type="submit"
          className="px-5 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition text-base font-medium"
        >
          {language === "ar" ? "حفظ الموعد" : "Save Appointment"}
        </button>
      </div>
    </form>
  );
}
