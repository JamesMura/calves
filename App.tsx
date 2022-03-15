import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { Database, DatabaseContext } from './db/setup';

const db = new Database();
export default function App() {
  useEffect(() => {
    const firstRun = async () => {
      await db.database.setUpDataBase();
    };
    firstRun();
  }, []);
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  }
  return (
    <DatabaseContext.Provider value={db}>
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    </DatabaseContext.Provider>
  );
}
