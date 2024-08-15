import clsx from 'clsx/lite';

export default function Skeleton({ count }: { count: number }) {
    const rows = new Array(count).fill(null);
    return (
        <div role="status" className="max-w-sm animate-pulse">
            {
                rows.map((_, index) => <div key={index} className={clsx(
                    index % 2 ? `md:max-w-[360px] max-w-[200px]` : `md:max-w-[300px] max-w-[180px]`,
                    index !== count - 1 && 'mb-4',
                    'h-4 bg-gray-200 rounded-full dark:bg-gray-700',
                )}></div>)
            }
        </div>
    );
}
