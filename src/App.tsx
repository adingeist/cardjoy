import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { CssBaseline } from '@mui/material';
import theme from './theme'; // Import the custom theme
import CanvasSidebar from './components/Canvas/Sidebar/Sidebar';
import Canvas from './components/Canvas/Canvas';
import { Provider as ReduxProvider } from 'react-redux';
import store from './redux/store';
import { EditorProvider } from './components/Canvas/EditorContext';
import { useFabricJSEditor } from './components/Canvas/Editor';
import EditorScreen from './components/EditorScreen';

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
          <EditorScreen />
        </AppContainer>
      </ThemeProvider>
    </ReduxProvider>
  );
};

export default App;
