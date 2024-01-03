import { Typography } from '@mui/material';
import React from 'react';
import { PANEL_PADDING } from '../../../../theme';

interface Props {
  title: string;
}

const SectionHeader: React.FC<Props> = ({ title }) => {
  return (
    <Typography padding={PANEL_PADDING} color={'white'} variant="h6">
      {title}
    </Typography>
  );
};

export default SectionHeader;
