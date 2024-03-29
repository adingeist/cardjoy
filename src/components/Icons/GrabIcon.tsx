import { SvgIconProps } from '@mui/material';
import React from 'react';

const GrabIcon: React.FC<SvgIconProps> = (props) => (
  <svg
    {...props}
    width="40px"
    height="40px"
    viewBox="0 0 21 21"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      fill="none"
      fillRule="evenodd"
      stroke="#000000"
      strokeLinecap="round"
      strokeLinejoin="round"
      transform="translate(5 6)"
    >
      <path d="m2.35073766 3.50548574.14926234-.00548574v-1c0-.55228475.44771525-1 1-1s1 .44771525 1 1v-1c0-.55228475.44771525-1 1-1s1 .44771525 1 1v1c0-.55228475.44771525-1 1-1s1 .44771525 1 1v1c0-.55228475.44771525-1 1-1 .5522847 0 1 .44771525 1 1v4c0 2.7614237-2.23857625 5-5 5h-.5c-2.48528137 0-4.5-2.0147186-4.5-4.5v-2.5c0-1.0543618.81587779-1.91816512 1.85073766-1.99451426z" />

      <path d="m2.5 2.5v3" />

      <path d="m4.5 1.5v2" />

      <path d="m6.5 1.5v2" />

      <path d="m8.5 2.5v2" />
    </g>
  </svg>
);

export default GrabIcon;
