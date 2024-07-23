import styles from 'styles/gdprText.module.css';
export default function GdprText() {
  return (
    <div className={styles.gdprText_wrapper}>
      <p className={styles.gdprText_text}>本サイトはcookieにより入力データの取得を、個人を特定しない範囲で行っております。<br />
        提供されたデータは、公平分配理論の研究を遂行し、その後検証するために必要な範囲においてのみ利用いたします。<br />
      </p>
      <p className={styles.gdprText_text}>
        必要である場合、ブラウザの設定によりCookieを無効にすることができます。<br />
        Cookieを無効化すると、一部の機能が使用できない、正常にサイトの閲覧・サービスのご利用等ができないなどが起こる場合がありますので、ご了承ください。<br />
        Cookieの設定の変更を希望される方は、各ブラウザ毎に方法をご確認ください。<br />
        <a className={styles.gdprText_link} href="https://support.apple.com/ja-jp/guide/safari/ibrw850f6c51/mac" target="_blank">Safari（PC）</a> / 
        <a className={styles.gdprText_link} href="https://support.apple.com/ja-jp/105082" target="_blank">Safari（iPhone・iPad）</a> / 
        <a className={styles.gdprText_link} href="https://support.google.com/accounts/answer/61416?hl=ja&co=GENIE.Platform%3DiOS" target="_blank">Google Chrome</a> / 
        <a className={styles.gdprText_link} href="https://support.microsoft.com/ja-jp/windows/microsoft-edge-%E3%81%A7-cookie-%E3%82%92%E7%AE%A1%E7%90%86%E3%81%99%E3%82%8B-%E8%A1%A8%E7%A4%BA-%E8%A8%B1%E5%8F%AF-%E3%83%96%E3%83%AD%E3%83%83%E3%82%AF-%E5%89%8A%E9%99%A4-%E4%BD%BF%E7%94%A8-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank">Microsoft Internet Explorer</a> / 
        <a className={styles.gdprText_link} href="https://support.mozilla.org/ja/kb/block-websites-storing-cookies-site-data-firefox" target="_blank">Mozilla Firefox</a>
      </p>
    </div>
  );
}