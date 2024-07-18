import {
  ActionIcon,
  Box,
  Drawer,
  NavLink,
  useMantineColorScheme,
} from "@mantine/core";
import {
  IconHome2,
  IconChecklist,
  IconHistory,
  IconSun,
  IconMoon,
} from "@tabler/icons-react";

import "./NavDrawer.scss";

interface Props {
  opened: boolean;
  onClose: () => void;
}

const NavDrawer = (props: Props) => {
  const { opened, onClose } = props;
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const darkMode = colorScheme === "dark";

  return (
    <Drawer position="top" opened={opened} onClose={onClose} size={"100%"}>
      <Drawer.Content className="navDrawer__content">
        <Drawer.Header>
          <Drawer.CloseButton />
          <Drawer.Title></Drawer.Title>
        </Drawer.Header>
        <Drawer.Body className="navDrawer__body">
          <Box w={"100%"}>
            <NavLink
              label="Home"
              href="/"
              leftSection={<IconHome2 size="1rem" stroke={1.5} />}
            />

            <NavLink
              label="Results"
              href="/results"
              leftSection={<IconChecklist size="1rem" stroke={1.5} />}
            />
            <NavLink
              label="Last Searched Anime"
              href="/single-view"
              leftSection={<IconHistory size="1rem" stroke={1.5} />}
            />
            <ActionIcon
              aria-label="Toggle Color Scheme"
              className={""}
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
        </Drawer.Body>
      </Drawer.Content>
    </Drawer>
  );
};

export default NavDrawer;
