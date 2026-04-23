import { useState, useEffect, type ReactNode } from "react";
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

// SVG illustrations

function GuideFigure({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M18 104H102" stroke="currentColor" strokeOpacity="0.22" strokeWidth="2.5" strokeLinecap="round" />
      <g stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </g>
    </svg>
  );
}

function MotionArrow({
  d,
  opacity = 0.9,
  dash = false,
}: {
  d: string;
  opacity?: number;
  dash?: boolean;
}) {
  return (
    <path
      d={d}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={dash ? "4 4" : undefined}
      opacity={opacity}
    />
  );
}

function GhostPose({ children }: { children: ReactNode }) {
  return (
    <g opacity="0.16" strokeWidth="2.2">
      {children}
    </g>
  );
}

function SvgVor() {
  return (
    <GuideFigure>
      <GhostPose>
        <circle cx="42" cy="16" r="7" />
        <path d="M42 24L44 58" />
        <path d="M44 36L28 46" />
        <path d="M44 38L74 38" />
        <path d="M44 58L34 80L30 100" />
        <path d="M44 58L60 76L66 100" />
      </GhostPose>
      <circle cx="50" cy="16" r="7" />
      <path d="M50 24L52 58" />
      <path d="M52 36L34 46" />
      <path d="M52 38L86 38" />
      <path d="M52 58L40 78L34 100" />
      <path d="M52 58L72 74L82 100" />
      <MotionArrow d="M24 92C34 84 42 82 50 82" opacity={0.45} dash />
      <MotionArrow d="M74 24L92 38L84 40" />
    </GuideFigure>
  );
}

function SvgZurueck() {
  return (
    <GuideFigure>
      <GhostPose>
        <circle cx="56" cy="16" r="7" />
        <path d="M56 24L58 58" />
        <path d="M58 36L40 46" />
        <path d="M58 38L88 38" />
        <path d="M58 58L44 80L40 100" />
        <path d="M58 58L74 78L78 100" />
      </GhostPose>
      <circle cx="48" cy="16" r="7" />
      <path d="M48 24L50 58" />
      <path d="M50 36L34 48" />
      <path d="M50 38L82 38" />
      <path d="M50 58L34 78L28 100" />
      <path d="M50 58L68 76L74 100" />
      <MotionArrow d="M36 26L18 38L26 40" />
      <MotionArrow d="M60 88C52 84 44 82 34 82" opacity={0.45} dash />
    </GuideFigure>
  );
}

function SvgAusfall() {
  return (
    <GuideFigure>
      <GhostPose>
        <circle cx="44" cy="18" r="7" />
        <path d="M44 26L48 56" />
        <path d="M46 38L28 46" />
        <path d="M46 40L76 38" />
        <path d="M48 56L34 78L30 98" />
        <path d="M48 56L66 74L72 98" />
      </GhostPose>
      <circle cx="38" cy="16" r="7" />
      <path d="M38 24L46 56" />
      <path d="M42 38L26 48" />
      <path d="M42 40L92 36" />
      <path d="M46 56L26 74L18 100" />
      <path d="M46 56L82 70L96 100" />
      <MotionArrow d="M86 28L104 34L96 40" />
      <MotionArrow d="M56 92C66 84 74 80 84 78" opacity={0.45} dash />
    </GuideFigure>
  );
}

function SvgQuart() {
  return (
    <GuideFigure>
      <circle cx="56" cy="16" r="7" />
      <path d="M56 24L58 58" />
      <path d="M58 38L42 48" />
      <path d="M58 40L42 26" />
      <path d="M58 58L46 80L42 100" />
      <path d="M58 58L74 76L80 100" />
      <path d="M40 28L18 34" />
      <MotionArrow d="M50 20C42 24 38 30 40 38C42 46 48 48 56 50" opacity={0.65} dash />
      <MotionArrow d="M20 30L12 38L22 40" />
    </GuideFigure>
  );
}

function SvgTerz() {
  return (
    <GuideFigure>
      <circle cx="52" cy="16" r="7" />
      <path d="M52 24L54 58" />
      <path d="M54 38L38 48" />
      <path d="M54 40L72 28" />
      <path d="M54 58L42 80L38 100" />
      <path d="M54 58L70 76L74 100" />
      <path d="M72 28L96 22" />
      <MotionArrow d="M62 22C70 26 76 32 76 40C76 46 72 50 66 52" opacity={0.65} dash />
      <MotionArrow d="M92 16L104 20L96 28" />
    </GuideFigure>
  );
}

function SvgQuint() {
  return (
    <GuideFigure>
      <circle cx="54" cy="20" r="7" />
      <path d="M54 28L56 60" />
      <path d="M56 40L40 48" />
      <path d="M56 40L72 24" />
      <path d="M56 60L46 82L42 100" />
      <path d="M56 60L72 80L76 100" />
      <path d="M42 18L84 18" />
      <MotionArrow d="M48 12C54 8 64 8 70 12" opacity={0.65} dash />
      <MotionArrow d="M80 10L90 18L80 26" />
    </GuideFigure>
  );
}

function SvgRiposte() {
  return (
    <GuideFigure>
      <GhostPose>
        <circle cx="52" cy="16" r="7" />
        <path d="M52 24L54 58" />
        <path d="M54 38L38 48" />
        <path d="M54 40L40 26" />
        <path d="M54 58L42 80L38 100" />
        <path d="M54 58L70 76L74 100" />
      </GhostPose>
      <circle cx="54" cy="16" r="7" />
      <path d="M54 24L56 58" />
      <path d="M56 38L40 48" />
      <path d="M56 40L86 30" />
      <path d="M56 58L44 80L40 100" />
      <path d="M56 58L72 76L76 100" />
      <MotionArrow d="M80 22L100 26L90 34" />
      <MotionArrow d="M36 34C28 28 26 20 32 14C36 10 42 10 48 12" opacity={0.6} dash />
    </GuideFigure>
  );
}

function SvgEnGarde() {
  return (
    <GuideFigure>
      <circle cx="52" cy="16" r="7" />
      <path d="M52 24L54 58" />
      <path d="M54 38L40 48" />
      <path d="M54 40L82 34" />
      <path d="M54 58L40 80L34 100" />
      <path d="M54 58L70 76L80 100" />
      <path d="M82 34L100 30" />
      <MotionArrow d="M26 102C38 100 48 100 60 100" opacity={0.25} />
      <MotionArrow d="M62 102C72 100 82 100 94 102" opacity={0.25} />
    </GuideFigure>
  );
}

function SvgBalestra() {
  return (
    <GuideFigure>
      <circle cx="52" cy="14" r="7" />
      <path d="M52 22L54 54" />
      <path d="M54 36L38 46" />
      <path d="M54 38L82 34" />
      <path d="M54 54L40 72L34 90" />
      <path d="M54 54L72 70L80 90" />
      <path d="M82 34L98 30" />
      <MotionArrow d="M28 86C44 74 58 70 76 72" opacity={0.55} dash />
      <MotionArrow d="M40 92L44 102" opacity={0.5} />
      <MotionArrow d="M76 92L80 102" opacity={0.5} />
    </GuideFigure>
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

// ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ Exercise data ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬

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
  { id: 'terz', category: 'fencing', svgComponent: SvgTerz },
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

// ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ Category config ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬

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

// ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ Exercise Card ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬

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

// ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ Guide Page ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬

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
