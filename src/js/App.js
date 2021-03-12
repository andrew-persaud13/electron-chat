import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import StoreProvider from './store/StoreProvider';

import HomeView from './views/Home';
import SettingsView from './views/Settings';
import WelcomeView from './views/Welcome';
import ChatView from './views/Chat';
import ChatCreate from './views/ChatCreate';

import { listenToAuthChanges } from './actions/auth';
import { listenToConnectionChanges } from './actions/app';
import { checkUserConnection } from './actions/connection';

import LoadingView from './components/shared/LoadingView';

function AuthRoute({ children, ...rest }) {
  const { user } = useSelector(({ auth }) => auth);

  const onlyChild = React.Children.only(children);
  return (
    <Route
      {...rest}
      render={props =>
        user ? (
          React.cloneElement(onlyChild, { ...rest, ...props })
        ) : (
          <Redirect to='/' />
        )
      }
    />
  );
}

const ContentWrapper = ({ children, isDarkTheme }) => {
  return (
    <div className={`content-wrapper ${isDarkTheme ? 'dark' : ''}`}>
      {children}
    </div>
  );
};

function ChatApp() {
  const dispatch = useDispatch();
  const { user } = useSelector(({ auth }) => auth);
  const isFetching = useSelector(({ auth }) => auth.isFetching);
  const isOnline = useSelector(({ app }) => app.isOnline);
  const settings = useSelector(({ settings }) => settings);

  useEffect(() => {
    const unsubscribeOnAuthChange = dispatch(listenToAuthChanges());
    const unsubFromConnection = dispatch(listenToConnectionChanges());

    return function () {
      unsubFromConnection();
      unsubscribeOnAuthChange();
    };
  }, [dispatch]);

  useEffect(() => {
    let unsubFromCheckUserConnection;

    if (user?.uid) {
      unsubFromCheckUserConnection = dispatch(checkUserConnection(user.uid));

      return () => unsubFromCheckUserConnection();
    }
  }, [dispatch, user]);

  if (!isOnline) {
    return <LoadingView message='No internet connection...' />;
  }

  if (isFetching) {
    return <LoadingView message='One moment please...' />;
  }
  return (
    <Router>
      <ContentWrapper isDarkTheme={settings?.isDarkTheme}>
        <Switch>
          <AuthRoute exact path='/home'>
            <HomeView />
          </AuthRoute>
          <Route exact path='/'>
            <WelcomeView />
          </Route>
          <AuthRoute path='/settings'>
            <SettingsView />
          </AuthRoute>
          <AuthRoute path='/chat/:id'>
            <ChatView />
          </AuthRoute>
          <AuthRoute path='/createChat'>
            <ChatCreate />
          </AuthRoute>
        </Switch>
      </ContentWrapper>
    </Router>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <ChatApp />
    </StoreProvider>
  );
}
