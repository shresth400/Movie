import React from 'react'; 

const Footer = () => {
  return (
    <>
      {/* Footer container with Flexbox layout, green background, and padding */}
      <div className='flex items-center justify-evenly bg-green-600 p-4 border-t-2'>
        
        {/* Logo section */}
        <div>
          {/* Logo image with height of 40 */}
          <img src="../../images/logo_white.png" alt="logo" className='h-40' />
        </div>

    
      </div>
    </>
  );
};

export default Footer;
