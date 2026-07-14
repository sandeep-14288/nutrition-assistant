import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import mealService from '../services/mealService';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Save, CheckCircle2, Flame, Dumbbell, Wheat, Droplets } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

function LogMeal() {
    const [query, setQuery] = useState('');
    const [nutritionData, setNutritionData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setNutritionData(null);
        setSuccess('');

        try {
            const data = await mealService.searchFood(query, token);
            setNutritionData(data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch nutrition data');
        } finally {
            setLoading(false);
        }
    };

    const handleSaveMeal = async () => {
        setSaving(true);
        setError('');
        
        try {
            const mealData = {
                date: new Date(),
                foods: [
                    {
                        name: query,
                        calories: nutritionData.calories,
                        carbs: nutritionData.carbs,
                        proteins: nutritionData.protein,
                        fats: nutritionData.fat
                    }
                ]
            };
            await mealService.logMeal(mealData, token);
            setSuccess('Meal successfully saved to your diary!');
            setTimeout(() => {
                navigate('/dashboard');
            }, 1500);
        } catch (err) {
            setError('Failed to save meal');
            setSaving(false);
        }
    };

    const MacroCard = ({ title, value, unit, icon: Icon, colorClass }) => (
        <Card className="bg-card border-border shadow-sm overflow-hidden group">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center relative">
                <div className={`absolute top-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity ${colorClass.replace('text-', 'bg-')}`}></div>
                <Icon className={`h-6 w-6 mb-2 ${colorClass}`} />
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">{title}</p>
                <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold tracking-tight">{Math.round(value)}</span>
                    <span className="text-sm font-semibold text-muted-foreground">{unit}</span>
                </div>
            </CardContent>
        </Card>
    );

    return (
        <div className="container py-8 max-w-4xl mx-auto space-y-8">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <h2 className="text-3xl font-bold tracking-tight">Log a Meal</h2>
                <p className="text-muted-foreground mt-1">Search for any food or meal combination to see its exact macro breakdown.</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
                <Card className="shadow-lg border-0 bg-background/50 backdrop-blur-md">
                    <CardHeader>
                        <CardTitle>Search Database</CardTitle>
                        <CardDescription>Powered by Calorie Ninjas API</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {error && (
                            <div className="p-3 mb-4 text-sm font-medium text-destructive bg-destructive/10 rounded-md">
                                {error}
                            </div>
                        )}
                        <form onSubmit={handleSearch} className="flex gap-3">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input 
                                    className="pl-10 h-12 text-base shadow-sm"
                                    type="text" 
                                    placeholder="e.g., '1 large apple and 2 eggs'" 
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    required
                                />
                            </div>
                            <Button type="submit" size="lg" disabled={loading} className="px-8 shadow-sm h-12">
                                {loading ? 'Searching...' : 'Analyze'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>

            <AnimatePresence>
                {nutritionData && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 20 }} 
                        animate={{ opacity: 1, scale: 1, y: 0 }} 
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                    >
                        <Card className="shadow-xl border-primary/20 bg-background/80 backdrop-blur-xl overflow-hidden">
                            <CardHeader className="bg-muted/30 border-b pb-6">
                                <CardTitle className="flex justify-between items-center">
                                    <span className="capitalize">{query}</span>
                                    {nutritionData.isMock && (
                                        <span className="badge bg-warning/20 text-warning text-xs px-2 py-1 rounded-md">Mock Data</span>
                                    )}
                                </CardTitle>
                                <CardDescription>Nutritional breakdown for your search</CardDescription>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <MacroCard title="Calories" value={nutritionData.calories} unit="kcal" icon={Flame} colorClass="text-orange-500" />
                                    <MacroCard title="Protein" value={nutritionData.protein} unit="g" icon={Dumbbell} colorClass="text-red-500" />
                                    <MacroCard title="Carbs" value={nutritionData.carbs} unit="g" icon={Wheat} colorClass="text-blue-500" />
                                    <MacroCard title="Fats" value={nutritionData.fat} unit="g" icon={Droplets} colorClass="text-yellow-500" />
                                </div>
                                
                                <AnimatePresence>
                                    {success && (
                                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-6 p-4 bg-primary/10 text-primary rounded-lg flex items-center gap-3">
                                            <CheckCircle2 className="h-5 w-5" />
                                            <span className="font-medium">{success}</span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </CardContent>
                            <CardFooter className="bg-muted/30 border-t pt-6 justify-end">
                                <Button 
                                    size="lg" 
                                    onClick={handleSaveMeal}
                                    disabled={saving || success}
                                    className="w-full md:w-auto font-semibold px-8 shadow-md"
                                >
                                    {saving ? 'Saving...' : success ? 'Saved!' : <><Save className="mr-2 h-4 w-4" /> Save Meal to Diary</>}
                                </Button>
                            </CardFooter>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default LogMeal;
