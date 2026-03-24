import { cn } from '@/lib/utils';
import Image from 'next/image';

export type SectionVariant = 'green' | 'blue' | 'gray' | 'red';

interface SectionProps {
  className?: string;
  id?: string;
  children: React.ReactNode;
  variant?: SectionVariant;
}

export const Section = ({
  children,
  className,
  id,
  variant = 'green',
}: SectionProps) => {
  const imageSrc = `/images/notification-${variant}.png`;

  return (
    <section
      className={cn(
        'relative max-w-7xl z-1 mx-auto w-full px-4 py-8 sm:py-12 ',
        className,
      )}
      id={id}
    >
      <Image
        src={imageSrc}
        alt=""
        className="absolute top-0 left-0 -z-10"
        width={1024}
        height={256}
        loading="eager"
      />
      <div className="md:px-6 lg:px-8">{children}</div>
      <Image
        src={imageSrc}
        alt=""
        className="absolute bottom-0 right-0 -z-10 rotate-180"
        width={1024}
        height={256}
      />
    </section>
  );
};
