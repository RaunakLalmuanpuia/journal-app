import Checkbox from '@/Components/Ui/Checkbox';
import InputError from '@/Components/Ui/InputError';
import InputLabel from '@/Components/Ui/InputLabel';
import PrimaryButton from '@/Components/Ui/PrimaryButton';
import TextInput from '@/Components/Ui/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { BarChart3, Calendar, Notebook, Shield } from 'lucide-react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen bg-white flex overflow-hidden">

            {/* Left Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10 bg-white">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-sm"
                >
                    {/* Header */}
                    <div className="mb-8">
                        <div className="w-10 h-10 bg-sky-500 rounded-sm flex items-center justify-center mb-6 shadow-lg shadow-sky-500/20">
                            <Shield className="w-5 h-5 text-white" />
                        </div>
                        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Welcome back</h1>
                        <p className="text-gray-600">Sign in to continue to your journal</p>
                    </div>

                    {status && (
                        <div className="mb-4 font-medium text-sm text-green-600 bg-green-50 p-3 rounded-sm border border-green-100">
                            {status}
                        </div>
                    )}

                    <div className="space-y-6">
                        {/* Google Button (Visual Only as requested) */}
                        {/* Google Button - Changed from <button> to <a> */}
                        <a
                            href={route('auth.google')}
                            className="w-full h-11 bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 rounded-sm font-medium flex items-center justify-center transition-colors cursor-pointer"
                        >
                            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                                <path
                                    fill="#4285F4"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="#EA4335"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            Continue with Google
                        </a>



                        {/* Actual Breeze Form Logic */}  <form onSubmit={submit} className="space-y-4">
                            <div>
                                <InputLabel htmlFor="email" value="Email" />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full rounded-sm border-gray-300 focus:border-sky-500 focus:ring-sky-500"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="password" value="Password" />
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full rounded-sm border-gray-300 focus:border-sky-500 focus:ring-sky-500"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="text-sky-600 focus:ring-sky-500 rounded-sm"
                                    />
                                    <span className="ms-2 text-sm text-gray-600">Remember me</span>
                                </label>

                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-sm text-sky-600 hover:text-sky-700 font-medium"
                                    >
                                        Forgot password?
                                    </Link>
                                )}
                            </div>

                            <PrimaryButton
                                className="w-full justify-center h-11 bg-gray-900 hover:bg-gray-800 active:bg-gray-900 focus:ring-offset-2 focus:ring-gray-900 rounded-sm"
                                disabled={processing}
                            >
                                {processing ? 'Signing in...' : 'Sign in'}
                            </PrimaryButton>
                        </form>

                        <p className="text-xs text-gray-500 text-center mt-4">
                            By signing in, you agree to our Terms and Privacy Policy
                        </p>

                        <div className="text-center pt-2">
                            <Link
                                href="/"
                                className="text-sm text-gray-500 hover:text-gray-900 inline-flex items-center transition-colors"
                            >
                                ← Back to home
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Right Side - Welcome Content */}
            <div className="hidden lg:flex flex-1 bg-gray-50 items-center justify-center p-8 border-l border-gray-100">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="max-w-md"
                >
                    <div className="mb-8">
                        <h2 className="text-3xl font-semibold text-gray-900 mb-3">
                            Transform Chaos to Clarity
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            Join thousands using KeyTag Journal to track every moment and gain complete control over their time.
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            <div className="text-center p-3">
                                <div className="text-xl font-bold text-sky-600">99.9%</div>
                                <div className="text-[10px] text-gray-500 uppercase tracking-wide mt-1">Productivity Boost</div>
                            </div>
                            <div className="text-center p-3 ">
                                <div className="text-xl font-bold text-orange-500">∞</div>
                                <div className="text-[10px] text-gray-500 uppercase tracking-wide mt-1">Tracking Points</div>
                            </div>
                            <div className="text-center p-3 ">
                                <div className="text-xl font-bold text-green-600">24/7</div>
                                <div className="text-[10px] text-gray-500 uppercase tracking-wide mt-1">Time Visibility</div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-start">
                            <div className="w-8 h-8 bg-sky-500 rounded-sm flex items-center justify-center mr-4 mt-0.5 flex-shrink-0 shadow-sm">
                                <span className="text-white text-xs font-bold">p#</span>
                            </div>
                            <div>
                                <div className="text-gray-900 font-medium text-sm">KeyTag System</div>
                                <div className="text-gray-600 text-sm mt-0.5">Track activities with p#, i#, x# tags for instant categorization</div>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="w-8 h-8 bg-cyan-500 rounded-sm flex items-center justify-center mr-4 mt-0.5 flex-shrink-0 shadow-sm">
                                <Notebook className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <div className="text-gray-900 font-medium text-sm">Interactive Dashboard</div>
                                <div className="text-gray-600 text-sm mt-0.5">Visualize patterns with spreadsheet, analytics & heatmap views</div>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="w-8 h-8 bg-green-500 rounded-sm flex items-center justify-center mr-4 mt-0.5 flex-shrink-0 shadow-sm">
                                <BarChart3 className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <div className="text-gray-900 font-medium text-sm">Deep Analytics</div>
                                <div className="text-gray-600 text-sm mt-0.5">Weekly & monthly insights to optimize your productivity</div>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="w-8 h-8 bg-purple-500 rounded-sm flex items-center justify-center mr-4 mt-0.5 flex-shrink-0 shadow-sm">
                                <Calendar className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <div className="text-gray-900 font-medium text-sm">Habit Building</div>
                                <div className="text-gray-600 text-sm mt-0.5">Build sustainable systems based on your unique patterns</div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 p-4 bg-white rounded-sm border border-gray-200 shadow-sm">
                        <p className="text-xs text-gray-500 text-center font-medium">
                            Free plan available • No credit card required
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
