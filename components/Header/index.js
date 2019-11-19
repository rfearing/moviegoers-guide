import css from './style.scss';

/**
 * The Header for the default Layout
 */
export default () => (
  <header className={`blue-background ${css.pageHeader}`}>
    <div className="container py-3 justify-content-between d-flex align-items-center">
      <img
        alt="Logo for Ultimate Moviegoers Guide"
        src="/logo.png"
      />
      <input
        type="text"
        value=""
        placeholder="Search Movies"
      />
    </div>
  </header>
);
