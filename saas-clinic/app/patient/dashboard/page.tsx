'use client';

import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { WelcomeBanner } from '@/components/dashboard/WelcomeBanner';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, FileText, Pill } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function PatientDashboard() {
  const { user } = useAuth();
  const { language } = useLanguage();
  const t = translations[language];

  if (!user) return null;

  return (
    <DashboardLayout title={t.patientPortal} subtitle={t.yourHealthRecords}>
      {/* Language Switcher - positioned absolutely or in header */}
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>

      <WelcomeBanner
        userName={user.name}
        message="Welcome"
        subtitle="Access your medical records and appointments"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title={t.upcomingAppointments}
          value={2}
          icon={Calendar}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
        />
        <StatsCard
          title={t.medicalRecords}
          value={18}
          icon={FileText}
          iconBgColor="bg-purple-100"
          iconColor="text-purple-600"
        />
        <StatsCard
          title={t.prescriptions}
          value={5}
          icon={Pill}
          iconBgColor="bg-teal-100"
          iconColor="text-teal-600"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t.nextAppointment}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">{t.noUpcomingAppointments}</p>
            <Button>{t.bookAppointment}</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t.recentVisits}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">{t.visitHistoryWillAppear}</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
