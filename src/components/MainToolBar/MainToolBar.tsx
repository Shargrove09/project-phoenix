import {
  AppShell,
  Burger,
  Group,
  NavLink,
  ActionIcon,
  useMantineColorScheme,
  Title,
  Autocomplete,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import phoenixLogo from "../../assets/PhoenixLogo_v1.png";
import { TextInput } from "@mantine/core";
import NavDrawer from "../NavDrawer/NavDrawer";
import { IconSun, IconMoon, IconSearch } from "@tabler/icons-react";

import "./MainToolBar.scss";

const navLinks = [
  { link: '/about', label: 'Features' },
  { link: '/pricing', label: 'Pricing' },
  { link: '/learn', label: 'Learn' },
  { link: '/community', label: 'Community' },
];

const MainToolBar = () => {
  const [opened, { open, close }] = useDisclosure();
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const darkMode = colorScheme === "dark";

  const items = navLinks.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={"mainToolBar__navLink"}
      onClick={(event) => event.preventDefault()}
    >
      {link.label}
    </a>
  ));

  return (
    <AppShell
      className="mainToolBar"
      header={{ height: { base: 50, md: 60 } }}
      padding="md"
    >
      <AppShell.Header className="mainToolBar__header" id="mainToolBar__header">
        <Group className="mainToolBar__info">
          <Group className="mainToolBar__leftSubMenu" gap={0}>
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
          </Group>

          <Title className="mainToolBar__title" size="h4">
            Project Phoenix
          </Title>
        </Group>

        <Group className={"mainToolBar_right"}>
          <Group ml={50} gap={5} className={"mainToolBar__navLinkContainer"} visibleFrom="sm">
            {items}
          </Group>
          <Autocomplete
            className={"mainToolBar__search"}
            placeholder="Search"
            leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
            data={['React', 'Angular', 'Vue', 'Next.js', 'Riot.js', 'Svelte', 'Blitz.js']}
            visibleFrom="xs"
          />
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
 

        {/* <Group grow className="mainToolBar__navLinks_container">
          <NavLink label={"Results"} />
          <NavLink label={"Calendar"} />
          <NavLink label={"Friends"} />

        </Group> */}
      </AppShell.Header>
      <NavDrawer opened={opened} onClose={close}></NavDrawer>
    </AppShell>
  );
};

export default MainToolBar;
