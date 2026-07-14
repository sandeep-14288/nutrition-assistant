import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Flame, Dumbbell, Wheat, Droplets, Plus } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';

function Dashboard() {
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState({ calories: 1850, protein: 120, carbs: 200, fat: 60 });

    const chartData = [
        { name: 'Protein (g)', value: stats.protein },
        { name: 'Carbs (g)', value: stats.carbs },
        { name: 'Fat (g)', value: stats.fat }
    ];

    // Premium Tailwind colors matching our HSL variables loosely for charts
    const COLORS = ['#ef4444', '#3b82f6', '#eab308'];

    return (
        <div className="container py-8 max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
                    <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                    <p className="text-muted-foreground mt-1">Welcome back, {user?.name || 'User'}! Here is your daily summary.</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
                    <Link to="/log-meal">
                        <Button size="lg" className="shadow-lg">
                            <Plus className="mr-2 h-4 w-4" /> Log New Meal
                        </Button>
                    </Link>
                </motion.div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { title: 'Calories', value: `${stats.calories} kcal`, icon: Flame, color: 'text-orange-500' },
                    { title: 'Protein', value: `${stats.protein}g`, icon: Dumbbell, color: 'text-red-500' },
                    { title: 'Carbs', value: `${stats.carbs}g`, icon: Wheat, color: 'text-blue-500' },
                    { title: 'Fats', value: `${stats.fat}g`, icon: Droplets, color: 'text-yellow-500' }
                ].map((stat, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.1 }}>
                        <Card className="hover:shadow-md transition-all duration-300">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    {stat.title}
                                </CardTitle>
                                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    +4.1% from yesterday
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Charts & Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <motion.div className="lg:col-span-2" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>Activity Timeline</CardTitle>
                            <CardDescription>Your meals logged over the last 7 days</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[300px] flex items-center justify-center border-t border-border/50 bg-muted/20 mt-4 rounded-b-xl">
                            <span className="text-muted-foreground flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                                Waiting for sufficient data to generate timeline...
                            </span>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div className="lg:col-span-1" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.5 }}>
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>Macro Distribution</CardTitle>
                            <CardDescription>Daily intake ratio</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} className="hover:opacity-80 transition-opacity outline-none" />
                                        ))}
                                    </Pie>
                                    <RechartsTooltip 
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}

export default Dashboard;
