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
import NavDrawer from "../NavDrawer/NavDrawer";
import { IconSun, IconMoon, IconSearch } from "@tabler/icons-react";

import classes  from "./MainToolBar.module.scss"

const navLinks = [
  { link: '/about', label: 'Home' },
  { link: '/single-anime', label: 'Results' },
  { link: '/learn', label: 'Last Searched' },
];

const MainToolBar = () => {
  const [opened, { open, close }] = useDisclosure();
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const darkMode = colorScheme === "dark";

  const items = navLinks.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.mainToolBar__navLink}
      onClick={(event) => event.preventDefault()}
    >
      {link.label}
    </a>
  ));

  return (
    <AppShell
      className={classes.mainToolBar}
      header={{ height: { base: 50, md: 60 } }}
      padding="md"
    >
      <AppShell.Header className={classes.mainToolBar__header} id="mainToolBar__header">
        <Group className={classes.mainToolBar__info}>
          <Group className={classes.mainToolBar__leftSubMenu} gap={0}>
            <Burger
              className={classes.mainToolBar__burger}
              opened={opened}
              onClick={open}
              size="md"
              aria-label="Toggle navigation"
            />
            <img
              src={phoenixLogo}
              alt="Phoenix Logo"
              className={classes.mainToolBar__logo}
            />
          </Group>

          <Title className={classes.mainToolBar__title} size="h4">
            Project Phoenix
          </Title>
        </Group>

        <Group className={classes.mainToolBar_right}>
          <Group ml={50} gap={5} className={classes.mainToolBar__navLinkContainer} visibleFrom="sm">
            {items}
          </Group>
          <Autocomplete
            className={classes.mainToolBar__search}
            placeholder="Search"
            leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
            data={['React', 'Angular', 'Vue', 'Next.js', 'Riot.js', 'Svelte', 'Blitz.js']}
            visibleFrom="xs"
          />
                 <div>
            <ActionIcon
              color={darkMode ? "yellow" : "blue"}
              className={classes.mainToolBar__darkModeToggle}
              onClick={() => setColorScheme(darkMode ? "light" : "dark")}

              size={"md"}
              title="Toggle Color Scheme"

              variant="outline"
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
