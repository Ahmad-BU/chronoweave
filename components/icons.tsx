
import React from 'react';

export const WeaveIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 20.22V3.78a.77.77 0 0 1 .5-.72l8-3a.77.77 0 0 1 1 0l3.5 1.5a.77.77 0 0 1 .5.72v16.44a.77.77 0 0 1-.5.72l-8 3a.77.77 0 0 1-1 0l-3.5-1.5a.77.77 0 0 1-.5-.72z"/>
    <path d="M7 15l10-4"/>
    <path d="M7 9l10-4"/>
  </svg>
);

export const EchoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="2" />
        <path d="M16.2 7.8c3.8 3.8 3.8 10 0 13.8" />
        <path d="M19.8 4.2c7.8 7.8 7.8 20.5 0 28.3" />
        <path d="M7.8 16.2c-3.8-3.8-3.8-10 0-13.8" />
        <path d="M4.2 19.8c-7.8-7.8-7.8-20.5 0-28.3" />
    </svg>
);

export const RippleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="1" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="9" />
    </svg>
);

export const PathIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12a8 8 0 0 1 8-8 8 8 0 0 1 8 8" />
        <path d="M4 20a8 8 0 0 0 8 0 8 8 0 0 0 8 0" />
        <path d="M4 12v8" />
        <path d="M12 4v16" />
        <path d="M20 12v8" />
    </svg>
);

export const CheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);
