import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Utensils } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';

function Register() {
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', weight: '', height: '', gender: 'Male', activityLevel: 'Sedentary'
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await register(formData);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4 py-12">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-xl"
            >
                <div className="flex justify-center mb-8">
                    <div className="h-12 w-12 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                        <Utensils className="h-6 w-6 text-primary-foreground" />
                    </div>
                </div>
                
                <Card className="border-0 shadow-xl bg-background/80 backdrop-blur-xl">
                    <CardHeader className="space-y-1 text-center">
                        <CardTitle className="text-2xl font-bold tracking-tight">Create an account</CardTitle>
                        <CardDescription>
                            Enter your details to build your personalized profile
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {error && (
                            <div className="p-3 mb-4 text-sm font-medium text-destructive bg-destructive/10 rounded-md">
                                {error}
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input 
                                        id="name" name="name" type="text" placeholder="John Doe"
                                        value={formData.name} onChange={handleChange} required 
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input 
                                        id="email" name="email" type="email" placeholder="name@example.com"
                                        value={formData.email} onChange={handleChange} required 
                                    />
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input 
                                    id="password" name="password" type="password"
                                    value={formData.password} onChange={handleChange} required 
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="weight">Weight (kg)</Label>
                                    <Input 
                                        id="weight" name="weight" type="number" placeholder="70"
                                        value={formData.weight} onChange={handleChange} required 
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="height">Height (cm)</Label>
                                    <Input 
                                        id="height" name="height" type="number" placeholder="175"
                                        value={formData.height} onChange={handleChange} required 
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="gender">Gender</Label>
                                    <select 
                                        id="gender" name="gender" 
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                        value={formData.gender} onChange={handleChange}
                                    >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="activityLevel">Activity Level</Label>
                                    <select 
                                        id="activityLevel" name="activityLevel" 
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                        value={formData.activityLevel} onChange={handleChange}
                                    >
                                        <option value="Sedentary">Sedentary</option>
                                        <option value="Lightly Active">Lightly Active</option>
                                        <option value="Moderately Active">Moderately Active</option>
                                        <option value="Very Active">Very Active</option>
                                    </select>
                                </div>
                            </div>

                            <Button className="w-full mt-6" type="submit" disabled={loading}>
                                {loading ? 'Creating account...' : 'Sign up'}
                            </Button>
                        </form>
                        
                        <div className="mt-6 text-center text-sm">
                            <span className="text-muted-foreground">Already have an account? </span>
                            <Link to="/login" className="font-medium text-primary hover:underline">
                                Sign in
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}

export default Register;
