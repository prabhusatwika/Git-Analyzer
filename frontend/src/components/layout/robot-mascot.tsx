
"use client";

import styles from "./robot-mascot.module.css";

export function RobotMascot() {
  return (
    <div
      className={`${styles.track} hidden md:flex`}
      aria-hidden="true"
    >
      <img
        src="/images/robot-waving.gif"
        alt=""
        className={styles.wavingImage}
        draggable={false}
      />
    </div>
  );
}
