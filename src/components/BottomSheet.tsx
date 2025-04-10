import React, { useState } from 'react';
import { Drawer, Button, Text } from '@mantine/core';

const BottomSheet: React.FC = () => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      {/* ボトムシートを開くボタン */}
      <Button onClick={() => setOpened(true)} style={{ position: 'fixed', bottom: 20, right: 20 }}>
        ボトムシートを開く
      </Button>

      {/* ボトムシート */}
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        position="bottom"
        size="50%"
      >
        <Text size="lg" mb="md">
          ボトムシートの内容
        </Text>
        <Text>
          ここにボトムシートのコンテンツを追加できます。
        </Text>
      </Drawer>
    </>
  );
};

export default BottomSheet;
