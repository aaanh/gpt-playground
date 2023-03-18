import { type AppType } from "next/app";

import "../styles/globals.css";
import { FluentProvider, webDarkTheme } from "@fluentui/react-components";

const MyApp: AppType = ({ Component, pageProps }) => {
  return <FluentProvider theme={webDarkTheme}>
          <Component {...pageProps} />
        </FluentProvider>
};

export default MyApp;
