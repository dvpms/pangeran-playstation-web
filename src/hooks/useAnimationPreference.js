'use client';

import { useEffect, useState } from 'react';

/**
 * Hook untuk mendeteksi preferensi animasi user & device capability
 * Berguna untuk optimize animasi di mobile & device dengan resource terbatas
 */
export function useAnimationPreference() {
  const [preferences, setPreferences] = useState({
    prefersReducedMotion: false,
    isMobile: false,
    isLowEndDevice: false,
  });

  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Check if mobile
    const isMobileDevice = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

    // Detect low-end device (optional: based on RAM, CPU)
    const isLowEndDevice = navigator.deviceMemory ? navigator.deviceMemory <= 4 : false;

    setPreferences({
      prefersReducedMotion: prefersReduced,
      isMobile: isMobileDevice,
      isLowEndDevice,
    });
  }, []);

  // Return animation configuration based on preferences
  return {
    ...preferences,
    // Disable complex animations if user prefers reduced motion
    shouldAnimate: !preferences.prefersReducedMotion,
    // Reduce stagger delay on mobile
    staggerDelay: preferences.isMobile ? 0.08 : 0.15,
    // Reduce duration on low-end devices
    duration: preferences.isLowEndDevice ? 0.3 : 0.5,
    // Disable ScrollReveal margin on mobile for better performance
    scrollMargin: preferences.isMobile ? 0 : 50,
  };
}
