import { useRef, useState } from 'react';
import { IconFileUpload, IconCloudUpload, IconDownload, IconX } from '@tabler/icons-react';
import { ActionIcon, Group, Text, useMantineTheme } from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import classes from './CsvUploader.module.css';


function DropzoneButton() {
  const theme = useMantineTheme();
  const openRef = useRef<() => void>(null);
  const [isDropzoneVisible, setDropzoneVisible] = useState(false);

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
          onDrop={() => {}}
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
    </div>
  );
}

export default DropzoneButton;
