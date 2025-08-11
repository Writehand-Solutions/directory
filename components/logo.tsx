/* TEMP COMPONENT */
import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <svg
      className={className}
      viewBox="0 0 120 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Simple geometric logo design */}
      <rect
        x="0"
        y="4"
        width="8"
        height="8"
        rx="2"
        fill="currentColor"
        className="text-foreground"
      />
      <rect
        x="12"
        y="2"
        width="8"
        height="12"
        rx="2"
        fill="currentColor"
        className="text-foreground/80"
      />
      <rect
        x="24"
        y="0"
        width="8"
        height="16"
        rx="2"
        fill="currentColor"
        className="text-foreground/60"
      />

      {/* Company name */}
      <text
        x="40"
        y="11"
        fontSize="10"
        fontWeight="600"
        fill="currentColor"
        className="text-foreground font-sans"
      >
        ProjectFlow
      </text>
    </svg>
  );
};

// Icon-only version without text
export const LogoIcon = ({ className }: LogoProps) => {
  return (
    <svg
      className={className}
      viewBox="0 0 32 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Simple geometric logo design */}
      <rect
        x="0"
        y="4"
        width="8"
        height="8"
        rx="2"
        fill="currentColor"
        className="text-foreground"
      />
      <rect
        x="12"
        y="2"
        width="8"
        height="12"
        rx="2"
        fill="currentColor"
        className="text-foreground/80"
      />
      <rect
        x="24"
        y="0"
        width="8"
        height="16"
        rx="2"
        fill="currentColor"
        className="text-foreground/60"
      />
    </svg>
  );
};
