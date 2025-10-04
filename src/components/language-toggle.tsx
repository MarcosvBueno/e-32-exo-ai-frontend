"use client";

import { useLanguage } from "@/lib/i18n/language-context";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "pt" : "en");
  };

  return (
    <Button
      onClick={toggleLanguage}
      variant="outline"
      size="sm"
      className="fixed top-4 right-4 z-50 gap-2 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
    >
      <Globe className="h-4 w-4" />
      <span className="font-medium">{language === "en" ? "PT" : "EN"}</span>
    </Button>
  );
}

