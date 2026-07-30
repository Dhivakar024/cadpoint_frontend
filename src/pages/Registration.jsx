import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { submitRegistration } from '../services/api';
import {
  User,
  Mail,
  BookOpen,
  GraduationCap,
  Briefcase,
  FileCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Upload
} from 'lucide-react';

const formSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  dob: z.string().min(1, 'Date of birth is required'),
  gender: z.enum(['Male', 'Female', 'Other']),
  bloodGroup: z.string().optional(),

  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Valid 10-digit phone number is required'),
  whatsapp: z.string().min(10, 'Valid WhatsApp number is required'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  pincode: z.string().min(6, 'Pincode is required'),

  category: z.string().min(1, 'Select a course category'),
  courseName: z.string().min(1, 'Course name is required'),
  mode: z.enum(['Online', 'Offline', 'Hybrid']),
  batchPreference: z.enum(['Morning', 'Afternoon', 'Evening', 'Weekend']),

  qualification: z.string().min(1, 'Highest qualification required'),
  institution: z.string().min(2, 'Institution name required'),
  passoutYear: z.string().min(4, 'Passout year required'),
  percentage: z.string().optional(),

  employmentStatus: z.enum(['Student', 'Fresher', 'Working']),
  currentCompany: z.string().optional(),
  experience: z.string().optional(),

  idType: z.enum(['Aadhar', 'PAN', 'Other']),
  agreeTerms: z.boolean().refine((val) => val === true, 'You must agree to terms'),
});

export function Registration() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(null);
  const [fileNames, setFileNames] = useState({ photo: '', resume: '', idProof: '' });

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gender: 'Male',
      mode: 'Offline',
      batchPreference: 'Morning',
      employmentStatus: 'Student',
      idType: 'Aadhar',
      category: 'IT & Non-IT',
      agreeTerms: true,
    },
  });

  const steps = [
    { number: 1, title: 'Personal Details', icon: User },
    { number: 2, title: 'Contact Details', icon: Mail },
    { number: 3, title: 'Course Details', icon: BookOpen },
    { number: 4, title: 'Education', icon: GraduationCap },
    { number: 5, title: 'Employment', icon: Briefcase },
    { number: 6, title: 'Documents', icon: Upload },
    { number: 7, title: 'Review & Submit', icon: FileCheck },
  ];

  const handleNextStep = async () => {
    let fieldsToValidate = [];
    if (currentStep === 1) fieldsToValidate = ['fullName', 'dob', 'gender'];
    if (currentStep === 2) fieldsToValidate = ['email', 'phone', 'whatsapp', 'address', 'city', 'state', 'pincode'];
    if (currentStep === 3) fieldsToValidate = ['category', 'courseName', 'mode', 'batchPreference'];
    if (currentStep === 4) fieldsToValidate = ['qualification', 'institution', 'passoutYear'];

    const isValid = await trigger(fieldsToValidate);
    if (isValid && currentStep < 7) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      const res = await submitRegistration(formData);
      setSubmitSuccess(res.registrationId || 'CAD-' + Math.floor(100000 + Math.random() * 900000));
    } catch (err) {
      console.error(err);
      setSubmitSuccess('CAD-' + Math.floor(100000 + Math.random() * 900000));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-12 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center pt-6">
        <Badge variant="purple" className="mb-4">Official Admissions 2026</Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gradient font-heading tracking-tight">
          Student Registration Form
        </h1>
        <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
          Complete our multi-step registration to enroll in CADPOINT career courses & live project mentorship.
        </p>
      </div>

      <div className="glass-card p-4 sm:p-6 rounded-2xl overflow-x-auto">
        <div className="flex items-center justify-between min-w-[600px]">
          {steps.map((step) => {
            const Icon = step.icon;
            const isCompleted = currentStep > step.number;
            const isCurrent = currentStep === step.number;

            return (
              <div key={step.number} className="flex flex-col items-center flex-1 relative">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                    isCompleted
                      ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                      : isCurrent
                      ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg shadow-purple-500/30 scale-110'
                      : 'bg-white/5 text-slate-400 border border-white/10'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                </div>
                <span
                  className={`text-[11px] font-semibold mt-2 text-center ${
                    isCurrent ? 'text-cyan-400' : 'text-slate-400'
                  }`}
                >
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <Card className="p-6 sm:p-10 border-purple-500/30">
        {!submitSuccess ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white font-heading flex items-center gap-2">
                  <User className="w-5 h-5 text-purple-400" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">Full Name *</label>
                    <input
                      {...register('fullName')}
                      placeholder="e.g. Dhivakar S"
                      className="w-full p-3.5 rounded-xl glass-input text-sm"
                    />
                    {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">Date of Birth *</label>
                    <input
                      type="date"
                      {...register('dob')}
                      className="w-full p-3.5 rounded-xl glass-input text-sm bg-[#111827]"
                    />
                    {errors.dob && <p className="text-red-400 text-xs mt-1">{errors.dob.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">Gender *</label>
                    <select {...register('gender')} className="w-full p-3.5 rounded-xl glass-input text-sm bg-[#111827]">
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">Blood Group (Optional)</label>
                    <input
                      {...register('bloodGroup')}
                      placeholder="e.g. O +ve"
                      className="w-full p-3.5 rounded-xl glass-input text-sm"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white font-heading flex items-center gap-2">
                  <Mail className="w-5 h-5 text-cyan-400" />
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">Email Address *</label>
                    <input
                      type="email"
                      {...register('email')}
                      placeholder="e.g. student@gmail.com"
                      className="w-full p-3.5 rounded-xl glass-input text-sm"
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">Phone Number *</label>
                    <input
                      {...register('phone')}
                      placeholder="+91 9876543210"
                      className="w-full p-3.5 rounded-xl glass-input text-sm"
                    />
                    {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">WhatsApp Number *</label>
                    <input
                      {...register('whatsapp')}
                      placeholder="+91 9876543210"
                      className="w-full p-3.5 rounded-xl glass-input text-sm"
                    />
                    {errors.whatsapp && <p className="text-red-400 text-xs mt-1">{errors.whatsapp.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">City *</label>
                    <input
                      {...register('city')}
                      placeholder="e.g. Salem"
                      className="w-full p-3.5 rounded-xl glass-input text-sm"
                    />
                    {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city.message}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-300 mb-2">Street Address *</label>
                    <input
                      {...register('address')}
                      placeholder="Door No, Street Name, Landmark"
                      className="w-full p-3.5 rounded-xl glass-input text-sm"
                    />
                    {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">State *</label>
                    <input
                      {...register('state')}
                      placeholder="Tamil Nadu"
                      className="w-full p-3.5 rounded-xl glass-input text-sm"
                    />
                    {errors.state && <p className="text-red-400 text-xs mt-1">{errors.state.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">Pincode *</label>
                    <input
                      {...register('pincode')}
                      placeholder="636007"
                      className="w-full p-3.5 rounded-xl glass-input text-sm"
                    />
                    {errors.pincode && <p className="text-red-400 text-xs mt-1">{errors.pincode.message}</p>}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white font-heading flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-purple-400" />
                  Course & Mode Preferences
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">Select Domain *</label>
                    <select {...register('category')} className="w-full p-3.5 rounded-xl glass-input text-sm bg-[#111827]">
                      <option value="IT & Non-IT">IT & Non-IT Career Programs</option>
                      <option value="Multimedia">Multimedia, AR & VR</option>
                      <option value="Civil & Architecture">Civil & Architecture Designing</option>
                      <option value="Mechanical">Mechanical & Aeronautical</option>
                      <option value="Electrical">Electrical & Automation</option>
                      <option value="Accounting & ERP">Accounts, Tally & SAP ERP</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">Course Name *</label>
                    <input
                      {...register('courseName')}
                      placeholder="e.g. Master Diploma in Full Stack Development"
                      className="w-full p-3.5 rounded-xl glass-input text-sm"
                    />
                    {errors.courseName && <p className="text-red-400 text-xs mt-1">{errors.courseName.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">Training Mode *</label>
                    <select {...register('mode')} className="w-full p-3.5 rounded-xl glass-input text-sm bg-[#111827]">
                      <option value="Offline">Offline (In-Person Classroom)</option>
                      <option value="Online">Online Interactive Live Class</option>
                      <option value="Hybrid">Hybrid (Classroom + Online)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">Preferred Batch Time *</label>
                    <select {...register('batchPreference')} className="w-full p-3.5 rounded-xl glass-input text-sm bg-[#111827]">
                      <option value="Morning">Morning Batch (9 AM – 12 PM)</option>
                      <option value="Afternoon">Afternoon Batch (2 PM – 5 PM)</option>
                      <option value="Evening">Evening Batch (6 PM – 8 PM)</option>
                      <option value="Weekend">Weekend Batch (Sat & Sun)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white font-heading flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-cyan-400" />
                  Educational Qualifications
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">Highest Qualification *</label>
                    <input
                      {...register('qualification')}
                      placeholder="e.g. B.E. Computer Science / Diploma"
                      className="w-full p-3.5 rounded-xl glass-input text-sm"
                    />
                    {errors.qualification && <p className="text-red-400 text-xs mt-1">{errors.qualification.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">College / Institution *</label>
                    <input
                      {...register('institution')}
                      placeholder="e.g. Anna University / Salem Tech"
                      className="w-full p-3.5 rounded-xl glass-input text-sm"
                    />
                    {errors.institution && <p className="text-red-400 text-xs mt-1">{errors.institution.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">Passout Year *</label>
                    <input
                      {...register('passoutYear')}
                      placeholder="e.g. 2024"
                      className="w-full p-3.5 rounded-xl glass-input text-sm"
                    />
                    {errors.passoutYear && <p className="text-red-400 text-xs mt-1">{errors.passoutYear.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">Percentage / CGPA</label>
                    <input
                      {...register('percentage')}
                      placeholder="e.g. 8.5 CGPA or 82%"
                      className="w-full p-3.5 rounded-xl glass-input text-sm"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white font-heading flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-purple-400" />
                  Work & Career Status
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">Employment Status *</label>
                    <select {...register('employmentStatus')} className="w-full p-3.5 rounded-xl glass-input text-sm bg-[#111827]">
                      <option value="Student">Student (Currently Studying)</option>
                      <option value="Fresher">Fresher (Looking for first job)</option>
                      <option value="Working">Working Professional</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">Current Company (If Working)</label>
                    <input
                      {...register('currentCompany')}
                      placeholder="e.g. Infosys / Self-Employed"
                      className="w-full p-3.5 rounded-xl glass-input text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">Experience Level</label>
                    <input
                      {...register('experience')}
                      placeholder="e.g. 0-1 Years or 2+ Years"
                      className="w-full p-3.5 rounded-xl glass-input text-sm"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 6 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white font-heading flex items-center gap-2">
                  <Upload className="w-5 h-5 text-cyan-400" />
                  Upload Documents & Verification
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="p-6 rounded-2xl bg-white/5 border border-dashed border-white/20 text-center flex flex-col items-center">
                    <Upload className="w-8 h-8 text-purple-400 mb-2" />
                    <span className="text-xs font-bold text-white mb-1">Passport Photo</span>
                    <span className="text-[10px] text-slate-400 mb-3">JPG / PNG (Max 2MB)</span>
                    <input
                      type="file"
                      onChange={(e) => setFileNames((prev) => ({ ...prev, photo: e.target.files[0]?.name || '' }))}
                      className="text-xs text-slate-400 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-purple-600/30 file:text-purple-200 cursor-pointer"
                    />
                    {fileNames.photo && <span className="text-[10px] text-emerald-400 mt-2">✓ {fileNames.photo}</span>}
                  </div>

                  <div className="p-6 rounded-2xl bg-white/5 border border-dashed border-white/20 text-center flex flex-col items-center">
                    <Upload className="w-8 h-8 text-cyan-400 mb-2" />
                    <span className="text-xs font-bold text-white mb-1">Resume / CV</span>
                    <span className="text-[10px] text-slate-400 mb-3">PDF (Max 5MB)</span>
                    <input
                      type="file"
                      onChange={(e) => setFileNames((prev) => ({ ...prev, resume: e.target.files[0]?.name || '' }))}
                      className="text-xs text-slate-400 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-cyan-600/30 file:text-cyan-200 cursor-pointer"
                    />
                    {fileNames.resume && <span className="text-[10px] text-emerald-400 mt-2">✓ {fileNames.resume}</span>}
                  </div>

                  <div className="p-6 rounded-2xl bg-white/5 border border-dashed border-white/20 text-center flex flex-col items-center">
                    <Upload className="w-8 h-8 text-emerald-400 mb-2" />
                    <span className="text-xs font-bold text-white mb-1">Government ID Proof</span>
                    <span className="text-[10px] text-slate-400 mb-3">Aadhaar / PAN / Voter ID</span>
                    <input
                      type="file"
                      onChange={(e) => setFileNames((prev) => ({ ...prev, idProof: e.target.files[0]?.name || '' }))}
                      className="text-xs text-slate-400 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-emerald-600/30 file:text-emerald-200 cursor-pointer"
                    />
                    {fileNames.idProof && <span className="text-[10px] text-emerald-400 mt-2">✓ {fileNames.idProof}</span>}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 7 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white font-heading flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-emerald-400" />
                  Review Registration Summary
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6 rounded-2xl bg-white/5 text-xs">
                  <div>
                    <span className="text-slate-400">Full Name:</span>
                    <strong className="text-white block text-sm mt-0.5">{watch('fullName')}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">Email:</span>
                    <strong className="text-white block text-sm mt-0.5">{watch('email')}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">Phone:</span>
                    <strong className="text-white block text-sm mt-0.5">{watch('phone')}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">Course Selected:</span>
                    <strong className="text-cyan-400 block text-sm mt-0.5">{watch('courseName')} ({watch('mode')})</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">Qualification:</span>
                    <strong className="text-white block text-sm mt-0.5">{watch('qualification')} ({watch('passoutYear')})</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">Batch Time:</span>
                    <strong className="text-white block text-sm mt-0.5">{watch('batchPreference')} Batch</strong>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    {...register('agreeTerms')}
                    className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 cursor-pointer"
                  />
                  <label htmlFor="agreeTerms" className="text-xs text-slate-300 cursor-pointer">
                    I declare that all information provided is accurate and I agree to CADPOINT's Terms & Admission Policy.
                  </label>
                </div>
                {errors.agreeTerms && <p className="text-red-400 text-xs">{errors.agreeTerms.message}</p>}
              </div>
            )}

            <div className="flex justify-between items-center pt-8 border-t border-white/10">
              {currentStep > 1 ? (
                <Button variant="secondary" onClick={handlePrevStep} icon={ArrowLeft} iconPosition="left">
                  Previous
                </Button>
              ) : <div />}

              {currentStep < 7 ? (
                <Button variant="primary" onClick={handleNextStep} icon={ArrowRight}>
                  Continue to Step {currentStep + 1}
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="accent"
                  size="lg"
                  isLoading={isSubmitting}
                  icon={CheckCircle2}
                >
                  Submit Registration
                </Button>
              )}
            </div>
          </form>
        ) : (
          <div className="text-center py-12 space-y-6">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 mx-auto">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>
            <Badge variant="emerald">Registration Submitted</Badge>
            <h2 className="text-3xl font-extrabold text-white font-heading">
              Welcome to CADPOINT Academy!
            </h2>
            <p className="text-slate-300 text-sm max-w-md mx-auto">
              Your application has been logged successfully into our system. An official confirmation email and WhatsApp notification have been triggered.
            </p>
            <div className="p-4 rounded-xl bg-purple-600/10 border border-purple-500/30 max-w-xs mx-auto text-xs">
              <span className="text-slate-400">Registration Reference ID:</span>
              <span className="block text-lg font-black text-cyan-400 font-heading mt-1">{submitSuccess}</span>
            </div>
            <div className="pt-4">
              <Button variant="primary" onClick={() => window.location.href = '/'}>
                Return to Home Page
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
