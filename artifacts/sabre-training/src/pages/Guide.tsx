import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/LanguageToggle";
import { ExerciseDetailModal } from "@/components/ExerciseDetailModal";
import { useTrainingStore } from "@/store/use-training-store";
import { t, tMove, tDesc, Language } from "@/lib/i18n";
import { ArrowLeft, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import Footer from "@/components/Footer";

// ─── SVG Illustrations ─────────────────────────────────────────────────────────

function SvgVor() {
  return (
    <img
      src={`${import.meta.env.BASE_URL}images/guide/fencing/vor.svg`}
      alt="Vor"
      className="w-full h-full object-contain"
    />
  );
}

function SvgZurueck() {
  return (
    <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="50" cy="14" r="8" stroke="currentColor" strokeWidth="2.5" />
      <line x1="50" y1="22" x2="50" y2="60" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="38" x2="65" y2="52" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="38" x2="28" y2="44" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="60" x2="40" y2="90" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="60" x2="62" y2="90" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="40" y1="90" x2="36" y2="108" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="62" y1="90" x2="66" y2="108" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <polyline points="28,44 15,36 10,42" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 72 58 L 82 58 M 82 58 L 78 54 M 82 58 L 78 62" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
    </svg>
  );
}

function SvgAusfall() {
  return (
    <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="38" cy="14" r="8" stroke="currentColor" strokeWidth="2.5" />
      <line x1="38" y1="22" x2="42" y2="52" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="40" y1="34" x2="20" y2="44" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="40" y1="34" x2="72" y2="38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="42" y1="52" x2="22" y2="72" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="42" y1="52" x2="76" y2="68" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="22" y1="72" x2="14" y2="90" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="22" y1="72" x2="28" y2="90" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="76" y1="68" x2="92" y2="88" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="76" y1="68" x2="72" y2="90" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <polyline points="72,38 85,30 90,36" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SvgQuart() {
  return (
    <img
      src={`${import.meta.env.BASE_URL}images/guide/fencing/vor.svg`}
      alt="Quart"
      className="w-full h-full object-contain"
    />
  );
}

function SvgOktav() {
  return (
    <img
      src={`${import.meta.env.BASE_URL}images/guide/fencing/vor.svg`}
      alt="Oktav"
      className="w-full h-full object-contain"
    />
  );
}

function SvgQuint() {
  return (
    <img
      src={`${import.meta.env.BASE_URL}images/guide/fencing/vor.svg`}
      alt="Quint"
      className="w-full h-full object-contain"
    />
  );
}

function SvgRiposte() {
  return (
    <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="48" cy="14" r="8" stroke="currentColor" strokeWidth="2.5" />
      <line x1="48" y1="22" x2="48" y2="60" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="48" y1="38" x2="30" y2="48" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="48" y1="38" x2="65" y2="28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 58 18 L 88 8 M 88 8 L 84 18 M 88 8 L 78 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 26 50 C 12 40 10 24 20 14 C 24 10 30 8 36 10" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeDasharray="3,2" opacity="0.7" />
      <path d="M 34 42 L 24 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <line x1="48" y1="60" x2="38" y2="88" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="48" y1="60" x2="60" y2="88" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="38" y1="88" x2="34" y2="108" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="60" y1="88" x2="64" y2="108" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function SvgEnGarde() {
  return (
    <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="50" cy="12" r="8" stroke="currentColor" strokeWidth="2.5" />
      <line x1="50" y1="20" x2="50" y2="58" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="36" x2="32" y2="50" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="36" x2="68" y2="28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 60 16 L 82 10 M 82 10 L 78 20 M 82 10 L 74 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="50" y1="58" x2="36" y2="84" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="58" x2="66" y2="80" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="36" y1="84" x2="28" y2="108" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="66" y1="80" x2="72" y2="108" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="26" y1="108" x2="74" y2="108" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}

function SvgBalestra() {
  return (
    <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="50" cy="12" r="8" stroke="currentColor" strokeWidth="2.5" />
      <line x1="50" y1="20" x2="50" y2="56" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="36" x2="34" y2="48" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="36" x2="68" y2="40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="56" x2="34" y2="80" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="56" x2="68" y2="76" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="34" y1="80" x2="28" y2="92" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="68" y1="76" x2="74" y2="92" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 26 84 Q 50 72 74 78" stroke="currentColor" strokeWidth="1.5" fill="none" strokeDasharray="3,2" opacity="0.5" strokeLinecap="round" />
      <polyline points="68,40 82,32 86,38" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="26" y1="92" x2="26" y2="108" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="74" y1="92" x2="74" y2="108" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function SvgLaufen() {
  return (
    <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="48" cy="12" r="8" stroke="currentColor" strokeWidth="2.5" />
      <line x1="48" y1="20" x2="50" y2="58" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="49" y1="36" x2="28" y2="30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="49" y1="36" x2="68" y2="44" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="58" x2="30" y2="78" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="58" x2="68" y2="72" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="30" y1="78" x2="18" y2="100" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="68" y1="72" x2="80" y2="92" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 20 96 Q 30 90 40 98" stroke="currentColor" strokeWidth="1.5" fill="none" strokeDasharray="2,2" opacity="0.5" strokeLinecap="round" />
    </svg>
  );
}

function SvgHampelmann() {
  return (
    <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="50" cy="12" r="8" stroke="currentColor" strokeWidth="2.5" />
      <line x1="50" y1="20" x2="50" y2="62" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="38" x2="18" y2="22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="38" x2="82" y2="22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="62" x2="24" y2="90" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="62" x2="76" y2="90" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="24" y1="90" x2="18" y2="108" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="76" y1="90" x2="82" y2="108" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="18" cy="22" r="3" stroke="currentColor" strokeWidth="2" />
      <circle cx="82" cy="22" r="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function SvgKnieheben() {
  return (
    <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="50" cy="12" r="8" stroke="currentColor" strokeWidth="2.5" />
      <line x1="50" y1="20" x2="50" y2="60" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="38" x2="34" y2="50" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="38" x2="68" y2="44" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="60" x2="38" y2="90" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="60" x2="62" y2="78" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="62" y1="78" x2="50" y2="65" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="38" y1="90" x2="34" y2="108" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 46 64 L 60 56" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

function SvgArmkreisen() {
  return (
    <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="50" cy="12" r="8" stroke="currentColor" strokeWidth="2.5" />
      <line x1="50" y1="20" x2="50" y2="64" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="38" x2="22" y2="28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="38" x2="78" y2="50" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 22 28 C 10 20 8 10 16 6 C 24 2 32 10 28 20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 78 50 C 90 42 94 32 86 26 C 78 20 70 28 74 38" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
      <line x1="50" y1="64" x2="40" y2="90" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="64" x2="62" y2="90" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="40" y1="90" x2="36" y2="108" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="62" y1="90" x2="66" y2="108" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function SvgSchultern() {
  return (
    <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="50" cy="12" r="8" stroke="currentColor" strokeWidth="2.5" />
      <line x1="50" y1="20" x2="50" y2="64" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="36" x2="28" y2="44" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="36" x2="72" y2="44" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 28 44 C 22 36 24 26 32 24 C 38 22 44 28 42 36" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M 72 44 C 78 36 76 26 68 24 C 62 22 56 28 58 36" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <line x1="50" y1="64" x2="40" y2="90" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="64" x2="62" y2="90" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="40" y1="90" x2="36" y2="108" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="62" y1="90" x2="66" y2="108" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function SvgRumpf() {
  return (
    <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="50" cy="12" r="8" stroke="currentColor" strokeWidth="2.5" />
      <path d="M 50 20 Q 44 42 50 62" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <line x1="48" y1="36" x2="22" y2="26" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="52" y1="40" x2="76" y2="50" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="62" x2="40" y2="90" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="62" x2="62" y2="90" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="40" y1="90" x2="36" y2="108" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="62" y1="90" x2="66" y2="108" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 38 18 A 20 20 0 0 1 62 18" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeDasharray="3,2" opacity="0.5" />
    </svg>
  );
}

function SvgSprunge() {
  return (
    <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="50" cy="10" r="8" stroke="currentColor" strokeWidth="2.5" />
      <line x1="50" y1="18" x2="50" y2="54" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="34" x2="30" y2="44" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="34" x2="70" y2="44" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="54" x2="36" y2="76" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="54" x2="64" y2="76" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="36" y1="76" x2="32" y2="96" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="64" y1="76" x2="68" y2="96" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 28 100 Q 50 108 72 100" stroke="currentColor" strokeWidth="1.5" fill="none" strokeDasharray="3,2" opacity="0.5" strokeLinecap="round" />
      <path d="M 46 100 L 46 112 M 54 100 L 54 112" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}

function SvgHocke() {
  return (
    <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="50" cy="32" r="8" stroke="currentColor" strokeWidth="2.5" />
      <line x1="50" y1="40" x2="50" y2="70" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="52" x2="30" y2="60" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="52" x2="70" y2="60" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="70" x2="30" y2="90" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="70" x2="70" y2="90" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="30" y1="90" x2="20" y2="108" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="70" y1="90" x2="80" y2="108" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="16" y1="108" x2="84" y2="108" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}

function SvgAtmen() {
  return (
    <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="50" cy="14" r="8" stroke="currentColor" strokeWidth="2.5" />
      <line x1="50" y1="22" x2="50" y2="62" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="38" x2="32" y2="48" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="38" x2="68" y2="48" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 38 30 C 36 24 40 18 50 18 C 60 18 64 24 62 30" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M 42 27 L 42 36 M 50 25 L 50 36 M 58 27 L 58 36" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" strokeDasharray="2,2" />
      <line x1="50" y1="62" x2="40" y2="90" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="62" x2="62" y2="90" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="40" y1="90" x2="36" y2="108" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="62" y1="90" x2="66" y2="108" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function SvgSchulterDehnen() {
  return (
    <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="50" cy="14" r="8" stroke="currentColor" strokeWidth="2.5" />
      <line x1="50" y1="22" x2="50" y2="64" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="38" x2="76" y2="34" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="76" y1="34" x2="68" y2="44" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="38" x2="30" y2="50" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 66 28 C 72 22 80 24 82 30" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <line x1="50" y1="64" x2="40" y2="90" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="64" x2="62" y2="90" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="40" y1="90" x2="36" y2="108" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="62" y1="90" x2="66" y2="108" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function SvgWade() {
  return (
    <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="50" cy="14" r="8" stroke="currentColor" strokeWidth="2.5" />
      <line x1="50" y1="22" x2="50" y2="60" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="38" x2="32" y2="46" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="38" x2="68" y2="46" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="60" x2="36" y2="80" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="60" x2="68" y2="80" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="36" y1="80" x2="28" y2="108" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="68" y1="80" x2="68" y2="108" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 24 100 C 24 92 32 88 32 96" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <line x1="20" y1="108" x2="44" y2="108" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

function SvgQuad() {
  return (
    <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="50" cy="14" r="8" stroke="currentColor" strokeWidth="2.5" />
      <line x1="50" y1="22" x2="50" y2="60" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="38" x2="32" y2="46" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="38" x2="68" y2="46" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="60" x2="36" y2="80" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="60" x2="68" y2="70" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="36" y1="80" x2="30" y2="108" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="68" y1="70" x2="76" y2="86" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="76" y1="86" x2="58" y2="74" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M 72 68 C 82 64 84 56 76 52" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function SvgSeite() {
  return (
    <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="50" cy="14" r="8" stroke="currentColor" strokeWidth="2.5" />
      <path d="M 50 22 Q 38 42 40 64" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <line x1="46" y1="38" x2="20" y2="30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="46" y1="42" x2="72" y2="38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="40" y1="64" x2="30" y2="90" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="40" y1="64" x2="54" y2="90" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="30" y1="90" x2="26" y2="108" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="54" y1="90" x2="58" y2="108" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="20" y1="30" x2="8" y2="18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function SvgNacken() {
  return (
    <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="50" cy="14" r="8" stroke="currentColor" strokeWidth="2.5" />
      <path d="M 50 22 Q 64 30 60 44" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M 42 18 A 20 20 0 0 1 62 24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeDasharray="3,2" />
      <line x1="60" y1="44" x2="60" y2="64" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="60" y1="52" x2="38" y2="58" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="60" y1="52" x2="78" y2="58" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="60" y1="64" x2="46" y2="90" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="60" y1="64" x2="72" y2="90" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="46" y1="90" x2="42" y2="108" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="72" y1="90" x2="76" y2="108" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function SvgGehen() {
  return (
    <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="50" cy="12" r="8" stroke="currentColor" strokeWidth="2.5" />
      <line x1="50" y1="20" x2="50" y2="58" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="36" x2="32" y2="44" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="36" x2="66" y2="48" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="58" x2="36" y2="82" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="58" x2="62" y2="82" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="36" y1="82" x2="30" y2="108" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="62" y1="82" x2="68" y2="100" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 24 108 Q 50 116 74 108" stroke="currentColor" strokeWidth="1.5" fill="none" strokeDasharray="3,2" opacity="0.4" strokeLinecap="round" />
    </svg>
  );
}

function SvgRuecken() {
  return (
    <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="50" cy="36" r="8" stroke="currentColor" strokeWidth="2.5" />
      <path d="M 50 44 Q 48 60 50 72" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <line x1="50" y1="56" x2="28" y2="62" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="56" x2="72" y2="62" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="72" x2="36" y2="92" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="72" x2="64" y2="92" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="36" y1="92" x2="32" y2="108" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="64" y1="92" x2="68" y2="108" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 28 62 L 14 50" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 72 62 L 86 50" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 14 48 C 14 40 22 36 28 40" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

// ─── Exercise data ─────────────────────────────────────────────────────────────

type Category = 'fencing' | 'warmup' | 'cooldown';

interface Exercise {
  id: string;
  category: Category;
  svgComponent: React.FC;
}

const EXERCISES: Exercise[] = [
  { id: 'vor', category: 'fencing', svgComponent: SvgVor },
  { id: 'zurueck', category: 'fencing', svgComponent: SvgZurueck },
  { id: 'ausfall', category: 'fencing', svgComponent: SvgAusfall },
  { id: 'quart', category: 'fencing', svgComponent: SvgQuart },
  { id: 'oktav', category: 'fencing', svgComponent: SvgOktav },
  { id: 'quint', category: 'fencing', svgComponent: SvgQuint },
  { id: 'riposte', category: 'fencing', svgComponent: SvgRiposte },
  { id: 'engarde', category: 'fencing', svgComponent: SvgEnGarde },
  { id: 'balestra', category: 'fencing', svgComponent: SvgBalestra },
  { id: 'w_laufen', category: 'warmup', svgComponent: SvgLaufen },
  { id: 'w_hampelmann', category: 'warmup', svgComponent: SvgHampelmann },
  { id: 'w_knieheben', category: 'warmup', svgComponent: SvgKnieheben },
  { id: 'w_armkreisen', category: 'warmup', svgComponent: SvgArmkreisen },
  { id: 'w_schultern', category: 'warmup', svgComponent: SvgSchultern },
  { id: 'w_rumpf', category: 'warmup', svgComponent: SvgRumpf },
  { id: 'w_sprunge', category: 'warmup', svgComponent: SvgSprunge },
  { id: 'w_hocke', category: 'warmup', svgComponent: SvgHocke },
  { id: 'c_atmen', category: 'cooldown', svgComponent: SvgAtmen },
  { id: 'c_schulter', category: 'cooldown', svgComponent: SvgSchulterDehnen },
  { id: 'c_wade', category: 'cooldown', svgComponent: SvgWade },
  { id: 'c_quad', category: 'cooldown', svgComponent: SvgQuad },
  { id: 'c_seite', category: 'cooldown', svgComponent: SvgSeite },
  { id: 'c_nacken', category: 'cooldown', svgComponent: SvgNacken },
  { id: 'c_gehen', category: 'cooldown', svgComponent: SvgGehen },
  { id: 'c_ruecken', category: 'cooldown', svgComponent: SvgRuecken },
];

// ─── Category config ────────────────────────────────────────────────────────────

const CATEGORY_CONFIG: Record<Category, { color: string; border: string; bg: string; badge: string }> = {
  fencing: {
    color: 'text-primary',
    border: 'border-primary/30',
    bg: 'bg-primary/5',
    badge: 'bg-primary/15 text-primary border-primary/25',
  },
  warmup: {
    color: 'text-orange-400',
    border: 'border-orange-400/30',
    bg: 'bg-orange-400/5',
    badge: 'bg-orange-400/15 text-orange-400 border-orange-400/25',
  },
  cooldown: {
    color: 'text-teal-400',
    border: 'border-teal-400/30',
    bg: 'bg-teal-400/5',
    badge: 'bg-teal-400/15 text-teal-400 border-teal-400/25',
  },
};

function getCategoryLabel(cat: Category | 'all', lang: Language): string {
  if (cat === 'all') return t('cat_all' as any, lang);
  return t(`cat_${cat}` as any, lang);
}

// ─── Exercise Card ─────────────────────────────────────────────────────────────

function ExerciseCard({ exercise, language, index, onClick }: { exercise: Exercise; language: Language; index: number; onClick: () => void }) {
  const cfg = CATEGORY_CONFIG[exercise.category];
  const SvgComp = exercise.svgComponent;
  return (
    <motion.div
      id={`move-${exercise.id}`}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      onClick={onClick}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }}
      role="button"
      tabIndex={0}
      className={`relative flex flex-col rounded-2xl border ${cfg.border} ${cfg.bg} backdrop-blur-sm overflow-hidden hover:scale-[1.02] active:scale-[0.98] transition-transform cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40`}
    >
      <div className={`flex items-center justify-center p-6 ${cfg.color}`} style={{ height: 160 }}>
        <div className="w-28 h-28">
          <SvgComp />
        </div>
      </div>
      <div className="px-5 pb-5 flex flex-col gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-white font-bold text-lg leading-tight">{tMove(exercise.id, language)}</h3>
          <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold border ${cfg.badge}`}>
            {getCategoryLabel(exercise.category, language)}
          </span>
        </div>
        <p className="text-zinc-400 text-sm leading-relaxed">{tDesc(exercise.id, language)}</p>
      </div>
    </motion.div>
  );
}

// ─── Guide Page ─────────────────────────────────────────────────────────────────

export default function Guide() {
  const { language } = useTrainingStore();
  const [activeFilter, setActiveFilter] = useState<Category | 'all'>('all');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const id = hash.slice(1);
    const timer = setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const filters: (Category | 'all')[] = ['all', 'fencing', 'warmup', 'cooldown'];

  const filtered = activeFilter === 'all'
    ? EXERCISES
    : EXERCISES.filter(e => e.category === activeFilter);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-white/8 px-4 py-4 flex items-center gap-4">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-2 text-zinc-400 hover:text-white">
            <ArrowLeft className="w-4 h-4" />
            {t('guideBack' as any, language)}
          </Button>
        </Link>
        <div className="flex-1 min-w-0">
          <h1 className="text-white font-bold text-xl truncate">{t('guideTitle' as any, language)}</h1>
        </div>
        <LanguageToggle />
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <p className="text-zinc-400">{t('guideSubtitle' as any, language)}</p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-8 items-center"
        >
          <Filter className="w-4 h-4 text-zinc-500 shrink-0" />
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={cn(
                'px-4 py-1.5 rounded-full text-sm font-semibold border transition-all',
                activeFilter === f
                  ? f === 'all'
                    ? 'bg-white/15 text-white border-white/25'
                    : `${CATEGORY_CONFIG[f as Category].badge} border`
                  : 'text-zinc-400 border-white/10 hover:text-white hover:border-white/20 bg-white/3'
              )}
            >
              {getCategoryLabel(f, language)}
            </button>
          ))}
        </motion.div>

        {/* Exercise grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeFilter}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {filtered.map((exercise, i) => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                language={language}
                index={i}
                onClick={() => setSelectedExercise(exercise)}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <ExerciseDetailModal
        exercise={selectedExercise}
        language={language}
        onClose={() => setSelectedExercise(null)}
      />
      <Footer />
    </div>
  );
}
