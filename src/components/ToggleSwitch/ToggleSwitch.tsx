import React, { useEffect } from "react";
import clsx from "clsx";
import { styled } from "@mui/system";
import { useSwitch, UseSwitchParameters } from "@mui/base/useSwitch";
import GridViewIcon from "@mui/icons-material/GridView";

interface Props extends UseSwitchParameters {
  setShowDetailedView: React.Dispatch<React.SetStateAction<boolean>>;
}

// export default function UseSwitchesCustom() {
//   return <MUISwitch defaultChecked setShowDetailedView={setShowDetailedView} />;
// }

export default function MUISwitch(props: Props) {
  const { getInputProps, checked, disabled, focusVisible } = useSwitch(props);
  const { setShowDetailedView } = props;

  const stateClasses = {
    checked,
    disabled,
    focusVisible,
  };

  useEffect(() => {
    setShowDetailedView(stateClasses.checked);
  }, [setShowDetailedView, stateClasses.checked]);

  return (
    <SwitchRoot className={clsx(stateClasses)}>
      <SwitchTrack>
        <SwitchThumb className={clsx(stateClasses)} />
      </SwitchTrack>
      <SwitchInput {...getInputProps()} aria-label="Demo switch" />
    </SwitchRoot>
  );
}

const blue = {
  700: "#0059B2",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const SwitchRoot = styled("span")`
  display: inline-block;
  position: relative;
  width: 56px;
  height: 36px;
  padding: 8px;
  margin-top: 1em;
`;

const CustomGridViewIcon = styled(GridViewIcon)({
  width: 30,
  height: 30,
});

const SwitchInput = styled("input")`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 1;
  margin: 0;
  cursor: pointer;
`;

const SwitchThumb = styled("span")`
  position: absolute;
  display: block;
  background-color: ${blue[700]};
  width: 30px;
  height: 30px;
  border-radius: 8px;

  left: 4px;
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);

  &::before {
    display: block;
    content: "";
    width: 100%;
    height: 100%;

    /* false positive: */
    /* stylelint-disable unit-no-unknown */
    background: url(${CustomGridViewIcon}); // Set the background image to GridViewIcon
    background-size: cover; // Adjust the size of the background image
      center center no-repeat;
    /* stylelint-enable unit-no-unknown */
  }

  &.focusVisible {
    background-color: #79b;
  }

  &.checked {
    transform: translateX(20px);

    &::before {
      /* false positive: */
      /* stylelint-disable unit-no-unknown */
      background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>');
      /* stylelint-enable unit-no-unknown */
    }
  }
`;

const SwitchTrack = styled("span")(
  ({ theme }) => `
  background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[400]};
  border-radius: 4px;
  width: 100%;
  height: 60%;
  display: flex;
  align-items: center
`
);
