import React, { forwardRef, useState } from 'react';

const paddingSizes = {
  none: '0',
  small: '12px',
  medium: '20px',
  large: '28px',
};

export const Card = forwardRef(function Card(
  {
    children,
    title,
    subtitle,
    image,
    imageAlt = '',
    imageHeight = '180px',
    footer,
    variant = 'elevated', // 'elevated' | 'outlined' | 'filled'
    padding = 'medium',
    borderRadius = '12px',
    width,
    bgColor = '#ffffff',
    textColor = '#111827',
    accentColor = '#4f46e5',
    hoverable = false,
    onClick,
    style: styleOverride,
    ...rest
  },
  ref
) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const clickable = typeof onClick === 'function';
  const lift = (hoverable || clickable) && isHovered;
  const pad = paddingSizes[padding] ?? padding;

  const variantStyles = {
    elevated: {
      backgroundColor: bgColor,
      border: '1px solid rgba(0,0,0,0.04)',
      boxShadow: lift
        ? '0 12px 28px rgba(0,0,0,0.12), 0 4px 10px rgba(0,0,0,0.06)'
        : '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
    },
    outlined: {
      backgroundColor: bgColor,
      border: `1px solid ${lift ? accentColor : '#e5e7eb'}`,
      boxShadow: lift ? '0 6px 16px rgba(0,0,0,0.08)' : 'none',
    },
    filled: {
      backgroundColor: '#f3f4f6',
      border: '1px solid transparent',
      boxShadow: lift ? '0 6px 16px rgba(0,0,0,0.08)' : 'none',
    },
  };

  const style = {
    display: 'flex',
    flexDirection: 'column',
    width,
    maxWidth: '100%',
    overflow: 'hidden',
    borderRadius,
    color: textColor,
    fontFamily: 'inherit',
    textAlign: 'left',
    cursor: clickable ? 'pointer' : 'default',
    outline: 'none',
    transform: lift ? 'translateY(-4px)' : 'translateY(0)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
    ...(variantStyles[variant] || variantStyles.elevated),
    ...(isFocused && clickable && {
      boxShadow: `0 0 0 3px #ffffff, 0 0 0 5px ${accentColor}`,
    }),
    ...styleOverride,
  };

  const clickableProps = clickable
    ? {
        role: 'button',
        tabIndex: 0,
        onClick,
        onKeyDown: (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick(e);
          }
        },
        onFocus: (e) => setIsFocused(e.target === e.currentTarget),
        onBlur: () => setIsFocused(false),
      }
    : {};

  const hasHeader = title != null || subtitle != null;

  return (
    <div
      ref={ref}
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...clickableProps}
      {...rest}
    >
      {image && (
        <img
          src={image}
          alt={imageAlt}
          style={{
            display: 'block',
            width: '100%',
            height: imageHeight,
            objectFit: 'cover',
            transform: lift ? 'scale(1.03)' : 'scale(1)',
            transition: 'transform 0.3s ease',
          }}
        />
      )}

      {(hasHeader || children != null) && (
        <div style={{ padding: pad, display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
          {hasHeader && (
            <div>
              {title != null && (
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, lineHeight: 1.3 }}>{title}</h3>
              )}
              {subtitle != null && (
                <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#6b7280', lineHeight: 1.4 }}>{subtitle}</p>
              )}
            </div>
          )}
          {children != null && (
            <div style={{ fontSize: '15px', lineHeight: 1.6, color: '#374151' }}>{children}</div>
          )}
        </div>
      )}

      {footer && (
        <div
          style={{
            padding: pad,
            paddingTop: '12px',
            borderTop: '1px solid #f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '8px',
          }}
        >
          {footer}
        </div>
      )}
    </div>
  );
});

export default Card;
