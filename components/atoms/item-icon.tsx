import Image from 'next/image';

interface ItemIconProps {
  src: string;
  alt: string;
  size?: number;
}

export const ItemIcon = ({ src, alt, size = 32 }: ItemIconProps) => {
  if (!src) {
    return (
      <div
        className="rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <span className="text-zinc-600 text-xs">?</span>
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className="rounded border border-zinc-700/50 bg-zinc-900"
      unoptimized
    />
  );
};
