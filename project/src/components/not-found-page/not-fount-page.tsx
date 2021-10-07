import Header from '../header/header';

function NotFoundPage(): JSX.Element {
  return (

    <div className="page page--favorites-empty">
      <Header />
      <main className="page__main page__main--favorites page__main--favorites-empty">
        <div className="page__favorites-container container">
          <section className="favorites favorites--empty">
            <h1 className="visually-hidden">Page not found</h1>
            <div className="favorites__status-wrapper">
              <b className="favorites__status">404: Page not found.</b>
              <a className="favorites__status-description" href="/">
                <p style={{textDecoration: 'underline'}}>Go to the main page</p>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default NotFoundPage;
