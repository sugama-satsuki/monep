import { useRef, useState } from 'react';
import { IconFileUpload, IconCloudUpload, IconDownload, IconX } from '@tabler/icons-react';
import { ActionIcon, Group, Loader, Text, useMantineTheme } from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import classes from './CsvUploader.module.css';
import { useCsvData } from '../hooks/useCsvData';


function DropzoneButton() {
  const theme = useMantineTheme();
  const openRef = useRef<() => void>(null);
  const [isDropzoneVisible, setDropzoneVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setCsvData } = useCsvData();

  const handleCsvUpload = (files: File[]) => {
    const file = files[0];
    if (!file) return;

    setIsLoading(true);

    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target?.result as string;
      const parsedData = parseCsv(text);
      setCsvData(parsedData);
      setIsLoading(false);
    };

    reader.onerror = () => {
      console.error('CSVファイルの読み込みに失敗しました');
      setIsLoading(false);
    };

    reader.readAsText(file);
  };

  const parseCsv = (text: string): string[][] => {
    const rows = text.split('\n');
    return rows.map((row) => row.split(',').map((cell) => cell.trim()));
  };


  return (
    <div className={classes.wrapper}>
      {/* CSVアップロードボタン */}
      <ActionIcon variant="filled" color="red" aria-label="Settings" onClick={() => setDropzoneVisible((prev) => !prev)}>
      { isDropzoneVisible ? 
        <IconX style={{ width: '70%', height: '70%' }} stroke={1.5} />
        :
        <IconFileUpload style={{ width: '70%', height: '70%' }} stroke={1.5} />
      }
      </ActionIcon>

      {/* Dropzoneエレメント */}
      {isDropzoneVisible && (
        <Dropzone
          openRef={openRef}
          onDrop={handleCsvUpload}
          className={classes.dropzone}
          radius="md"
          accept={[MIME_TYPES.csv]}
          maxSize={30 * 1024 ** 2}
        >
          <div style={{ pointerEvents: 'none' }}>
            <Group justify="center">
              <Dropzone.Accept>
                <IconDownload size={50} color={theme.colors.blue[6]} stroke={1.5} />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX size={50} color={theme.colors.red[6]} stroke={1.5} />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconCloudUpload size={50} stroke={1.5} />
              </Dropzone.Idle>
            </Group>

            <Text ta="center" fw={700} fz="lg" mt="xl">
                <Dropzone.Accept>ここにファイルをドロップしてください</Dropzone.Accept>
                <Dropzone.Reject>30MB以下のCSVファイルのみアップロード可能です</Dropzone.Reject>
                <Dropzone.Idle>CSVファイルをアップロードしてください</Dropzone.Idle>
            </Text>
            <Text ta="center" fz="sm" mt="xs" c="dimmed">
                ファイルをドラッグ＆ドロップするか、クリックしてアップロードしてください。30MB以下の<i>.csv</i>ファイルのみ対応しています。
            </Text>
          </div>
        </Dropzone>
      )}

      {/* ローディング中の表示 */}
      {isLoading && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Loader color="cyan" type="dots" />
          <Text mt="sm">ファイルを読み込んでいます...</Text>
        </div>
      )}
    </div>
  );
}

export default DropzoneButton;
