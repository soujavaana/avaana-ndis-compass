
import { cn } from "@/lib/utils";

interface CardStyleProps {
  variant?: 'default' | 'expanded';
  className?: string;
}

export const cardStyles = ({ variant = 'default', className }: CardStyleProps = {}) => {
  return cn(
    "bg-white rounded-lg shadow-sm border border-gray-100 p-4",
    variant === 'expanded' && "p-6",
    className
  );
};

export const cardHeaderStyles = (className?: string) => {
  return cn(
    "flex flex-col space-y-1.5",
    className
  );
};

export const cardTitleStyles = (className?: string) => {
  return cn(
    "text-lg font-semibold text-gray-900",
    className
  );
};

export const cardDescriptionStyles = (className?: string) => {
  return cn(
    "text-sm text-gray-500",
    className
  );
};

export const cardContentStyles = (className?: string) => {
  return cn(
    "p-4",
    className
  );
};

export const cardFooterStyles = (className?: string) => {
  return cn(
    "flex items-center pt-4",
    className
  );
};

