"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: 'var(--bg-base)' }}>
      <div className="text-center max-w-md">
        <div className="text-5xl font-bold mono mb-4" style={{ color: 'var(--accent-rose)' }}>ERROR</div>
        <h2 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
          문제가 발생했습니다
        </h2>
        <p className="text-sm mb-6" style={{ color: 'var(--text-tertiary)' }}>
          {error.message || "알 수 없는 오류가 발생했습니다."}
        </p>
        <button
          onClick={reset}
          className="rounded-lg px-6 py-2.5 text-sm font-semibold transition-all"
          style={{
            background: 'var(--accent-cyan-dim)',
            color: 'var(--accent-cyan)',
            border: '1px solid var(--accent-cyan-dim)',
          }}
        >
          다시 시도 →
        </button>
      </div>
    </div>
  );
}
