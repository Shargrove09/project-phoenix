import { Drawer } from "@mantine/core";

import "./NavDrawer.scss";

interface Props {
  opened: boolean;
  onClose: () => void;
}

const NavDrawer = (props: Props) => {
  const { opened, onClose } = props;

  return (
    <Drawer
      position="top"
      opened={opened}
      onClose={onClose}
      title="Nav Drawer"
      size={"100%"}
    >
      <Drawer.Title>Drawer title</Drawer.Title>
      <p> HELLO I AM SOME TEXT</p>
    </Drawer>
  );
};

export default NavDrawer;
