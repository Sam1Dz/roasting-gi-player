import clsx from 'clsx/lite';

interface LoadingScreenProps {
  loading?: boolean;
}

export default function LoadingScreen({ loading }: LoadingScreenProps) {
  return (
    <div
      className={clsx(
        loading && 'flex',
        !loading && 'hidden',
        'fixed left-0 top-0 z-20 flex h-full w-full items-center justify-center bg-black/80',
      )}
    >
      <div className="loading-anim" />
    </div>
  );
}
