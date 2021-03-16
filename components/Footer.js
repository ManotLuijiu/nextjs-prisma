import React from 'react';

export default function Footer() {
  return (
    // <div>
    //   <div>
    //     Icons made by{' '}
    //     <a href="https://www.freepik.com" title="Freepik">
    //       Freepik
    //     </a>{' '}
    //     from{' '}
    //     <a href="https://www.flaticon.com/" title="Flaticon">
    //       www.flaticon.com
    //     </a>
    //   </div>
    // </div>
    <footer className="text-gray-600 body-font">
      <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
        <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
          <img src="bunchee-online-logo2.svg" width="30" height="30" alt="logo" />
          <span className="ml-3 text-xl">MooCoding</span>
        </a>
        <span className="text-xs inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
          <div>
            Icons made by{' '}
            <a href="https://www.freepik.com" title="Freepik">
              Freepik
            </a>{' '}
            from{' '}
            <a href="https://www.flaticon.com/" title="Flaticon">
              www.flaticon.com
            </a>
          </div>
        </span>
      </div>
    </footer>
  );
}
