'use client';

import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { translations } from '@/lib/translations';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { WelcomeBanner } from '@/components/dashboard/WelcomeBanner';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { ActionCard } from '@/components/dashboard/ActionCard';
import { Calendar, Users, UsersRound, Calculator, UserPlus, CalendarRange, BarChart } from 'lucide-react';

export default function ClinicDashboard() {
  const { clinic } = useAuth();
  const { language } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const successMessage = searchParams.get('success');
  const [flashMessage, setFlashMessage] = useState<string>(successMessage || '');
  const t = translations[language];

  // Handle flash message from URL
  useEffect(() => {
    if (successMessage) {
      router.replace('/clinic/dashboard');
      const timer = setTimeout(() => setFlashMessage(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, router]);

  return (
    <DashboardLayout
      title={t.clinicManagement}
      subtitle={clinic?.name || t.clinicManagement}
    >
      {/* Flash Message */}
      {flashMessage && (
        <div className="mb-6 p-4 bg-teal-50 border border-teal-200 rounded-lg flex items-center justify-between animate-fade-in">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-teal-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-teal-800 font-medium">{flashMessage}</p>
          </div>
          <button
            onClick={() => setFlashMessage('')}
            className="text-teal-600 hover:text-teal-800"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      <WelcomeBanner
        userName={clinic?.name || ''}
        subtitle={`${clinic?.name} - ${clinic?.address}`}
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          icon={Calendar}
          label={t.todaysAppointments}
          value="28"
          variant="blue"
        />
        <StatsCard
          icon={Users}
          label={t.activeDoctors}
          value="8"
          variant="teal"
        />
        <StatsCard
          icon={UsersRound}
          label={t.totalPatients}
          value="542"
          variant="purple"
        />
        <StatsCard
          icon={Calculator}
          label={t.thisMonth}
          value="₪12K"
          variant="yellow"
        />
      </div>

      {/* Management Actions */}
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">{t.clinicManagement}</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ActionCard
              icon={UserPlus}
              title={t.addStaff}
              description={t.doctorsSecretaries}
              onClick={() => router.push('/clinic/add-staff')}
              variant="blue"
            />
            <ActionCard
              icon={CalendarRange}
              title={t.manageSchedule}
              description={t.doctorAvailability}
              variant="teal"
            />
            <ActionCard
              icon={BarChart}
              title={t.reports}
              description={t.clinicAnalytics}
              variant="purple"
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
