import {
  AppShell,
  Burger,
  Group,
  Anchor,
  ActionIcon,
  useMantineColorScheme,
  Title,
  Autocomplete,
  rem,
  Box,
  Image,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import phoenixLogo from "../../assets/PhoenixLogo_v1.png";
import NavDrawer from "../NavDrawer/NavDrawer";
import { IconSun, IconMoon, IconSearch } from "@tabler/icons-react";

import classes from "./MainToolBar.module.scss";
import { useState } from "react";

const navLinks = [
  { link: "/about", label: "Home" },
  { link: "/results", label: "Results" },
  { link: "/single-anime", label: "Last Searched" },
];

const MainToolBar = () => {
  const [opened, { open, close }] = useDisclosure();
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const [active, setActive] = useState(0);

  const darkMode = colorScheme === "dark";

  const items = navLinks.map((link, index) => (
    <Anchor<"a">
      key={link.label}
      href={link.link}
      className={classes.mainToolBar__navLink}
      onClick={(event) => {
        setActive(index);
      }}
    >
      {link.label}
    </Anchor>
  ));

  return (
    <AppShell
      className={classes.mainToolBar}
      header={{ height: { base: 50, md: 60 } }}
      padding="md"
    >
      <AppShell.Header
        className={classes.mainToolBar__header}
        id="mainToolBar__header"
      >
        <Group className={classes.mainToolBar__info} gap={0}>
          <Group className={classes.mainToolBar__leftSubMenu}>
            <Burger
              className={classes.mainToolBar__burger}
              opened={opened}
              onClick={open}
              size="md"
              aria-label="Toggle navigation"
            />
            <a href="/" className={classes.mainToolBar__logoContainer}>
              <Image
                src={phoenixLogo}
                alt="Phoenix Logo"
                className={classes.mainToolBar__logo}
              />
            </a>
          </Group>

          <Title className={classes.mainToolBar__title} size="h4">
            Project Phoenix
          </Title>
        </Group>

        <Box className={classes.mainToolBar__right}>
          <Group
            ml={50}
            gap={5}
            className={classes.mainToolBar__navLinkContainer}
            visibleFrom="sm"
            mr={10}
          >
            {items}
          </Group>
          <Autocomplete
            className={classes.mainToolBar__search}
            placeholder="Search"
            leftSection={
              <IconSearch
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            }
            data={[
              "React",
              "Angular",
              "Vue",
              "Next.js",
              "Riot.js",
              "Svelte",
              "Blitz.js",
            ]}
            visibleFrom="xs"
          />
          <ActionIcon
            aria-label="Toggle Color Scheme"
            className={classes.mainToolBar__darkModeToggle}
            gradient={
              darkMode
                ? { from: "yellow", to: "gray", deg: 90 }
                : { from: "violet", to: "gray", deg: 90 }
            }
            mx={10}
            onClick={() => setColorScheme(darkMode ? "light" : "dark")}
            size={"md"}
            title="Toggle Color Scheme"
            variant="gradient"
          >
            {darkMode ? (
              <IconSun style={{ width: 18, height: 18 }} />
            ) : (
              <IconMoon style={{ width: 18, height: 18 }} />
            )}
          </ActionIcon>
        </Box>

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
