"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Mail, Phone, MapPin, Upload, User, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

const registrationSchema = z.object({
  clinic: z.object({
    name: z.string().min(1, 'Clinic name is required').max(100),
    speciality: z.string().max(100).optional(),
    address: z.string().min(1, 'Address is required').max(255),
    phone: z.string().min(1, 'Phone is required').max(20),
    email: z.string().email('Invalid email address').max(100),
    subscription_plan: z.enum(['Basic', 'Standard', 'Premium'], {
      errorMap: () => ({ message: 'Please select a subscription plan' }),
    }),
  }),
  manager: z.object({
    name: z.string().min(1, 'Manager name is required').max(100),
    email: z.string().email('Invalid email address').max(100),
    phone: z.string().min(1, 'Phone is required').max(20),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    password_confirmation: z.string().min(8, 'Password confirmation is required'),
  }),
}).refine((data) => data.manager.password === data.manager.password_confirmation, {
  message: "Passwords don't match",
  path: ['manager', 'password_confirmation'],
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

interface RegisterFormProps {
  onSubmit: (data: RegistrationFormData, logoFile: File | null) => Promise<void>;
  error?: string;
  isSubmitting?: boolean;
  translations: {
    clinicInfo: string;
    clinicName: string;
    speciality: string;
    address: string;
    clinicPhone: string;
    clinicEmail: string;
    subscriptionPlan: string;
    selectPlan: string;
    basic: string;
    standard: string;
    premium: string;
    logo: string;
    managerInfo: string;
    managerName: string;
    managerEmail: string;
    managerPhone: string;
    password: string;
    confirmPassword: string;
    register: string;
    registering: string;
    alreadyHaveAccount: string;
    loginHere: string;
  };
  isRTL?: boolean;
}

export function RegisterForm({
  onSubmit,
  error,
  isSubmitting = false,
  translations: t,
  isRTL = false,
}: RegisterFormProps) {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  });

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.match(/^image\/(jpeg|png|jpg|gif|svg\+xml)$/)) {
        return;
      }
      if (file.size > 2048 * 1024) {
        return;
      }
      
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = async (data: RegistrationFormData) => {
    await onSubmit(data, logoFile);
  };

  return (
    <div className="w-full">
      <Card>
        <CardContent className="pt-6">
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm whitespace-pre-line">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
            {/* Clinic Information Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-teal-500 flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                {t.clinicInfo}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Clinic Name */}
                <div>
                  <label htmlFor="clinic.name" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.clinicName} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Building2 className={cn("absolute top-3 w-5 h-5 text-gray-400", isRTL ? "right-3" : "left-3")} />
                    <input
                      id="clinic.name"
                      type="text"
                      {...register('clinic.name')}
                      className={cn(
                        "block w-full py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors text-gray-900",
                        isRTL ? "pr-10 text-right" : "pl-10",
                        errors.clinic?.name ? 'border-red-300' : 'border-gray-300'
                      )}
                      placeholder="Al-Shifa Medical Center"
                    />
                  </div>
                  {errors.clinic?.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.clinic.name.message}</p>
                  )}
                </div>

                {/* Speciality */}
                <div>
                  <label htmlFor="clinic.speciality" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.speciality}
                  </label>
                  <input
                    id="clinic.speciality"
                    type="text"
                    {...register('clinic.speciality')}
                    className={cn(
                      "block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors text-gray-900",
                      isRTL && "text-right"
                    )}
                    placeholder="General Medicine"
                  />
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                  <label htmlFor="clinic.address" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.address} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className={cn("absolute top-3 w-5 h-5 text-gray-400", isRTL ? "right-3" : "left-3")} />
                    <input
                      id="clinic.address"
                      type="text"
                      {...register('clinic.address')}
                      className={cn(
                        "block w-full py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors text-gray-900",
                        isRTL ? "pr-10 text-right" : "pl-10",
                        errors.clinic?.address ? 'border-red-300' : 'border-gray-300'
                      )}
                      placeholder="123 Main St, Gaza"
                    />
                  </div>
                  {errors.clinic?.address && (
                    <p className="mt-1 text-sm text-red-600">{errors.clinic.address.message}</p>
                  )}
                </div>

                {/* Clinic Phone */}
                <div>
                  <label htmlFor="clinic.phone" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.clinicPhone} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className={cn("absolute top-3 w-5 h-5 text-gray-400", isRTL ? "right-3" : "left-3")} />
                    <input
                      id="clinic.phone"
                      type="text"
                      {...register('clinic.phone')}
                      className={cn(
                        "block w-full py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors text-gray-900",
                        isRTL ? "pr-10 text-right" : "pl-10",
                        errors.clinic?.phone ? 'border-red-300' : 'border-gray-300'
                      )}
                      placeholder="+970-XXX-XXXXXX"
                    />
                  </div>
                  {errors.clinic?.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.clinic.phone.message}</p>
                  )}
                </div>

                {/* Clinic Email */}
                <div>
                  <label htmlFor="clinic.email" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.clinicEmail} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className={cn("absolute top-3 w-5 h-5 text-gray-400", isRTL ? "right-3" : "left-3")} />
                    <input
                      id="clinic.email"
                      type="email"
                      {...register('clinic.email')}
                      className={cn(
                        "block w-full py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors text-gray-900",
                        isRTL ? "pr-10 text-right" : "pl-10",
                        errors.clinic?.email ? 'border-red-300' : 'border-gray-300'
                      )}
                      placeholder="info@alshifa.ps"
                    />
                  </div>
                  {errors.clinic?.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.clinic.email.message}</p>
                  )}
                </div>

                {/* Subscription Plan */}
                <div>
                  <label htmlFor="clinic.subscription_plan" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.subscriptionPlan} <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="clinic.subscription_plan"
                    {...register('clinic.subscription_plan')}
                    className={cn(
                      "block w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors text-gray-900",
                      isRTL && "text-right",
                      errors.clinic?.subscription_plan ? 'border-red-300' : 'border-gray-300'
                    )}
                  >
                    <option value="">{t.selectPlan}</option>
                    <option value="Basic">{t.basic}</option>
                    <option value="Standard">{t.standard}</option>
                    <option value="Premium">{t.premium}</option>
                  </select>
                  {errors.clinic?.subscription_plan && (
                    <p className="mt-1 text-sm text-red-600">{errors.clinic.subscription_plan.message}</p>
                  )}
                </div>

                {/* Logo Upload */}
                <div>
                  <label htmlFor="logo" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.logo}
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      id="logo"
                      type="file"
                      accept="image/jpeg,image/png,image/jpg,image/gif,image/svg+xml"
                      onChange={handleLogoChange}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                    />
                    {logoPreview && (
                      <img src={logoPreview} alt="Logo preview" className="h-12 w-12 object-cover rounded-lg border-2 border-gray-200" />
                    )}
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Max 2MB (JPEG, PNG, JPG, GIF, SVG)</p>
                </div>
              </div>
            </div>

            {/* Manager Information Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-cyan-500 flex items-center gap-2">
                <User className="w-5 h-5" />
                {t.managerInfo}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Manager Name */}
                <div>
                  <label htmlFor="manager.name" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.managerName} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className={cn("absolute top-3 w-5 h-5 text-gray-400", isRTL ? "right-3" : "left-3")} />
                    <input
                      id="manager.name"
                      type="text"
                      {...register('manager.name')}
                      className={cn(
                        "block w-full py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors text-gray-900",
                        isRTL ? "pr-10 text-right" : "pl-10",
                        errors.manager?.name ? 'border-red-300' : 'border-gray-300'
                      )}
                      placeholder="Dr. Ahmad Hassan"
                    />
                  </div>
                  {errors.manager?.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.manager.name.message}</p>
                  )}
                </div>

                {/* Manager Email */}
                <div>
                  <label htmlFor="manager.email" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.managerEmail} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className={cn("absolute top-3 w-5 h-5 text-gray-400", isRTL ? "right-3" : "left-3")} />
                    <input
                      id="manager.email"
                      type="email"
                      {...register('manager.email')}
                      className={cn(
                        "block w-full py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors text-gray-900",
                        isRTL ? "pr-10 text-right" : "pl-10",
                        errors.manager?.email ? 'border-red-300' : 'border-gray-300'
                      )}
                      placeholder="ahmad@alshifa.ps"
                    />
                  </div>
                  {errors.manager?.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.manager.email.message}</p>
                  )}
                </div>

                {/* Manager Phone */}
                <div>
                  <label htmlFor="manager.phone" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.managerPhone} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className={cn("absolute top-3 w-5 h-5 text-gray-400", isRTL ? "right-3" : "left-3")} />
                    <input
                      id="manager.phone"
                      type="text"
                      {...register('manager.phone')}
                      className={cn(
                        "block w-full py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors text-gray-900",
                        isRTL ? "pr-10 text-right" : "pl-10",
                        errors.manager?.phone ? 'border-red-300' : 'border-gray-300'
                      )}
                      placeholder="+970-XXX-XXXXXX"
                    />
                  </div>
                  {errors.manager?.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.manager.phone.message}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="manager.password" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.password} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className={cn("absolute top-3 w-5 h-5 text-gray-400", isRTL ? "right-3" : "left-3")} />
                    <input
                      id="manager.password"
                      type="password"
                      {...register('manager.password')}
                      className={cn(
                        "block w-full py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors text-gray-900",
                        isRTL ? "pr-10 text-right" : "pl-10",
                        errors.manager?.password ? 'border-red-300' : 'border-gray-300'
                      )}
                      placeholder="••••••••"
                    />
                  </div>
                  {errors.manager?.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.manager.password.message}</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="md:col-span-2">
                  <label htmlFor="manager.password_confirmation" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.confirmPassword} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className={cn("absolute top-3 w-5 h-5 text-gray-400", isRTL ? "right-3" : "left-3")} />
                    <input
                      id="manager.password_confirmation"
                      type="password"
                      {...register('manager.password_confirmation')}
                      className={cn(
                        "block w-full py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors text-gray-900",
                        isRTL ? "pr-10 text-right" : "pl-10",
                        errors.manager?.password_confirmation ? 'border-red-300' : 'border-gray-300'
                      )}
                      placeholder="••••••••"
                    />
                  </div>
                  {errors.manager?.password_confirmation && (
                    <p className="mt-1 text-sm text-red-600">{errors.manager.password_confirmation.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full"
              size="lg"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                  {t.registering}
                </>
              ) : (
                t.register
              )}
            </Button>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                {t.alreadyHaveAccount}{' '}
                <a href="/login" className="text-teal-600 hover:text-teal-700 font-medium">
                  {t.loginHere}
                </a>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
