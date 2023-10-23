import { Checkbox, FormControlLabel } from "@mui/material";
import React from "react";

export default function AnswerBox({ handleChange, contentAnswer }) {
  return (
    <div className="answer-box mb-2 ml-6">
      <div className="grid grid-cols-options grid-rows-[repeat(2,auto)] gap-2 lg:grid-flow-col lg:gap-3">
        {contentAnswer.map(
          (contentAnswer, index) =>
            contentAnswer?.title && (
              <FormControlLabel
                key={index}
                label={contentAnswer?.title}
                sx={{
                  backgroundColor: "#cbd5e1",
                  padding: "10px",
                  borderRadius: 5,
                  transition: "0.3s ease-in",
                  ":hover": {
                    backgroundColor: "#d1d1d1",
                  },
                }}
                control={
                  <Checkbox
                    checked={contentAnswer?.checked}
                    onChange={(e) => handleChange(e, index)}
                  />
                }
              />
            )
        )}
      </div>
    </div>
  );
}
