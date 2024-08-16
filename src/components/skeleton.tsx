import clsx from 'clsx/lite';

interface SkeletonProps {
  count: number;
}

export default function Skeleton({ count }: SkeletonProps) {
  const rows = new Array(count).fill(null);
  return (
    <div role="status" className="max-w-sm animate-pulse">
      {rows.map((_, index) => (
        <div
          key={index}
          className={clsx(
            index % 2
              ? `max-w-[200px] md:max-w-[360px]`
              : `max-w-[180px] md:max-w-[300px]`,
            index !== count - 1 && 'mb-4',
            'h-4 rounded-full bg-gray-200 dark:bg-gray-700',
          )}
        ></div>
      ))}
    </div>
  );
}
