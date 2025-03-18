import React from 'react';
import Link from 'next/link';
import { Course, Chapter } from '../types';

interface NavigationProps {
  course?: Course;
  currentChapterId?: string;
  showHomeLink?: boolean;
}

export default function Navigation({ course, currentChapterId, showHomeLink = true }: NavigationProps) {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-blue-600 dark:text-blue-400 font-bold text-xl">
                JSデバッグ学習
              </span>
            </Link>
          </div>

          <div className="flex items-center">
            {course && (
              <div className="hidden md:block">
                <div className="flex items-baseline space-x-4">
                  {course.chapters.map((chapter) => (
                    <Link
                      key={chapter.id}
                      href={`/chapters/${chapter.id}`}
                      className={`px-3 py-2 rounded-md text-sm font-medium ${
                        currentChapterId === chapter.id
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {chapter.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {showHomeLink && (
              <Link
                href="/"
                className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                ホームに戻る
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}