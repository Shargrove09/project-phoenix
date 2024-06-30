import { Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

interface Props { 
  opened: boolean;
  open: () => void;
  close: () => void;

}

const NavDrawer = (props: Props) => {
  const { opened, open, close } = props;

  return (
    <Drawer opened={opened} onClose={close} title="Nav Drawer">
      <Drawer.Title>Drawer title</Drawer.Title>

    </Drawer>
  );
};

export default NavDrawer;