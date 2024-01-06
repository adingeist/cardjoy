import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { CssBaseline } from '@mui/material';
import theme from './theme'; // Import the custom theme
import CanvasSidebar from './components/Canvas/Sidebar/Sidebar';
import Canvas from './components/Canvas/Canvas';
import { Provider as ReduxProvider } from 'react-redux';
import store from './redux/store';

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const App: React.FC = () => {
  return (
    <ReduxProvider store={store}>
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
    </ReduxProvider>
  );
};

export default App;
