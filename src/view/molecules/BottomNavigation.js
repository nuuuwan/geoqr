import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigationMUI from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import FastRewindIcon from "@mui/icons-material/FastRewind";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import ClearIcon from "@mui/icons-material/Clear";

import { COLOR } from "../Style";

function getOpacity(isDisabled) {
  return isDisabled ? 0.1 : 1.0;
}

export default function BottomNavigation({
  onClickClear,
  onClickRewind,
  onClickPlay,
  onClickStop,
  isPlaying,
  latLngList,
}) {
  const isClearDisabled = latLngList.length === 0;
  const isRewindDisabled = latLngList.length === 0;
  const isPlayDisabled = isPlaying;
  const isStopDisabled = !isPlaying;

  return (
    <Box sx={{}}>
      <BottomNavigationMUI>
        <BottomNavigationAction
          icon={<ClearIcon />}
          onClick={onClickClear}
          disabled={isClearDisabled}
          sx={{ opacity: getOpacity(isClearDisabled), color: COLOR.BLACK }}
        />
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
