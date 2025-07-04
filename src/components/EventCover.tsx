/* eslint-disable no-constant-condition */
import Flex from '../ui/Flex';
import HeroTitle from '../ui/HeroTitle';
import HeroParagraph from '../ui/HeroParagraph';
import { useState, useEffect } from 'react';
import { MdCloudUpload } from 'react-icons/md';
import type { Event } from '../types/event';

// Define the HandleChange type here, or import it from a common types file if available
// coverImage will now store a string (Base64) or null
type HandleChange = <T extends keyof Event, U extends Event[T]>(
  field: T,
  value: U
) => void;

type Props = {
  handleChange: HandleChange;
  formData: Event;
};

export default function EventCover({ handleChange, formData }: Props) {
  // selectedImage will always store the Base64 URL for display
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Use useEffect to set selectedImage based on formData.coverImage
  // (which will now store the Base64 string from localStorage or direct input)
  useEffect(() => {
    if (formData.coverImage) {
      setSelectedImage(formData.coverImage);
    } else {
      setSelectedImage(null);
    }
    // Only re-run if formData.coverImage changes
  }, [formData.coverImage]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setSelectedImage(base64String); // Set for immediate preview

        // Pass the Base64 string to 'coverImage' property in formData
        // This is the key change for persistence
        // The type assertion 'as any' is a workaround because TypeScript
        // doesn't fully understand the dynamic nature of handleChange with union types.
        // The crucial part is that `base64String` is `string | null` which matches
        // the new `coverImage` type.
        handleChange('coverImage', base64String as any);
      };
      reader.readAsDataURL(file); // Read file as Base64
    } else {
      setSelectedImage(null);
      // Clear 'coverImage' in formData when no file is selected
      handleChange('coverImage', null as any);
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
