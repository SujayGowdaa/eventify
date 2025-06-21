type Props = {
  children: string;
};

function HeroTitleSecondary({ children }: Props) {
  return (
    <h2 className=' text-2xl font-semibold capitalize text-base-black'>
      {children}
    </h2>
  );
}

export default HeroTitleSecondary;
