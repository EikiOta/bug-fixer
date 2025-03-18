'use client';

// コードの実行とコンソール出力の捕捉
export function executeCode(code: string): { output: string[], error: string | null } {
  const output: string[] = [];
  let error: string | null = null;

  try {
    // ブラウザ環境かどうかチェック
    if (typeof window === 'undefined') {
      return { output: ['サーバー側では実行できません'], error: null };
    }

    // コンソール出力をキャプチャするための関数
    const originalConsoleLog = console.log;
    
    // console.logをオーバーライド
    window.console.log = (...args: any[]) => {
      const message = args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
      ).join(' ');
      output.push(message);
      originalConsoleLog(...args);
    };

    // 関数内でevalを使用してコードを実行（通常はevalの使用は避けるべきだが、
    // コード学習サイトという特殊なケースなので使用する）
    // 注意: 実際のプロダクションでは、サンドボックス環境でコードを実行するべき
    const executeFunction = new Function(code);
    executeFunction();

    // console.logを元に戻す
    window.console.log = originalConsoleLog;
  } catch (e) {
    error = e instanceof Error ? e.message : '不明なエラーが発生しました';
  }

  return { output, error };
}

// バグが修正されたかをチェックする関数
export function checkSolution(code: string, expectedOutput: string): boolean {
  const { output } = executeCode(code);
  return output.some(line => line === expectedOutput);
}

// コードのシンタックスハイライト用のクラス名を生成
export function getHighlightClass(lineNumber: number, bugLocations: Array<{ lineNumber: number }>): string {
  return bugLocations.some(bug => bug.lineNumber === lineNumber) 
    ? 'bg-red-100 dark:bg-red-900/20' 
    : '';
}