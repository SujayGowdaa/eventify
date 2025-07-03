import Flex from '../ui/Flex';
import HeroTitle from '../ui/HeroTitle';
import HeroParagraph from '../ui/HeroParagraph';
import { useState, useEffect } from 'react'; // Import useEffect
import { MdCloudUpload } from 'react-icons/md';
import type { Event } from '../types/event'; // <--- FIX 1: Import Event type

// Define the HandleChange type here, or import it from a common types file if available
type HandleChange = <T extends keyof Event, U extends Event[T]>(
  field: T,
  value: U
) => void;

type Props = {
  handleChange: HandleChange;
  formData: Event;
};

export default function EventCover({ handleChange, formData }: Props) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // <--- FIX 3: Use useEffect to set selectedImage based on formData
  useEffect(() => {
    // If formData.image already has a URL (e.g., loaded from localStorage)
    if (formData.image) {
      setSelectedImage(formData.image);
    } else if (formData.coverImage instanceof File) {
      // If a new file is selected (File object in coverImage)
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(formData.coverImage);
    } else {
      // If neither is present, ensure selectedImage is null
      setSelectedImage(null);
    }
  }, [formData.image, formData.coverImage]); // Re-run when these formData properties change

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      // Create a FileReader instance for immediate preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);

      // <--- FIX 2: Pass the File object to 'coverImage' property
      // 'image' is for the URL, 'coverImage' is for the File object
      handleChange('coverImage', file);
    } else {
      setSelectedImage(null);
      // <--- FIX 2: Clear 'coverImage' when no file is selected
      handleChange('coverImage', null);
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
