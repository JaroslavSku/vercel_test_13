import React, { useMemo } from "react";
import styles from "./Stepper.module.scss";
import { map } from "lodash";
import { css, jsx } from "@emotion/react";
import { iconsUrl } from "@/utils/urls";
// import { DoneOutline } from "@mui/icons-material";

/** @jsxRuntime classic /
/** @jsx jsx */
/** @jsxImportSource @emotion/react */
export default function Stepper({ step, data, stepCount }) {
  const stepWidth = useMemo(() => {
    console.log("step", stepCount);
    const width = 100 / stepCount;
    return width;
  }, [stepCount]);

  const content = useMemo(() => {
    if (stepCount % 2) {
      return "close-quote";
    }
    return "none";
  }, [stepCount]);

  return (
    <div className={styles.container}>
      <ul
        css={css`
          border: none;
          padding: 0;
          text-align: center;
          & > li:first-child strong:after {
            content: "";
            height: 1px;
            background: #ccc;
            position: absolute;
            top: 50%;
            width: 500px;
            left: 100%;
            margin-left: 20px;
          }
          & > li:first-child + li strong {
            &:before {
              content: "";
              height: 1px;
              background: #ccc;
              position: absolute;
              top: 50%;
              width: 500px;
              right: 100%;
              margin-right: 20px;
            }
            &:after {
              left: 100%;
              margin-left: 20px;
              content: ${content};
              height: 1px;
              background: #ccc;
              position: absolute;
              top: 50%;
              width: 500px;
            }
          }
          & > li:first-child + li + li strong {
            &:before {
              content: "";
              height: 1px;
              background: #ccc;
              position: absolute;
              top: 50%;
              width: 500px;
              right: 100%;
              margin-right: 20px;
            }
          }
        `}
      >
        {map(data, ({ description, number }) => {
          return (
            <li
              key={description}
              style={{ width: `${stepWidth}%` }}
              className={styles.step}
            >
              <strong className={styles.number}>
                {/* {number < step ? <DoneOutline /> : number} */}
              </strong>
              {description}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
