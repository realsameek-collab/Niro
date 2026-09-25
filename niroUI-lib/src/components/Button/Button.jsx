import React, { forwardRef, useRef, useState } from 'react';

const sizeStyles = {
  small: { padding: '6px 14px', fontSize: '14px', gap: '6px', minHeight: '32px' },
  medium: { padding: '10px 20px', fontSize: '16px', gap: '8px', minHeight: '40px' },
  large: { padding: '14px 28px', fontSize: '18px', gap: '10px', minHeight: '48px' },
};

// Spinner animates via SVG SMIL so no global CSS/keyframes are needed.
const Spinner = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
    <path d="M21 12a9 9 0 0 0-9-9" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
      <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite" />
    </path>
  </svg>
);

export const Button = forwardRef(function Button(
  {
    children,
    text = 'Click Me',
    variant = 'solid', // 'solid' | 'outline' | 'ghost'
    bgColor = '#4f46e5',
    hoverColor, // defaults to a darkened bgColor
    textColor, // defaults to white for solid, bgColor otherwise
    size = 'medium',
    borderRadius = '8px',
    fullWidth = false,
    disabled = false,
    loading = false,
    leftIcon,
    rightIcon,
    type = 'button',
    onClick = () => {},
    style: styleOverride,
    ...rest
  },
  ref
) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isFocusVisible, setIsFocusVisible] = useState(false);
  const pointerDown = useRef(false);

  const isDisabled = disabled || loading;
  const active = !isDisabled;
  const sizing = sizeStyles[size] || sizeStyles.medium;

  const variantStyles = {
    solid: {
      backgroundColor: active && isHovered && hoverColor ? hoverColor : bgColor,
      color: textColor || '#ffffff',
      border: '1px solid transparent',
      filter: active && isHovered && !hoverColor ? 'brightness(0.9)' : 'none',
      boxShadow: active && isHovered ? '0 6px 16px rgba(0,0,0,0.18)' : '0 1px 3px rgba(0,0,0,0.12)',
    },
    outline: {
      backgroundColor: active && isHovered ? `${bgColor}14` : 'transparent',
      color: textColor || bgColor,
      border: `1px solid ${bgColor}`,
      boxShadow: 'none',
    },
    ghost: {
      backgroundColor: active && isHovered ? `${bgColor}14` : 'transparent',
      color: textColor || bgColor,
      border: '1px solid transparent',
      boxShadow: 'none',
    },
  };

  const style = {
    display: fullWidth ? 'flex' : 'inline-flex',
    width: fullWidth ? '100%' : undefined,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderRadius,
    fontFamily: 'inherit',
    fontWeight: 600,
    lineHeight: 1.2,
    whiteSpace: 'nowrap',
    userSelect: 'none',
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.55 : 1,
    outline: 'none',
    transform: active && isPressed ? 'scale(0.97)' : 'scale(1)',
    transition: 'background-color 0.2s ease, box-shadow 0.2s ease, transform 0.1s ease, filter 0.2s ease',
    ...sizing,
    ...(variantStyles[variant] || variantStyles.solid),
    ...(isFocusVisible && {
      boxShadow: `0 0 0 3px #ffffff, 0 0 0 5px ${bgColor}`,
    }),
    ...styleOverride,
  };

  const iconSize = parseInt(sizing.fontSize, 10);
  const content = children ?? text;

  return (
    <button
      ref={ref}
      type={type}
      style={style}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      onClick={(e) => active && onClick(e)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onPointerDown={() => {
        pointerDown.current = true;
        setIsPressed(true);
      }}
      onPointerUp={() => setIsPressed(false)}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') setIsPressed(true);
      }}
      onKeyUp={() => setIsPressed(false)}
      onFocus={() => {
        // Only show the focus ring for keyboard focus, not mouse clicks.
        setIsFocusVisible(!pointerDown.current);
        pointerDown.current = false;
      }}
      onBlur={() => setIsFocusVisible(false)}
      {...rest}
    >
      {loading ? <Spinner size={iconSize} /> : leftIcon}
      {content != null && <span>{content}</span>}
      {!loading && rightIcon}
    </button>
  );
});

export default Button;
