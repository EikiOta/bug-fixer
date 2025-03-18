'use client';

import React, { useState, useEffect } from 'react';
import { Exercise } from '../types';
import { executeCode, checkSolution } from '../lib/utils';

interface CodeEditorProps {
  exercise: Exercise;
}

export default function CodeEditor({ exercise }: CodeEditorProps) {
  const [code, setCode] = useState(exercise.initialCode);
  const [output, setOutput] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);

  useEffect(() => {
    // エディタサイズをウィンドウに合わせる
    const handleResize = () => {
      const editor = document.getElementById('code-editor');
      if (editor) {
        const height = window.innerHeight * 0.6;
        editor.style.height = `${height}px`;
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const runCode = () => {
    const result = executeCode(code);
    setOutput(result.output);
    setError(result.error);
    
    const solved = checkSolution(code, exercise.expectedOutput);
    setIsCorrect(solved);
  };

  const showNextHint = () => {
    if (currentHintIndex < exercise.hints.length - 1) {
      setCurrentHintIndex(currentHintIndex + 1);
    }
  };

  const resetCode = () => {
    setCode(exercise.initialCode);
    setOutput([]);
    setError(null);
    setIsCorrect(false);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">{exercise.title}</h1>
        <div className="flex space-x-2">
          <button
            onClick={runCode}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            実行
          </button>
          <button
            onClick={resetCode}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            リセット
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
        <div className="flex flex-col">
          <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg mb-4">
            <h2 className="text-lg font-semibold mb-2">問題</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{exercise.description}</p>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <p className="mb-2">期待される出力: <code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">{exercise.expectedOutput}</code></p>
            </div>

            {showHints && (
              <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <h3 className="text-md font-semibold mb-2">ヒント {currentHintIndex + 1}:</h3>
                <p>{exercise.hints[currentHintIndex]}</p>
                {currentHintIndex < exercise.hints.length - 1 && (
                  <button
                    onClick={showNextHint}
                    className="mt-2 text-blue-600 dark:text-blue-400 text-sm underline"
                  >
                    次のヒントを表示
                  </button>
                )}
              </div>
            )}

            {!showHints && (
              <button
                onClick={() => setShowHints(true)}
                className="mt-2 text-blue-600 dark:text-blue-400 text-sm underline"
              >
                ヒントを表示
              </button>
            )}

            {isCorrect && (
              <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 rounded-lg">
                🎉 正解です！バグを修正できました。
              </div>
            )}
          </div>

          <textarea
            id="code-editor"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-grow p-4 font-mono text-sm bg-gray-50 dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg"
            spellCheck="false"
          />
        </div>

        <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm overflow-auto">
          <div className="mb-2 text-white">コンソール出力:</div>
          {output.length > 0 ? (
            <div>
              {output.map((line, index) => (
                <div key={index} className="whitespace-pre-wrap">
                  {'> '}{line}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 italic">コードを実行すると、結果がここに表示されます。</div>
          )}

          {error && (
            <div className="mt-4 text-red-500">
              <div className="font-bold">エラー:</div>
              <div className="whitespace-pre-wrap">{error}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}