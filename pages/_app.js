// import Layout from "@/components/layout/Layout";
import { Provider } from "react-redux";
import { store } from "../redux";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      {/* <Layout> */}
      <Component {...pageProps} />
      {/* </Layout> */}
    </Provider>
  );
}

async function getInitialProps({ Component, ctx }) {
  const pageProps = Component.getInitialProps
    ? await Component.getInitialProps(ctx)
    : {};
  return { pageProps };
}
