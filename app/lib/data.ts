import { Course } from "../types";

export const courses: Course[] = [
  {
    id: "javascript-debugging",
    title: "JavaScriptデバッグ入門",
    description: "console.logを使ったデバッグ手法を学びましょう",
    thumbnail: "/api/placeholder/400/320", // プレースホルダー画像に変更
    chapters: [
      {
        id: "chapter-1",
        title: "デバッグの基本",
        description: "JavaScriptにおけるデバッグの基本概念を学びます",
        slides: [
          {
            id: "slide-1-1",
            title: "デバッグとは",
            content: "デバッグとは、プログラム内のバグ（不具合）を見つけて修正するプロセスです。JavaScriptでは、console.logを使って変数の値や処理の流れを確認することが基本的なデバッグ手法となります。"
          },
          {
            id: "slide-1-2",
            title: "console.logの基本",
            content: "console.log()は、引数に渡した値をコンソールに出力する関数です。例えば、console.log('Hello World')と書くと、コンソールに「Hello World」と表示されます。"
          },
          {
            id: "slide-1-3",
            title: "デバッグの流れ",
            content: "1. 問題が発生している箇所を特定する\n2. console.logで変数の値を確認する\n3. 原因を特定して修正する\n4. 正しく動作するか再確認する"
          }
        ],
        exercise: {
          id: "exercise-1",
          title: "変数の値を確認する",
          description: "以下のコードには、変数の値が正しく計算されていないバグがあります。console.logを使って変数の値を確認し、バグを修正してください。",
          initialCode: `function calculateSum(a, b) {
  let sum = a - b; // バグ: 引き算になっている
  return sum;
}

function displayResult() {
  const num1 = 5;
  const num2 = 3;
  const result = calculateSum(num1, num2);
  console.log("結果は " + result + " です。");
  return result;
}

// この関数を実行して、正しく動作するか確認してください
displayResult();`,
          expectedOutput: "結果は 8 です。",
          hints: [
            "足し算は + 演算子を使います",
            "calculateSum関数の中身を確認してみましょう"
          ],
          solution: `function calculateSum(a, b) {
  let sum = a + b; // 修正: 足し算に変更
  return sum;
}

function displayResult() {
  const num1 = 5;
  const num2 = 3;
  const result = calculateSum(num1, num2);
  console.log("結果は " + result + " です。");
  return result;
}

displayResult();`,
          bugLocations: [
            {
              lineNumber: 2,
              description: "足し算ではなく引き算になっている",
              expected: "let sum = a + b;"
            }
          ]
        }
      },
      {
        id: "chapter-2",
        title: "条件分岐のデバッグ",
        description: "if文などの条件分岐のデバッグ方法を学びます",
        slides: [
          {
            id: "slide-2-1",
            title: "条件分岐のデバッグ",
            content: "条件分岐（if文など）のデバッグでは、条件式の結果を確認することが重要です。"
          },
          {
            id: "slide-2-2",
            title: "論理演算子の確認",
            content: "&&（AND）や||（OR）などの論理演算子を使った条件では、各部分の評価結果を個別に確認すると原因がわかりやすくなります。"
          },
          {
            id: "slide-2-3",
            title: "比較演算子に注意",
            content: "==（等価演算子）と===（厳密等価演算子）の違いや、>, <, >=, <=などの比較演算子の使い方を確認しましょう。"
          }
        ],
        exercise: {
          id: "exercise-2",
          title: "条件分岐のバグを修正する",
          description: "以下のコードには、条件分岐に関するバグがあります。console.logを使って条件式の結果を確認し、バグを修正してください。",
          initialCode: `function checkGrade(score) {
  if (score > 90) {
    return "A";
  } else if (score > 80) {
    return "B";
  } else if (score > 70) {
    return "C";
  } else if (score > 60) {
    return "D";
  } else {
    return "F";
  }
}

function displayGrade() {
  const score = 90; // スコアは90点
  const grade = checkGrade(score);
  console.log("スコア " + score + " の評価は " + grade + " です。");
  return grade;
}

// この関数を実行して、正しく動作するか確認してください
displayGrade();`,
          expectedOutput: "スコア 90 の評価は A です。",
          hints: [
            "90点の場合はA評価になるべきですが、現在はB評価になっています",
            "条件式を確認してみましょう"
          ],
          solution: `function checkGrade(score) {
  if (score >= 90) { // 修正: 90以上をA評価に
    return "A";
  } else if (score > 80) {
    return "B";
  } else if (score > 70) {
    return "C";
  } else if (score > 60) {
    return "D";
  } else {
    return "F";
  }
}

function displayGrade() {
  const score = 90;
  const grade = checkGrade(score);
  console.log("スコア " + score + " の評価は " + grade + " です。");
  return grade;
}

displayGrade();`,
          bugLocations: [
            {
              lineNumber: 2,
              description: "90点ちょうどの場合がA評価に含まれていない",
              expected: "if (score >= 90) {"
            }
          ]
        }
      },
      {
        id: "chapter-3",
        title: "ループのデバッグ",
        description: "for文やwhile文などのループ処理のデバッグを学びます",
        slides: [
          {
            id: "slide-3-1",
            title: "ループのデバッグ",
            content: "ループ処理のデバッグでは、ループ内の変数の変化を追跡することが重要です。"
          },
          {
            id: "slide-3-2",
            title: "無限ループに注意",
            content: "条件式やカウンタの更新が正しくないと、無限ループになる可能性があります。ループのたびに条件が更新されているか確認しましょう。"
          },
          {
            id: "slide-3-3",
            title: "配列の処理",
            content: "配列の要素をループで処理する場合は、インデックスが適切な範囲内かを確認することが重要です。"
          }
        ],
        exercise: {
          id: "exercise-3",
          title: "ループのバグを修正する",
          description: "以下のコードには、ループに関するバグがあります。console.logを使ってループの実行状況を確認し、バグを修正してください。",
          initialCode: `function calculateSum(numbers) {
  let sum = 0;
  for (let i = 0; i <= numbers.length; i++) { // バグ: 境界条件が間違っている
    sum += numbers[i];
  }
  return sum;
}

function displaySum() {
  const numbers = [1, 2, 3, 4, 5];
  const sum = calculateSum(numbers);
  console.log("配列の合計は " + sum + " です。");
  return sum;
}

// この関数を実行して、正しく動作するか確認してください
displaySum();`,
          expectedOutput: "配列の合計は 15 です。",
          hints: [
            "配列のインデックスは0から始まり、(配列の長さ-1)で終わります",
            "境界条件を確認してみましょう"
          ],
          solution: `function calculateSum(numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) { // 修正: i < numbers.lengthに変更
    sum += numbers[i];
  }
  return sum;
}

function displaySum() {
  const numbers = [1, 2, 3, 4, 5];
  const sum = calculateSum(numbers);
  console.log("配列の合計は " + sum + " です。");
  return sum;
}

displaySum();`,
          bugLocations: [
            {
              lineNumber: 3,
              description: "配列の境界を超えたアクセスが発生している",
              expected: "for (let i = 0; i < numbers.length; i++) {"
            }
          ]
        }
      },
      {
        id: "chapter-4",
        title: "関数のデバッグ",
        description: "関数の呼び出しと戻り値のデバッグを学びます",
        slides: [
          {
            id: "slide-4-1",
            title: "関数のデバッグ",
            content: "関数のデバッグでは、引数の値と戻り値を確認することが重要です。"
          },
          {
            id: "slide-4-2",
            title: "関数の実行確認",
            content: "関数が呼び出されているか、正しい引数で呼び出されているかを確認しましょう。"
          },
          {
            id: "slide-4-3",
            title: "戻り値の検証",
            content: "関数が期待通りの値を返しているか、returnステートメントが正しく書かれているかを確認することも重要です。"
          }
        ],
        exercise: {
          id: "exercise-4",
          title: "関数のバグを修正する",
          description: "以下のコードには、関数の呼び出しや戻り値に関するバグがあります。console.logを使って関数の実行状況を確認し、バグを修正してください。",
          initialCode: `function multiplyByTwo(num) {
  const result = num * 2;
  // バグ: 戻り値が設定されていない
}

function calculateTotal(values) {
  let total = 0;
  for (let i = 0; i < values.length; i++) {
    total += multiplyByTwo(values[i]);
  }
  return total;
}

function displayTotal() {
  const values = [5, 10, 15];
  const total = calculateTotal(values);
  console.log("値を2倍にした合計は " + total + " です。");
  return total;
}

// この関数を実行して、正しく動作するか確認してください
displayTotal();`,
          expectedOutput: "値を2倍にした合計は 60 です。",
          hints: [
            "関数から値を返すにはreturn文を使います",
            "multiplyByTwo関数の中身を確認してみましょう"
          ],
          solution: `function multiplyByTwo(num) {
  const result = num * 2;
  return result; // 修正: 戻り値を設定
}

function calculateTotal(values) {
  let total = 0;
  for (let i = 0; i < values.length; i++) {
    total += multiplyByTwo(values[i]);
  }
  return total;
}

function displayTotal() {
  const values = [5, 10, 15];
  const total = calculateTotal(values);
  console.log("値を2倍にした合計は " + total + " です。");
  return total;
}

displayTotal();`,
          bugLocations: [
            {
              lineNumber: 3,
              description: "戻り値が設定されていない",
              expected: "return result;"
            }
          ]
        }
      },
      {
        id: "chapter-5",
        title: "オブジェクトのデバッグ",
        description: "オブジェクトとプロパティのデバッグを学びます",
        slides: [
          {
            id: "slide-5-1",
            title: "オブジェクトのデバッグ",
            content: "オブジェクトのデバッグでは、プロパティの値や構造を確認することが重要です。"
          },
          {
            id: "slide-5-2",
            title: "console.dirとJSON.stringify",
            content: "複雑なオブジェクトの構造を確認するには、console.dir()やJSON.stringify()が便利です。"
          },
          {
            id: "slide-5-3",
            title: "プロパティ名に注意",
            content: "プロパティ名の大文字/小文字やタイプミスがバグの原因になることがあります。正確なプロパティ名を確認しましょう。"
          }
        ],
        exercise: {
          id: "exercise-5",
          title: "オブジェクトのバグを修正する",
          description: "以下のコードには、オブジェクトのプロパティに関するバグがあります。console.logを使ってオブジェクトの内容を確認し、バグを修正してください。",
          initialCode: `function calculateTotalPrice(cart) {
  let total = 0;
  for (let i = 0; i < cart.items.length; i++) {
    const item = cart.items[i];
    total += item.price * item.quantity;
  }
  return total;
}

function displayCartTotal() {
  const cart = {
    items: [
      { name: "Tシャツ", Price: 2000, quantity: 2 }, // バグ: プロパティ名が大文字になっている
      { name: "ジーンズ", price: 3000, quantity: 1 },
      { name: "靴下", price: 500, quantity: 3 }
    ]
  };
  
  const total = calculateTotalPrice(cart);
  console.log("カートの合計金額は " + total + " 円です。");
  return total;
}

// この関数を実行して、正しく動作するか確認してください
displayCartTotal();`,
          expectedOutput: "カートの合計金額は 8500 円です。",
          hints: [
            "オブジェクトのプロパティ名は大文字/小文字が区別されます",
            "すべてのアイテムのプロパティ名の一貫性を確認してみましょう"
          ],
          solution: `function calculateTotalPrice(cart) {
  let total = 0;
  for (let i = 0; i < cart.items.length; i++) {
    const item = cart.items[i];
    total += item.price * item.quantity;
  }
  return total;
}

function displayCartTotal() {
  const cart = {
    items: [
      { name: "Tシャツ", price: 2000, quantity: 2 }, // 修正: Priceをpriceに変更
      { name: "ジーンズ", price: 3000, quantity: 1 },
      { name: "靴下", price: 500, quantity: 3 }
    ]
  };
  
  const total = calculateTotalPrice(cart);
  console.log("カートの合計金額は " + total + " 円です。");
  return total;
}

displayCartTotal();`,
          bugLocations: [
            {
              lineNumber: 12,
              description: "プロパティ名が大文字になっている",
              expected: '{ name: "Tシャツ", price: 2000, quantity: 2 }'
            }
          ]
        }
      }
    ]
  }
];

// チャプターIDからチャプターを取得する関数
export function getChapterById(chapterId: string): Chapter | undefined {
  for (const course of courses) {
    const chapter = course.chapters.find(ch => ch.id === chapterId);
    if (chapter) {
      return chapter;
    }
  }
  return undefined;
}

// ダミー画像のURLを生成する関数
export function generateDummyImageUrl(): string {
  return `/api/placeholder/400/320`;
}