'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useRouter } from 'next/navigation';
import { translations } from '@/lib/translations';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { LoginForm } from '@/components/auth/LoginForm';

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login, user } = useAuth();
  const { language, isRTL } = useLanguage();
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      // Redirect based on role
      switch (user.role) {
        case 'Admin':
          router.push('/platform/dashboard');
          break;
        case 'Manager':
          router.push('/clinic/dashboard');
          break;
        case 'Doctor':
          router.push('/doctor/dashboard');
          break;
        case 'Secretary':
          router.push('/reception/dashboard');
          break;
        case 'Patient':
          router.push('/patient/dashboard');
          break;
        default:
          router.push('/clinic/dashboard');
      }
    }
  }, [user, router]);

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    setError('');

    try {
      await login(data.email, data.password);
    } catch (err: unknown) {
      console.error('Login error:', err);
      
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosError = err as { response?: { status?: number; data?: { message?: string; error?: string } } };
        const status = axiosError.response?.status;
        const errorMessage = axiosError.response?.data?.message || axiosError.response?.data?.error;
        
        if (status === 502 || status === 500) {
          setError('Server error. Please check your backend configuration and try again.');
        } else if (status === 422) {
          setError('Validation error: ' + (errorMessage || 'Invalid input data'));
        } else if (errorMessage) {
          setError(errorMessage);
        } else {
          setError(`Login failed (HTTP ${status}). Please check your credentials.`);
        }
      } else if (err && typeof err === 'object' && 'message' in err) {
        const networkError = err as { message?: string };
        setError(networkError.message || 'Network error. Please ensure the backend server is running.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const t = translations[language];

  return (
    <AuthLayout
      title={t.title}
      subtitle={t.subtitle}
      languageSwitcher={<LanguageSwitcher />}
      demoCredentials={{
        admin: "admin@platform.com",
        manager: "manager@clinic.ps",
        doctor: "doctor@clinic.ps",
      }}
      language={language}
    >
      <LoginForm
        onSubmit={onSubmit}
        error={error}
        isSubmitting={isSubmitting}
        translations={t}
        isRTL={isRTL}
      />
    </AuthLayout>
  );
}
