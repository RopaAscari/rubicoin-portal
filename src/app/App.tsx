import "./App.scss";
import {
  split,
  HttpLink,  
  ApolloLink,
  ApolloClient,
  RequestHandler,
  ApolloProvider,
  DefaultOptions,
  NormalizedCacheObject,
} from "@apollo/client";
import { Router } from "../router";
import darkTheme from "@theme/dark";
import { cache } from "@cache/index";
import lightTheme from "@theme/light";
import { connect } from "react-redux";
import { Themes } from "@enums/enums";
import { Theming } from "@typings/theme";
import { Toaster } from "react-hot-toast";
import { onError } from "apollo-link-error";
import { CssBaseline } from "@mui/material";
import { Token } from "@constants/constants";
import { withRouter } from "react-router-dom";
import React, { Component, Dispatch } from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import "@assets/scss/shards-dashboards.1.1.0.min.css";
import { RootState } from "@reducers/combinedReducers";
import { setContext } from "@apollo/client/link/context";
import { MaterialUIControllerProvider } from "@context/index";
import { BatchHttpLink } from "@apollo/client/link/batch-http";
import { createEmotionCache } from "@utils/createEmotionCache";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CachePersistor, LocalStorageWrapper } from "apollo3-cache-persist";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";

type Props = {
  theme: Theming;
  location: any;
  token: Token | undefined;
};

type State = {
  client: ApolloClient<NormalizedCacheObject> | null;
  persistor: CachePersistor<NormalizedCacheObject> | null;
};

const development: boolean =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development";

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

const { REACT_APP_GRAPHQL_DEV_ENDPOINT, REACT_APP_GRAPHQL_PROD_ENDPOINT } =
  process.env;

const httpLink = new HttpLink({
  uri: development
    ? REACT_APP_GRAPHQL_DEV_ENDPOINT
    : REACT_APP_GRAPHQL_PROD_ENDPOINT,
});

const clientSideEmotionCache = createEmotionCache();

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      client: null,
      persistor: null,
    };
  }

  componentDidMount() {
    this.initializeClient().catch(console.error);
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
  }

  async initializeClient() {

    let newPersistor = new CachePersistor({
      cache,
      debug: true,
      trigger: "write",
      storage: new LocalStorageWrapper(window.localStorage),
    });

    await newPersistor.restore();

    this.setState({ persistor: newPersistor });

    const authLink = setContext((_, { headers }) => {
      // get the authentication token from local storage if it exists

      // return the headers to the context so httpLink can read them
      return {
        headers: {
          ...headers,
          authorization: this.props.token?.token
            ? `Bearer ${this.props.token.token}`
            : "",
        },
      };
    });

    const batchHttpLink = new BatchHttpLink({  
      batchMax: 5, // No more than 5 operations per batch
      batchInterval: 20,
      uri: development
        ? REACT_APP_GRAPHQL_DEV_ENDPOINT
        : REACT_APP_GRAPHQL_PROD_ENDPOINT,
      headers: {
        authorization: this.props.token?.token
          ? `Bearer ${this.props.token.token}`
          : "",
      },
    });

    this.setState({
      client: new ApolloClient({
        cache,
        link:authLink.concat(httpLink),  
        
       // batchHttpLink as unknown as ApolloLink 
       /*ApolloLink.from([
          onError(({ graphQLErrors, networkError }) => {
            if (graphQLErrors)
              graphQLErrors.map(({ message, locations, path }) =>
                console.log(
                  `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
                )
              );
            if (networkError) console.log(`[Network error]: ${networkError}`);
          }) as unknown as ApolloLink | RequestHandler,
          split(
            (operation) => operation.getContext().important === true,
            batchHttpLink as unknown as ApolloLink
          ),
        ]),*/
        ...defaultOptions,
      }),
    });
  }

  clearCache() {
    if (!this.state.persistor) {
      return;
    }
    this.state.persistor.purge();
  }

  clearAppCache = this.clearCache.bind(this);

  render() {
    if (!this.state.client) {
      return <CircularProgress color="info" size={35} />;
    }

    const theme = createTheme(
      this.props.theme.name == Themes.LIGHT ? lightTheme : darkTheme
    );

    return (
      <ApolloProvider
        client={this.state.client as ApolloClient<NormalizedCacheObject>}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MaterialUIControllerProvider>
            <ThemeProvider theme={theme}>
              <Router />
              <Toaster />
              <CssBaseline />
            </ThemeProvider>
          </MaterialUIControllerProvider>
        </LocalizationProvider>
      </ApolloProvider>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: any) => ({
  user: state.user?.user,
  theme: state.theme?.theme,
  token: state.token?.token,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(App as any));

//export default withRouter(App as any);
