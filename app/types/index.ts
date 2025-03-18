// コースの型定義
export interface Course {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    chapters: Chapter[];
  }
  
  // チャプターの型定義
  export interface Chapter {
    id: string;
    title: string;
    description: string;
    slides: Slide[];
    exercise: Exercise;
  }
  
  // スライドの型定義
  export interface Slide {
    id: string;
    title: string;
    content: string;
  }
  
  // 演習問題の型定義
  export interface Exercise {
    id: string;
    title: string;
    description: string;
    initialCode: string;
    expectedOutput: string;
    hints: string[];
    solution: string;
    bugLocations: BugLocation[];
  }
  
  // バグの位置の型定義
  export interface BugLocation {
    lineNumber: number;
    description: string;
    expected: string;
  }