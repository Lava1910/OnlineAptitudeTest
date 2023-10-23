import {
  ArrowBackIos,
  ArrowForwardIos,
  CheckCircle,
} from "@mui/icons-material";
import { Box, Button } from "@mui/material";

function ProgressBar({ nextQ, prevQ, progress, submit }) {
  return (
    <div className="progress-bar frame-BG fixed left-0 right-0 bottom-6 mx-auto grid w-[calc(100vw-50px)] grid-cols-[auto_1fr_auto] items-center justify-between gap-5 p-2 sm:p-4 lg:w-[calc(100vw-150px)]">
      <button
        className="next-button fill-button back-button py-2 px-3 font-medium"
        type="button"
        onClick={prevQ}
      >
        <Box>
          <Button
            variant="contained"
            color="error"
            startIcon={<ArrowBackIos />}
          >
            Back
          </Button>
        </Box>
      </button>

      <div className="w-full rounded-full bg-gray-300 dark:bg-gray-600">
        <div
          className="rounded-full bg-green-500 text-center text-xs font-medium leading-none tracking-wider transition-all duration-500 ease-in
          lg:text-sm"
          title={`${progress.toFixed(0)}%`}
          style={{ width: `${progress.toFixed(0)}%` }}
        >
          {progress.toFixed(0)}%
        </div>
      </div>

      <button
        className="next-button fill-button py-2 px-3 font-medium"
        type="button"
        onClick={progress === 100 ? submit : nextQ}
      >
        <Box>
          <Button
            variant="contained"
            color={progress === 100 ? "success" : "warning"}
            endIcon={progress === 100 ? <CheckCircle /> : <ArrowForwardIos />}
          >
            {progress === 100 ? "Submit" : "Next question"}
          </Button>
        </Box>
      </button>
    </div>
  );
}

export default ProgressBar;
