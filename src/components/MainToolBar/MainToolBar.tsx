import {
  AppShell,
  Burger,
  Group,
  Anchor,
  ActionIcon,
  useMantineColorScheme,
  Title,
  rem,
  Box,
  Image,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import phoenixLogo from "../../assets/PhoenixLogo_v1.png";
import NavDrawer from "../NavDrawer/NavDrawer";
import { IconSun, IconMoon, IconSearch } from "@tabler/icons-react";
import { SyntheticEvent, useState } from "react";
import { useSearchContext } from "../../context/useSearchContext";
import { useNavigate } from "react-router-dom";
import classes from "./MainToolBar.module.scss";

const navLinks = [
  { link: "/", label: "Home" },
  { link: "/results", label: "Results" },
  { link: "/single-view", label: "Last Searched" },
];

const MainToolBar = () => {
  const [opened, { open, close }] = useDisclosure();
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const { search, setAnimeData } = useSearchContext();

  const [active, setActive] = useState(0);
  const [searchValue, setSearchValue] = useState<string>("");

  const navigate = useNavigate();

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

  const handleAnimeSearch = (event: SyntheticEvent) => {
    event.preventDefault(); //Won't allow page to refresh when you submit input
    search(searchValue).then((searchResult) => {
      setAnimeData(searchResult.data);
      localStorage.setItem(
        "animeSearchResultData",
        JSON.stringify(searchResult.data)
      ); //Allowed to set Strings
      navigate("/results");
    });
  };

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
            gap={15}
            className={classes.mainToolBar__navLinkContainer}
            visibleFrom="sm"
            mr={10}
          >
            {items}
          </Group>
          <form onSubmit={handleAnimeSearch}>
            <TextInput
              className={classes.mainToolBar__search}
              leftSection={
                <IconSearch
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={1.5}
                />
              }
              onChange={(event) => setSearchValue(event.currentTarget.value)}
              placeholder="Search"
              visibleFrom={"xs"}
            />
          </form>

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
      </AppShell.Header>
      <NavDrawer opened={opened} onClose={close}></NavDrawer>
    </AppShell>
  );
};

export default MainToolBar;
