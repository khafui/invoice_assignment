import Image from 'next/image';
import React from 'react';

const Sidebar = () => {
  return (
    <div className='sidebar '>
      <div className='sidebar__container'>
        <div className='sidebar__header '>
          <div className='sidebar__logo'>
            <h2 className='font-bold uppercase px-2 tracking-wider'>
              Invoice App
            </h2>
          </div>
        </div>

        {/* <div className='sidebar__bottom'>
          <Image src='/next.svg' alt='avatar' width='50' height='50' />
        </div> */}
      </div>
    </div>
  );
};

export default Sidebar;
