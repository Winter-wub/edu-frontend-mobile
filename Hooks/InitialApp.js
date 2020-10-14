import { useEffect, useState } from "react";
import { loadAsync } from "expo-font";
import Updates from "expo-updates";

export default function useInitApp() {
  const [load, setLoad] = useState(true);
  const [showUpdate, setShowUpdate] = useState(false);
  const [confirmUpdate, setConfirmUpdate] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoad(true);
        await loadAsync({
          dancingScript: require("../assets/fonts/DancingScriptVariableFontwght.ttf"),
          dancingScriptBold: require("../assets/fonts/DancingScriptBold.ttf"),
          roboto: require("../assets/fonts/RobotoRegular.ttf"),
          robotoBold: require("../assets/fonts/RobotoBold.ttf"),
        });
        if (process.env.NODE_ENV !== "development") {
          const { isAvailable } = await Updates.checkForUpdateAsync();
          if (isAvailable) {
            await Updates.fetchUpdateAsync();
            setShowUpdate(true);
          }
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoad(false);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (confirmUpdate) {
        await Updates.reloadAsync();
      }
    })();
  }, [confirmUpdate]);

  return {
    isInitialing: load,
    hasUpdate: showUpdate,
    setConfirmUpdate,
  };
}
