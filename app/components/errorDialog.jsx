import React from "react";
import styles from 'styles/errorDialog.module.css';
import NextLink from "next/link";
import { currentTaskRepartitionAtom } from "../lib/atoms.js";

export default function errorDialog(props) {
  const {noInput , isAxiosError } = props
  return (
    <div>
      {noInput || isAxiosError ? (
        <div className={styles.errorDialog_wrapper}>
          <div className={styles.errorDialog_box}>
            <p>
              エラーが発生しました、
              <br />
              最初からやり直してください。
            </p>
            <NextLink href={{ pathname: "/input", currentTaskRepartitionAtom: currentTaskRepartitionAtom }} as="/input">
              <a className={styles.errorDialog_link}>入力画面に戻る</a>
            </NextLink>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
