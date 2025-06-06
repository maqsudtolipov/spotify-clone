import { ReactNode } from 'react';

interface GradientBackgroundProps {
  color: string;
  className?: string;
  children: ReactNode;
}

const GradientBackground = ({
  className,
  color,
  children,
}: GradientBackgroundProps) => {
  const style = {
    height: '100%',
    backgroundImage: `linear-gradient(rgba(23, 23, 23, 0.5), rgb(23, 23, 23) 60vh),
        linear-gradient(
        ${color},
        ${color} 60vh,
        transparent 60vh,
        transparent 100%
    )`,
  };

  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
};

export default GradientBackground;
