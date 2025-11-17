'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { RegisterForm } from '@/components/auth/RegisterForm';
import apiClient from '@/lib/api';
import Cookies from 'js-cookie';

type RegistrationFormData = {
  clinic: {
    name: string;
    speciality?: string;
    address: string;
    phone: string;
    email: string;
    subscription_plan: 'Basic' | 'Standard' | 'Premium';
  };
  manager: {
    name: string;
    email: string;
    phone: string;
    password: string;
    password_confirmation: string;
  };
};

export default function JoinUsPage() {
  const { language, isRTL } = useLanguage();
  const t = translations[language];
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: RegistrationFormData, logoFile: File | null) => {
    setIsSubmitting(true);
    setError('');

    try {
      // Create FormData for multipart/form-data submission
      const formData = new FormData();
      
      // Add clinic data
      formData.append('clinic[name]', data.clinic.name);
      if (data.clinic.speciality) {
        formData.append('clinic[speciality]', data.clinic.speciality);
      }
      formData.append('clinic[address]', data.clinic.address);
      formData.append('clinic[phone]', data.clinic.phone);
      formData.append('clinic[email]', data.clinic.email);
      formData.append('clinic[subscription_plan]', data.clinic.subscription_plan);
      
      // Add manager data
      formData.append('manager[name]', data.manager.name);
      formData.append('manager[email]', data.manager.email);
      formData.append('manager[phone]', data.manager.phone);
      formData.append('manager[password]', data.manager.password);
      formData.append('manager[password_confirmation]', data.manager.password_confirmation);
      
      // Add logo if selected
      if (logoFile) {
        formData.append('logo', logoFile);
      }

      const response = await apiClient.post('/register/clinic', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Store token and user data
      if (response.data.token) {
        Cookies.set('auth_token', response.data.token, { expires: 7 });
        Cookies.set('user_data', JSON.stringify(response.data.manager), { expires: 7 });
      }

      // Redirect to clinic dashboard
      router.push('/clinic/dashboard');
    } catch (err: unknown) {
      console.error('Registration error:', err);
      
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosError = err as { response?: { status?: number; data?: { message?: string; error?: string; errors?: Record<string, string[]> } } };
        const status = axiosError.response?.status;
        const errorData = axiosError.response?.data;
        
        if (status === 422 && errorData?.errors) {
          // Validation errors
          const validationErrors = Object.entries(errorData.errors)
            .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
            .join('\n');
          setError(validationErrors);
        } else if (errorData?.message) {
          setError(errorData.message);
        } else if (status === 500) {
          setError('Server error. Please try again later.');
        } else {
          setError(`Registration failed (HTTP ${status}). Please check your information.`);
        }
      } else {
        setError('Network error. Please ensure the backend server is running.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title={t.joinTitle}
      subtitle={t.joinSubtitle}
      languageSwitcher={<LanguageSwitcher />}
      language={language}
      maxWidth="4xl"
    >
      <RegisterForm
        onSubmit={onSubmit}
        error={error}
        isSubmitting={isSubmitting}
        translations={t}
        isRTL={isRTL}
      />
    </AuthLayout>
  );
}
