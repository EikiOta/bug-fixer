'use client';

import React, { use } from 'react';
import { useRouter } from 'next/navigation';
import { notFound } from 'next/navigation';
import Navigation from '../../components/Navigation';
import SlideShow from '../../components/SlideShow';
import { courses, getChapterById } from '../../lib/data';

export default function ChapterPage({ params }: { params: Promise<{ chapterId: string }> }) {
  const resolvedParams = use(params);
  const chapterId = resolvedParams.chapterId;
  const router = useRouter();
  const chapter = getChapterById(chapterId);
  
  if (!chapter) {
    // クライアントコンポーネントでのnotFound()の代わりにリダイレクト
    router.push('/not-found');
    return null;
  }

  // チャプターが属するコースを特定
  const course = courses.find(course => 
    course.chapters.some(ch => ch.id === chapterId)
  );

  const handleSlideComplete = () => {
    router.push(`/chapters/${chapterId}/editor`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation course={course} currentChapterId={chapterId} />
      
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            {chapter.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-center mb-12">
            {chapter.description}
          </p>
          
          <SlideShow
            slides={chapter.slides}
            chapterId={chapterId}
            onComplete={handleSlideComplete}
          />
        </div>
      </main>
    </div>
  );
}