import { Box, Drawer, NavLink } from "@mantine/core";
import { IconHome2, IconChecklist, IconHistory} from "@tabler/icons-react";

import "./NavDrawer.scss";

interface Props {
  opened: boolean;
  onClose: () => void;
}

const NavDrawer = (props: Props) => {
  const { opened, onClose } = props;

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

            <NavLink label="Results" href="/results" leftSection={<IconChecklist size="1rem" stroke={1.5}/>} />
            <NavLink 
              label="Last Searched Anime" 
              href="/single-view" 
              leftSection={<IconHistory size="1rem" stroke={1.5} />}
            />
          </Box>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer>
  );
};

export default NavDrawer;
