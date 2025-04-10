import { useState } from 'react';

let globalCsvData: string[][] = [];
let setGlobalCsvData: React.Dispatch<React.SetStateAction<string[][]>> | null = null;

export const useCsvData = () => {
  const [csvData, setCsvData] = useState<string[][]>(globalCsvData);

  // グローバルな状態を更新する関数を登録
  setGlobalCsvData = setCsvData;

  return { csvData, setCsvData };
};

// 別のコンポーネントから状態を取得・更新するためのヘルパー関数
export const updateCsvData = (newData: string[][]) => {
  globalCsvData = newData;
  if (setGlobalCsvData) {
    setGlobalCsvData(newData);
  }
};
