import { Box, CircularProgress, Stack } from "@mui/material";

function LoadingIndicator() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center"
      sx={{ minHeight: 300 }}>
      <Stack alignItems="center">
        <CircularProgress />
      </Stack>
    </Box>
  );
}

export default LoadingIndicator;