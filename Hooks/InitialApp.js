import { useEffect, useState } from "react";
import { loadAsync } from "expo-font";
import * as Updates from "expo-updates";

export default function useInitApp() {
  const [load, setLoad] = useState(true);
  const [hasUpdate, setHasUpdate] = useState(false);
  const [confrim, setConfirmUpdate] = useState(false);
  const [fetchingUpdate, setFetchUpdate] = useState(false);

  const initResource = async () => {
    await loadAsync({
      dancingScript: require("../assets/fonts/DancingScriptVariableFontwght.ttf"),
      dancingScriptBold: require("../assets/fonts/DancingScriptBold.ttf"),
      roboto: require("../assets/fonts/RobotoRegular.ttf"),
      robotoBold: require("../assets/fonts/RobotoBold.ttf"),
    });
  };

  const checkUpdates = async () => {
    const { isAvailable } = await Updates.checkForUpdateAsync();
    if (isAvailable) {
      setHasUpdate(true);
    } else {
      setHasUpdate(false);
    }
  };

  useEffect(() => {
    if (confrim) {
      (async () => {
        try {
          setFetchUpdate(true);
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
        } finally {
          setFetchUpdate(false);
        }
      })();
    }
  }, [confrim]);

  useEffect(() => {
    Updates.addListener((event) => {
      if (event.type === Updates.UpdateEventType.UPDATE_AVAILABLE) {
        setHasUpdate(true);
      } else {
        setHasUpdate(false);
      }
    });
  }, []);

  return {
    isInitialing: load,
    initResource,
    setLoad,
    checkUpdates,
    hasUpdate,
    setConfirmUpdate,
    fetchingUpdate,
  };
}
