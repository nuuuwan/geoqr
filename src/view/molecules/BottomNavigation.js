import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigationMUI from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import FastRewindIcon from "@mui/icons-material/FastRewind";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";

import { COLOR } from "../Style";

function getOpacity(isDisabled) {
  return isDisabled ? 0.1 : 1.0;
}

export default function BottomNavigation({
  onClickRewind,
  onClickPlay,
  onClickStop,
  isPlaying,
  latLngList,
}) {
  const isRewindDisabled = latLngList.length === 0;
  const isPlayDisabled = isPlaying;
  const isStopDisabled = !isPlaying;

  return (
    <Box sx={{}}>
      <BottomNavigationMUI>
        <BottomNavigationAction
          icon={<FastRewindIcon />}
          onClick={onClickRewind}
          disable={isRewindDisabled}
          sx={{ opacity: getOpacity(isRewindDisabled), color: COLOR.ORANGE }}
        />
        <BottomNavigationAction
          icon={<PlayArrowIcon />}
          onClick={onClickPlay}
          disabled={isPlayDisabled}
          sx={{ opacity: getOpacity(isPlayDisabled), color: COLOR.GREEN }}
        />
        <BottomNavigationAction
          icon={<StopIcon />}
          onClick={onClickStop}
          disabled={isStopDisabled}
          sx={{ opacity: getOpacity(isStopDisabled), color: COLOR.RED }}
        />
      </BottomNavigationMUI>
    </Box>
  );
}
