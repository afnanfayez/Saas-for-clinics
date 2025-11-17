'use client';

import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { WelcomeBanner } from '@/components/dashboard/WelcomeBanner';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { ActionCard } from '@/components/dashboard/ActionCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserCheck, CalendarClock, Users, Plus, CheckCircle } from 'lucide-react';

export default function ReceptionDashboard() {
  const { user, clinic } = useAuth();
  const { language } = useLanguage();
  const t = translations[language];

  if (!user) return null;

  return (
    <DashboardLayout title={t.receptionDashboard} subtitle={clinic?.name}>
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>

      <WelcomeBanner
        userName={user.name}
        message="Welcome"
        subtitle="Manage appointments and patient check-ins"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title={t.checkinsToday}
          value={24}
          icon={UserCheck}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
        />
        <StatsCard
          title={t.scheduledAppointments}
          value={32}
          icon={CalendarClock}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
        />
        <StatsCard
          title={t.waitingPatients}
          value={5}
          icon={Users}
          iconBgColor="bg-orange-100"
          iconColor="text-orange-600"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t.quickActions}</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ActionCard
            title={t.newAppointment}
            description="Schedule a new patient appointment"
            icon={<Plus className="w-5 h-5 text-teal-600" />}
            iconBgColor="bg-teal-100"
          />
          <ActionCard
            title={t.patientCheckin}
            description="Check in a patient for their appointment"
            icon={<CheckCircle className="w-5 h-5 text-cyan-600" />}
            iconBgColor="bg-cyan-100"
          />
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
