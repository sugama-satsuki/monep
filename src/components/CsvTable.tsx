import { Table } from '@mantine/core';
import React from 'react';

interface CsvTableProps {
  caption: string;
  head: string[];
  body: string[][];
}

const CsvTable: React.FC<CsvTableProps> = ({ caption, head, body }) => {
  return (
    <Table data={{
        caption: caption,
        head: head,
        body: body
    }} />
  );
};

export default CsvTable;
