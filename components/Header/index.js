import css from './style.scss';

/**
 * The Header for the default Layout
 */
export default () => (
  <header className={`blue-background ${css.pageHeader}`}>
    <div className="container py-3">
      <img
        alt="Logo for Ultimate Moviegoers Guide"
        src="/logo.png"
        // width="150"
      />
    </div>
  </header>
);
