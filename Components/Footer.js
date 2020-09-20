import React, { useEffect, useState } from "react";
import BottomNavigation, {
  FullTab,
  IconTab,
} from "react-native-material-bottom-navigation";
import { Icon } from "react-native-elements";
import { useLocation, useHistory } from "react-router-native";

const RenderIcon = (props) => (
  <Icon
    size={24}
    color="white"
    name={props.icon}
    type={props?.iconType ?? ""}
  />
);

const Tab = ({ tab, isActive }) => {
  if (tab.label) {
    return (
      <FullTab
        isActive={isActive}
        key={tab.key}
        label={tab.label}
        renderIcon={() => (
          <RenderIcon icon={tab.icon} iconType={tab.iconType} />
        )}
      />
    );
  } else {
    return (
      <IconTab
        isActive={isActive}
        key={tab.key}
        renderIcon={() => (
          <RenderIcon icon={tab.icon} iconType={tab.iconType} />
        )}
      />
    );
  }
};

export default function Footer(props) {
  const [activeTab, setActiveTab] = useState("home");
  const location = useLocation();
  const history = useHistory();

  const tabs = [
    {
      key: "home",
      icon: "home",
      iconType: "material",
      barColor: "#388E3C",
      pressColor: "rgba(255, 255, 255, 0.16)",
      path: "/",
    },
    {
      key: "quiz",
      icon: "movie",
      iconType: "material",
      label: "Quiz",
      barColor: "#B71C1C",
      pressColor: "rgba(255, 255, 255, 0.16)",
      path: "/quiz",
    },
    {
      key: "profile",
      icon: "people",
      iconType: "material",
      label: "Profile",
      barColor: "#E64A19",
      pressColor: "rgba(255, 255, 255, 0.16)",
      path: "/login",
    },
  ];

  useEffect(() => {
    const tab = tabs.find((tab) => tab.path === location.pathname);
    setActiveTab(tab?.key ?? "home");
  }, [location]);

  return (
    <BottomNavigation
      activeTab={activeTab}
      renderTab={Tab}
      tabs={tabs}
      onTabPress={(newTab) => {
        setActiveTab(newTab.key);
        history.push(newTab.path);
      }}
    />
  );
}