import React, { useState } from 'react';
import ImageInput from '../components/Image-Input';

const ReusableImage = () => {
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(image); 
  };

  return (
    <form onSubmit={handleSubmit} className='mt-10 flex flex-col gap-5 items-center'>
      <ImageInput
        name="profilePicture"
        alt="Profile Picture"
        value={image}
        setValue={setImage}
        validationRules={{ required: true, maxSize: 2 * 1024 * 1024 }} // 2 MB size limit
        validationMessages={{
          requiredMessage: 'Profile picture is required.',
          maxSizeMessage: 'Profile picture should be less than 2 MB.',
        }}
      />

      <button type="submit" className="mt-5 px-4 py-2 font-medium bg-blue-500 text-white w-fit rounded-lg">
        Submit
      </button>
    </form>
  );
};

export default ReusableImage;
