import Navtab from './assets/Navtab';
import { extendTheme,ChakraProvider } from '@chakra-ui/react'


const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: "#F5F5F5",
      },
    }),
  },
});

function App() {  
  return (
      <ChakraProvider theme={theme}>
        <Navtab/>
      </ChakraProvider>

    
  );
}

export default App;
