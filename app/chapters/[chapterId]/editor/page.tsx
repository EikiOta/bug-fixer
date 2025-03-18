'use client';

import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navigation from '../../../components/Navigation';
import CodeEditor from '../../../components/CodeEditor';
import { courses, getChapterById } from '../../../lib/data';

export default function EditorPage({ params }: { params: { chapterId: string } }) {
  const chapter = getChapterById(params.chapterId);
  
  if (!chapter) {
    notFound();
  }

  // チャプターが属するコースを特定
  const course = courses.find(course => 
    course.chapters.some(ch => ch.id === params.chapterId)
  );

  // 次のチャプターのIDを取得
  const courseChapters = course?.chapters || [];
  const currentChapterIndex = courseChapters.findIndex(ch => ch.id === params.chapterId);
  const nextChapterId = currentChapterIndex < courseChapters.length - 1
    ? courseChapters[currentChapterIndex + 1].id
    : null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Navigation course={course} currentChapterId={params.chapterId} />
      
      <main className="flex-grow max-w-7xl w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {chapter.title} - 演習問題
          </h1>
          
          <div className="flex space-x-4">
            <Link
              href={`/chapters/${params.chapterId}`}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              スライドに戻る
            </Link>
            
            {nextChapterId && (
              <Link
                href={`/chapters/${nextChapterId}`}
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                次のチャプターへ
              </Link>
            )}
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <CodeEditor exercise={chapter.exercise} />
        </div>
      </main>
    </div>
  );
}