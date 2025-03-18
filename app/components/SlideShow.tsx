import React, { useState } from 'react';
import Link from 'next/link';
import { Slide } from '../types';

interface SlideShowProps {
  slides: Slide[];
  chapterId: string;
  onComplete?: () => void;
}

export default function SlideShow({ slides, chapterId, onComplete }: SlideShowProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const currentSlide = slides[currentSlideIndex];
  const isLastSlide = currentSlideIndex === slides.length - 1;

  const nextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    } else if (onComplete) {
      onComplete();
    }
  };

  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          スライド {currentSlideIndex + 1} / {slides.length}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={prevSlide}
            disabled={currentSlideIndex === 0}
            className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded disabled:opacity-50"
          >
            前へ
          </button>
          {isLastSlide ? (
            <Link
              href={`/chapters/${chapterId}/editor`}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              問題を解く
            </Link>
          ) : (
            <button
              onClick={nextSlide}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              次へ
            </button>
          )}
        </div>
      </div>

      <div className="slide-content min-h-[400px]">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          {currentSlide.title}
        </h2>
        <div className="prose dark:prose-invert max-w-none">
          {currentSlide.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4 text-gray-700 dark:text-gray-300">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}