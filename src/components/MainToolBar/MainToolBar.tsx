import { AppShell, Burger, Button, Tabs } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import phoenixLogo from "../../assets/PhoenixLogo_v1.png";
import { TextInput } from "@mantine/core";

import "./MainToolBar.scss";

const MainToolBar = () => {
  const [opened, { toggle }] = useDisclosure();
  return (
    <AppShell
      className="mainToolBar"
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header className="mainToolBar__header">
        <img
          src={phoenixLogo}
          alt="Phoenix Logo"
          className="mainToolBar__logo"
        />
        <p>Project Phoenix</p>
        {/* <Burger
          className="mainToolBar__burger"
          opened={opened}
          onClick={toggle}
          size="md"
        /> */}
        <TextInput className="mainToolBar__searchInput" />
      </AppShell.Header>
    </AppShell>
  );
};

export default MainToolBar;
