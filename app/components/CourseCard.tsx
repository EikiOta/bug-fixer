import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const firstChapterId = course.chapters[0]?.id || '';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
      <div className="relative h-48 w-full">
        <Image
          src={course.thumbnail || `/api/placeholder/400/320`}
          alt={course.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">
          {course.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {course.description}
        </p>
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          {course.chapters.length}チャプター
        </div>
        <Link 
          href={`/chapters/${firstChapterId}`}
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          コースを始める
        </Link>
      </div>
    </div>
  );
}