/* bug.js */
import * as Linking from 'expo-linking';
import React, { useEffect, useState } from 'react';

function App() {
  const [deepLink, setDeepLink] = useState(null);

  useEffect(() => {
    const handleDeepLink = (event) => {
      setDeepLink(event.url);
    };

    Linking.addEventListener('url', handleDeepLink);

    return () => {
      Linking.removeEventListener('url', handleDeepLink);
    };
  }, []);

  useEffect(() => {
    Linking.getInitialURL().then(url => {
      if (url) {
        setDeepLink(url);
      }
    });
  }, []);

  if (deepLink) {
    return <Text>Deep link received: {deepLink}</Text>;
  } else {
    return <Text>Waiting for deep link...</Text>;
  }
}

/* bugSolution.js */
import * as Linking from 'expo-linking';
import React, { useEffect, useState } from 'react';

function App() {
  const [deepLink, setDeepLink] = useState(null);
  useEffect(() => {
    const handleDeepLink = (event) => {
      setDeepLink(event.url);
    };
    // Add a cleanup function to remove the listener when the component unmounts
    const cleanup = () => {
      Linking.removeEventListener('url', handleDeepLink);
    };
    Linking.addEventListener('url', handleDeepLink);
    return cleanup;
  }, []);

  useEffect(() => {
    // Handle the initial URL when the app starts
    const handleInitialURL = async () => {
      try {
        let initialUrl = await Linking.getInitialURL();
        if (initialUrl) {
          setDeepLink(initialUrl);
        }
      } catch (error) {
        console.error('Error getting initial URL:', error);
      }
    };
    handleInitialURL();
  }, []);

  if (deepLink) {
    return <Text>Deep link received: {deepLink}</Text>;
  } else {
    return <Text>Waiting for deep link...</Text>;
  }
}

  export default App;