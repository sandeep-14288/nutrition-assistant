import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Activity, Apple, LayoutList } from 'lucide-react';

function Home() {
    return (
        <div className="flex flex-col items-center justify-center pt-20 pb-16 px-4">
            <motion.div 
                initial={{ opacity: 0, y: -20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6 }}
                className="max-w-4xl text-center space-y-6"
            >
                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-foreground">
                    Take Control of Your <span className="text-primary">Nutrition</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    Your personalized assistant for tracking meals, designing custom diet plans, and achieving your health goals with scientifically-backed nutritional data.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <Link to="/register">
                        <Button size="lg" className="w-full sm:w-auto h-12 px-8 text-base shadow-lg hover:shadow-xl transition-shadow">
                            Get Started
                        </Button>
                    </Link>
                    <Link to="/login">
                        <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 px-8 text-base">
                            Login
                        </Button>
                    </Link>
                </div>
            </motion.div>
            
            <motion.div 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.7, delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 max-w-6xl mx-auto"
            >
                <Card className="border-border shadow-sm hover:shadow-md transition-shadow bg-card">
                    <CardHeader>
                        <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                            <Activity className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-xl font-bold">Track Everything</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground leading-relaxed">
                            Seamlessly log your daily meals and instantly view your macro breakdowns using our integrated database.
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-border shadow-sm hover:shadow-md transition-shadow bg-card">
                    <CardHeader>
                        <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                            <LayoutList className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-xl font-bold">Custom Diet Plans</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground leading-relaxed">
                            Set precise start and end dates for your specialized diet plans and monitor your adherence in real-time.
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-border shadow-sm hover:shadow-md transition-shadow bg-card">
                    <CardHeader>
                        <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                            <Apple className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-xl font-bold">Smart Guidance</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground leading-relaxed">
                            Receive insights based on your unique biometric profile (weight, height, activity level) to optimize your health.
                        </p>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}

export default Home;
