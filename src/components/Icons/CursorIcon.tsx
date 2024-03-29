import { SvgIconProps } from '@mui/material';
import React from 'react';

const CursorIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M4 0l16 12.279-6.951 1.17 4.325 8.817-3.596 1.734-4.35-8.879-5.428 4.702z" />
    </svg>
  );
};

export default CursorIcon;
