import Flex from '../ui/Flex';
import HeroTitle from '../ui/HeroTitle';
import HeroParagraph from '../ui/HeroParagraph';
import { useState, type Dispatch, type SetStateAction } from 'react';
import { MdCloudUpload } from 'react-icons/md';
import type { Event } from '../types/event';

type Props = {
  setFormData: Dispatch<SetStateAction<Event>>;
};

export default function EventCover({ setFormData }: Props) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      // Create a FileReader instance
      const reader = new FileReader();

      // Set the onload event handler for the reader
      reader.onloadend = () => {
        // When the file is done loading, set the result (data URL) to state
        setSelectedImage(reader.result as string);
      };

      // Read the file as a data URL
      reader.readAsDataURL(file);

      // Optionally, you might also want to update your formData with the actual File object
      // so you can send it to the server later.
      // Make sure your setFormData can handle a File object.
      setFormData((prevData) => ({
        ...prevData,
        coverImage: file, // Store the actual File object here for upload
      }));
    } else {
      setSelectedImage(null);
      setFormData((prevData) => ({
        ...prevData,
        coverImage: null,
      }));
    }
  };

  return (
    <>
      <Flex className='gap-0'>
        <HeroTitle>Create Event</HeroTitle>
        <HeroParagraph>
          Easily create and publish your event with all the necessary details.
        </HeroParagraph>
      </Flex>
      <Flex className='gap-4'>
        <p className='text-lg font-semibold capitalize text-base-black'>
          cover image{' '}
          <span className='text-base-dark font-normal'>
            (1920×1080px recommended)
          </span>
        </p>
        <div className='relative h-[400px] w-full overflow-hidden rounded-2xl'>
          {!selectedImage && (
            <div className='bg-base-light h-full w-full flex items-center justify-center'>
              <MdCloudUpload className='text-6xl p-4 text-base-light bg-base-medium rounded-full box-content' />
            </div>
          )}

          {selectedImage && (
            <>
              <img
                className='absolute inset-0 z-[20] w-full h-full object-contain object-center backdrop-blur-sm'
                src={selectedImage}
                alt='background'
              />

              <img
                className='absolute z-[10] object-cover w-full h-full'
                src={selectedImage}
                alt='foreground'
              />
            </>
          )}

          <input
            type='file'
            name='coverImage'
            accept='image/png, image/jpeg'
            className='absolute inset-0 z-[30] h-full w-full opacity-0 cursor-pointer'
            onChange={handleImageChange}
          />
        </div>
      </Flex>
    </>
  );
}
