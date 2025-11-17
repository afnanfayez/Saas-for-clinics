'use client';

import { useAuth } from '@/context/AuthContext';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { WelcomeBanner } from '@/components/dashboard/WelcomeBanner';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Users, FileCheck } from 'lucide-react';

export default function DoctorDashboard() {
  const { user, clinic } = useAuth();

  if (!user) return null;

  return (
    <DashboardLayout title="Doctor Dashboard" subtitle={clinic?.name}>
      <WelcomeBanner
        userName={`Dr. ${user.name}`}
        message="Welcome"
        subtitle="Manage your patients and appointments"
        gradient="from-purple-600 to-purple-700"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Today's Appointments"
          value={12}
          icon={Calendar}
          iconBgColor="bg-purple-100"
          iconColor="text-purple-600"
        />
        <StatsCard
          title="Total Patients"
          value={156}
          icon={Users}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
        />
        <StatsCard
          title="Pending Reviews"
          value={8}
          icon={FileCheck}
          iconBgColor="bg-yellow-100"
          iconColor="text-yellow-600"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Today's Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Your appointments will appear here.</p>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
