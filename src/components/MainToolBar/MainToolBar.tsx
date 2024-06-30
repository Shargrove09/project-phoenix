import { AppShell, Burger, Button, NavLink, Tabs } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import phoenixLogo from "../../assets/PhoenixLogo_v1.png";
import { TextInput } from "@mantine/core";

import "./MainToolBar.scss";
import NavDrawer from "../NavDrawer/NavDrawer";

const MainToolBar = () => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <AppShell
      className="mainToolBar"
      header={{ height: { base: 50, md: 60} }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header className="mainToolBar__header">
        <Burger className="mainToolBar__burger" opened={opened} onClick={open} size="md" aria-label="Toggle navigation" />
        <img
          src={phoenixLogo}
          alt="Phoenix Logo"
          className="mainToolBar__logo"
        />
        <p className="mainToolBar__title">Project Phoenix</p>
        <div className="mainToolBar__navLinks_container">
          <NavLink label={"Results"} />
          <NavLink label={"Calendar"} />
          <NavLink label={"Friends"} />
        </div>
        <TextInput className="mainToolBar__searchInput" />
      </AppShell.Header>
      <NavDrawer opened={opened} open={open} close={close} />
    </AppShell>
  );
};

export default MainToolBar;
