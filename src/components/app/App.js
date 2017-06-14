import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Container from '../container/Container';

const App = () => {
    return (
        <MuiThemeProvider className="App">
            <Container />
        </MuiThemeProvider>
    );
};

export default App;
