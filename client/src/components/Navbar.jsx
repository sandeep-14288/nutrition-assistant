import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Moon, Sun, Utensils } from 'lucide-react';
import { Button } from './ui/button';

function Navbar() {
    const { token, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        // Apply theme to document element
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        root.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const onLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between px-4 md:px-8">
                
                {/* Logo Section */}
                <Link to="/" className="flex items-center space-x-2">
                    <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                        <Utensils className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <span className="font-bold tracking-tight text-lg hidden md:inline-block">NutritionAssistant</span>
                </Link>

                {/* Navigation Links & Actions */}
                <div className="flex items-center space-x-4">
                    {token ? (
                        <>
                            <Link to="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                                Dashboard
                            </Link>
                            <Link to="/log-meal" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                                Log Meal
                            </Link>
                            <Link to="/diet-plan" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                                Diet Plan
                            </Link>
                            <div className="w-px h-5 bg-border mx-2 hidden md:block"></div>
                            <Button variant="ghost" size="sm" onClick={onLogout} className="text-destructive hover:text-destructive hover:bg-destructive/10 hidden md:inline-flex">
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                <Button variant="ghost" size="sm">Log in</Button>
                            </Link>
                            <Link to="/register">
                                <Button size="sm">Sign up</Button>
                            </Link>
                        </>
                    )}
                    
                    {/* Theme Toggle */}
                    <Button variant="ghost" size="icon" onClick={toggleTheme} className="ml-2 rounded-full">
                        {theme === 'light' ? (
                            <Sun className="h-5 w-5 transition-all" />
                        ) : (
                            <Moon className="h-5 w-5 transition-all" />
                        )}
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
