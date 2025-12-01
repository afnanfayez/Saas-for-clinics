import { useLanguage } from "@/context/LanguageContext";
import { CalendarIcon, UserIcon, ClockIcon, ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
export default function AppointmentForm() {
    const { language } = useLanguage();
    const {
        doctors,
        specializations,
        selectedSpecialization,
        setSelectedSpecialization,
        selectedDoctor,
        setSelectedDoctor,
        date,
        setDate,
        time,
        setTime,
        notes,
        setNotes,
        loading,
        submitting,
        handleSubmit,
        handleCancel,
    } = useCreateAppointmentContext();

    const t = {
        sectionTitle: language === "ar" ? "3. تفاصيل الحجز" : "3. Booking Details",
        sectionDesc: language === "ar" ? "أدخل تفاصيل الموعد الجديد في النموذج أدناه" : "Enter the new appointment details in the form below",
        title: language === "ar" ? "تفاصيل الموعد" : "Appointment Details",
        specialization: language === "ar" ? "التخصص" : "Specialization",
        selectSpecialization: language === "ar" ? "اختر التخصص" : "Select Specialization",
        doctor: language === "ar" ? "الدكتور" : "Doctor",
        selectDoctor: language === "ar" ? "اختر الدكتور" : "Select Doctor",
        date: language === "ar" ? "التاريخ" : "Date",
        time: language === "ar" ? "الوقت" : "Time",
        notes: language === "ar" ? "ملاحظات إضافية" : "Additional Notes",
        notesPlaceholder: language === "ar" ? "أدخل أي ملاحظات إضافية هنا..." : "Enter any additional notes here...",
        cancel: language === "ar" ? "إلغاء" : "Cancel",
        create: language === "ar" ? "حجز الموعد" : "Book Appointment",
        creating: language === "ar" ? "جاري الحجز..." : "Booking...",
    };

    return (
        <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="mb-6 text-center">
                <h2 className="text-xl font-bold text-slate-900 mb-2">
                    {t.sectionTitle}
                </h2>
                <p className="text-slate-500">
                    {t.sectionDesc}
                </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                    <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <CalendarIcon className="w-5 h-5 text-teal-600" />
                        {t.title}
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Specialization Selection */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 block">
                                {t.specialization}
                            </label>
                            <div className="relative">
                                <select
                                    value={selectedSpecialization}
                                    onChange={(e) => setSelectedSpecialization(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all appearance-none"
                                >
                                    <option value="">{t.selectSpecialization}</option>
                                    {specializations.map((spec) => (
                                        <option key={spec.id} value={spec.id}>
                                            {language === "ar" ? spec.nameAr : spec.name}
                                        </option>
                                    ))}
                                </select>
                                <div className={`absolute inset-y-0 ${language === "ar" ? "left-3" : "right-3"} flex items-center pointer-events-none text-slate-400`}>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </div>
                        </div>

                        {/* Doctor Selection */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 block">
                                {t.doctor}
                            </label>
                            <div className="relative">
                                <div className={`absolute inset-y-0 ${language === "ar" ? "right-3" : "left-3"} flex items-center pointer-events-none text-slate-400`}>
                                    <UserIcon className="w-5 h-5" />
                                </div>
                                <select
                                    value={selectedDoctor}
                                    onChange={(e) => setSelectedDoctor(e.target.value)}
                                    disabled={loading}
                                    className={`w-full ${language === "ar" ? "pr-10 pl-4" : "pl-10 pr-4"} py-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all appearance-none disabled:bg-slate-50 disabled:text-slate-400`}
                                >
                                    <option value="">{t.selectDoctor}</option>
                                    {doctors.map((doc) => (
                                        <option key={doc.id} value={doc.id}>
                                            {doc.name}
                                        </option>
                                    ))}
                                </select>
                                <div className={`absolute inset-y-0 ${language === "ar" ? "left-3" : "right-3"} flex items-center pointer-events-none text-slate-400`}>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </div>
                        </div>

                        {/* Date Picker */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 block">
                                {t.date}
                            </label>
                            <div className="relative">
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Time Picker */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 block">
                                {t.time}
                            </label>
                            <div className="relative">
                                <div className={`absolute inset-y-0 ${language === "ar" ? "right-3" : "left-3"} flex items-center pointer-events-none text-slate-400`}>
                                    <ClockIcon className="w-5 h-5" />
                                </div>
                                <input
                                    type="time"
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    className={`w-full ${language === "ar" ? "pr-10 pl-4" : "pl-10 pr-4"} py-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all`}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Additional Notes */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 block">
                            {t.notes}
                        </label>
                        <div className="relative">
                            <div className={`absolute top-3 ${language === "ar" ? "right-3" : "left-3"} pointer-events-none text-slate-400`}>
                                <ChatBubbleBottomCenterTextIcon className="w-5 h-5" />
                            </div>
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                rows={3}
                                placeholder={t.notesPlaceholder}
                                className={`w-full ${language === "ar" ? "pr-10 pl-4" : "pl-10 pr-4"} py-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all resize-none`}
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-all"
                        >
                            {t.cancel}
                        </button>
                        <button
                            type="submit"
                            disabled={submitting || !selectedDoctor || !date || !time}
                            className="px-6 py-2.5 rounded-xl bg-teal-600 text-white font-medium hover:bg-teal-700 shadow-lg shadow-teal-600/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {submitting && (
                                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            )}
                            {submitting ? t.creating : t.create}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
