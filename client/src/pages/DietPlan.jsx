import React, { useState, useEffect, useContext } from 'react';
import dietPlanService from '../services/dietPlanService';
import { AuthContext } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Trash2, Plus, CalendarDays } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';

function DietPlan() {
    const [plans, setPlans] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    const { token } = useContext(AuthContext);

    useEffect(() => {
        if (token) fetchPlans();
    }, [token]);

    const fetchPlans = async () => {
        try {
            const data = await dietPlanService.getPlans(token);
            setPlans(data);
        } catch (err) {
            console.error('Error fetching plans:', err);
        }
    };

    const handleCreatePlan = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            await dietPlanService.createPlan({ startDate, endDate }, token);
            setStartDate('');
            setEndDate('');
            fetchPlans();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create diet plan');
        } finally {
            setLoading(false);
        }
    };

    const handleDeletePlan = async (id) => {
        if (window.confirm('Are you sure you want to delete this diet plan?')) {
            try {
                await dietPlanService.deletePlan(id, token);
                fetchPlans();
            } catch (err) {
                console.error('Error deleting plan:', err);
            }
        }
    };

    return (
        <div className="container py-8 max-w-6xl mx-auto space-y-12">
            
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="text-center">
                <h2 className="text-4xl font-bold tracking-tight">Diet Plans</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto text-lg">Manage your nutritional timelines and set active goal durations.</p>
            </motion.div>

            {/* Create Plan Form */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="max-w-4xl mx-auto">
                <Card className="shadow-lg border-0 bg-background/50 backdrop-blur-md">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Plus className="h-5 w-5 text-primary" /> Create a New Plan
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {error && (
                            <div className="p-3 mb-4 text-sm font-medium text-destructive bg-destructive/10 rounded-md">
                                {error}
                            </div>
                        )}
                        <form onSubmit={handleCreatePlan} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                            <div className="space-y-2 md:col-span-2">
                                <Label className="text-muted-foreground">Start Date</Label>
                                <Input 
                                    type="date" 
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    required 
                                    className="h-12 text-base shadow-sm bg-background"
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label className="text-muted-foreground">End Date</Label>
                                <Input 
                                    type="date" 
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    required 
                                    className="h-12 text-base shadow-sm bg-background"
                                />
                            </div>
                            <div className="md:col-span-1">
                                <Button type="submit" size="lg" className="w-full h-12 shadow-md" disabled={loading}>
                                    {loading ? 'Saving...' : 'Add Plan'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Saved Plans List */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }} className="pt-4 border-t">
                <div className="flex items-center gap-2 mb-6">
                    <CalendarDays className="h-6 w-6 text-primary" />
                    <h3 className="text-2xl font-bold tracking-tight">Active Timelines</h3>
                </div>
                
                {plans.length === 0 ? (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-16 px-4 text-center bg-muted/30 rounded-2xl border border-dashed border-border/60">
                        <div className="h-16 w-16 bg-background rounded-full flex items-center justify-center shadow-sm mb-4">
                            <Calendar className="h-8 w-8 text-muted-foreground/50" />
                        </div>
                        <h4 className="text-lg font-semibold mb-2">No Active Plans</h4>
                        <p className="text-muted-foreground max-w-sm">You haven't created any diet plans yet. Use the form above to generate your first timeline.</p>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence>
                            {plans.map((plan, index) => (
                                <motion.div 
                                    key={plan._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                >
                                    <Card className="h-full group hover:shadow-md hover:border-primary/50 transition-all duration-300">
                                        <CardHeader className="pb-4">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <CardTitle className="text-lg">Target Schedule</CardTitle>
                                                    <CardDescription className="mt-1 flex items-center gap-1.5">
                                                        <span className="h-2 w-2 rounded-full bg-green-500"></span> Active Phase
                                                    </CardDescription>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="p-3 bg-muted/40 rounded-lg flex justify-between items-center border border-transparent group-hover:border-border/50 transition-colors">
                                                <span className="text-sm font-medium text-muted-foreground">Start</span>
                                                <span className="font-semibold text-foreground">
                                                    {new Date(plan.startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </span>
                                            </div>
                                            <div className="p-3 bg-muted/40 rounded-lg flex justify-between items-center border border-transparent group-hover:border-border/50 transition-colors">
                                                <span className="text-sm font-medium text-muted-foreground">End</span>
                                                <span className="font-semibold text-foreground">
                                                    {new Date(plan.endDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </span>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="pt-2 border-t mt-4">
                                            <Button 
                                                variant="ghost" 
                                                size="sm" 
                                                onClick={() => handleDeletePlan(plan._id)}
                                                className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
                                            >
                                                <Trash2 className="mr-2 h-4 w-4" /> Terminate Plan
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </motion.div>
        </div>
    );
}

export default DietPlan;
