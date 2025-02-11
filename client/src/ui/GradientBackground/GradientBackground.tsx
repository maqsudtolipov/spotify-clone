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
    backgroundImage: `linear-gradient(rgba(23, 23, 23, 0.5), rgb(23, 23, 23) 40vh),
        linear-gradient(
        ${color},
        ${color} 40vh,
        transparent 40vh,
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
