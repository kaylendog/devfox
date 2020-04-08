import * as React from 'react';
import styled from 'styled-components';

const COLORS = ['#d54b36', '#d5ad36'];

const SocialLinks = [
  {
    platform: 'twitter',
    display: '@skyefoxie',
    url: 'https://twitter.com/skyefoxie',
  },
  {
    platform: 'telegram',
    display: '@SkyeFox',
    url: 'https://t.me/skyefox',
  },
  {
    platform: 'github',
    display: 'skyefoxie',
    url: 'https://github.com/skyefoxie',
  },
  {
    platform: 'discord',
    display: 'skye#8888',
  },
];

const END_PADDING = 4;
const MIN_PADDING = Math.max(
  ...SocialLinks.map((v) => v.platform.length + END_PADDING)
);

const Table = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const TableColumn = styled.div<{
  align: 'start' | 'end' | 'center';
  children?: any;
}>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.align};
`;

const TableItem = styled.div`
  padding: 0.25rem;
`;

export const LinkTable: React.FC = () => (
  <Table>
    <TableColumn align="start">
      {SocialLinks.map((v) => (
        <TableItem className="link-table-item">
          {v.platform}
          {'.'.repeat(MIN_PADDING - v.platform.length)}
        </TableItem>
      ))}
    </TableColumn>
    <TableColumn align="end">
      {SocialLinks.map((v) => (
        <TableItem>
          <a style={{ color: '#d58836' }} href={v.url}>
            {v.display}
          </a>
        </TableItem>
      ))}
    </TableColumn>
  </Table>
);
