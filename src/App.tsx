import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { CssBaseline } from '@mui/material';
import theme from './theme'; // Import the custom theme
import CanvasSidebar from './components/Canvas/Sidebar/Sidebar';
import Canvas from './components/Canvas/Canvas';

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <CssBaseline />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
          }}
        >
          <CanvasSidebar />
          <Canvas />
        </div>
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
