"use client"
import { useThemeStore } from "@/src/store/useThemeStore";
import { Button } from "./button";
import { Moon, SunIcon } from "lucide-react";
export default function ToggleTheme () {

    const { theme, toggleTheme } = useThemeStore();
    

    return(
        <Button content={theme === 'dark' ? <Moon/> : <SunIcon/>} event={toggleTheme} variant="ghost"/>        
    )
}