import {
  AppShell,
  Burger,
  Group,
  NavLink,
  ActionIcon,
  useMantineColorScheme,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import phoenixLogo from "../../assets/PhoenixLogo_v1.png";
import { TextInput } from "@mantine/core";
import NavDrawer from "../NavDrawer/NavDrawer";
import { IconSun, IconMoon } from "@tabler/icons-react";

import "./MainToolBar.scss";

const MainToolBar = () => {
  const [opened, { open, close }] = useDisclosure();

  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const darkMode = colorScheme === "dark";

  return (
    <AppShell
      className="mainToolBar"
      header={{ height: { base: 50, md: 60 } }}
      padding="md"
    >
      <AppShell.Header className="mainToolBar__header" id="mainToolBar__header">
        <Group className="mainToolBar__info">
          <Burger
            className="mainToolBar__burger"
            opened={opened}
            onClick={open}
            size="md"
            aria-label="Toggle navigation"
          />
          <img
            src={phoenixLogo}
            alt="Phoenix Logo"
            className="mainToolBar__logo"
          />
          <Title className="mainToolBar__title" size="h4">
            Project Phoenix
          </Title>
        </Group>

        <Group grow className="mainToolBar__navLinks_container">
          <NavLink label={"Results"} />
          <NavLink label={"Calendar"} />
          <NavLink label={"Friends"} />
          <div>
            <ActionIcon
              size={"md"}
              variant="outline"
              color={darkMode ? "yellow" : "blue"}
              onClick={() => setColorScheme(darkMode ? "light" : "dark")}
              title="Toggle Color Scheme"
            >
              {darkMode ? (
                <IconSun style={{ width: 18, height: 18 }} />
              ) : (
                <IconMoon style={{ width: 18, height: 18 }} />
              )}
            </ActionIcon>
          </div>
        </Group>
        <TextInput className="mainToolBar__searchInput" />
      </AppShell.Header>
      <NavDrawer opened={opened} onClose={close}></NavDrawer>
    </AppShell>
  );
};

export default MainToolBar;
