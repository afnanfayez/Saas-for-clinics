'use client';

import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { WelcomeBanner } from '@/components/dashboard/WelcomeBanner';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { ActionCard } from '@/components/dashboard/ActionCard';
import { Badge } from '@/components/ui/badge';
import { Building2, Users, UsersRound, DollarSign, PlusCircle, BarChart, Settings } from 'lucide-react';

export default function PlatformDashboard() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <DashboardLayout
      title={t.platformDashboard}
      subtitle={t.title}
    >
      <WelcomeBanner
        userName=""
        subtitle="Manage all clinics and platform settings from here."
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          icon={Building2}
          label={t.totalClinics}
          value="24"
          variant="blue"
        />
        <StatsCard
          icon={Users}
          label={t.activeUsers}
          value="342"
          variant="teal"
        />
        <StatsCard
          icon={UsersRound}
          label={t.totalPatients}
          value="1,248"
          variant="purple"
        />
        <StatsCard
          icon={DollarSign}
          label={t.monthlyRevenue}
          value="₪45K"
          variant="yellow"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">{t.quickActions}</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ActionCard
              icon={PlusCircle}
              title={t.addNewClinic}
              description={t.registerNewClinic}
              variant="teal"
            />
            <ActionCard
              icon={BarChart}
              title={t.viewReports}
              description={t.platformAnalytics}
              variant="blue"
            />
            <ActionCard
              icon={Settings}
              title={t.settings}
              description={t.platformConfiguration}
              variant="purple"
            />
          </div>
        </div>
      </div>

      {/* Recent Clinics Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">{t.recentClinics}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.clinicName}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.location}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.status}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.users}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.actions}</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">Gaza Medical Center</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Gaza, Palestine</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant="success">{t.active}</Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">45</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <a href="#" className="text-emerald-600 hover:text-emerald-900">{t.view}</a>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">Ramallah Health Clinic</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Ramallah, Palestine</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant="success">{t.active}</Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">32</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <a href="#" className="text-teal-600 hover:text-teal-900">View</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
