import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-6xl font-bold text-blue-600 dark:text-blue-400">404</h1>
        <h2 className="text-3xl font-semibold mt-4 text-gray-900 dark:text-white">ページが見つかりません</h2>
        <p className="mt-6 text-gray-600 dark:text-gray-300">
          お探しのページは存在しないか、移動した可能性があります。
        </p>
        <div className="mt-10">
          <Link
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
          >
            ホームに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}