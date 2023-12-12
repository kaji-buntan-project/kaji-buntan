import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import 'styles/globals.css'
import Layout from 'components/layout/mainLayout'
import theme from "src/theme";
import { CookiesProvider } from "react-cookie";
import { Provider } from "jotai";

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
    <CookiesProvider>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
    </CookiesProvider>
    </Provider>
  )
}

export default MyApp
