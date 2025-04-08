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
              <Dropzone.Accept>Drop files here</Dropzone.Accept>
              <Dropzone.Reject>Only CSV files less than 30MB</Dropzone.Reject>
              <Dropzone.Idle>Upload your CSV file</Dropzone.Idle>
            </Text>
            <Text ta="center" fz="sm" mt="xs" c="dimmed">
              Drag&apos;n&apos;drop files here to upload. We can accept only <i>.csv</i> files that
              are less than 30MB in size.
            </Text>
          </div>
        </Dropzone>
      )}
    </div>
  );
}

export default DropzoneButton;
