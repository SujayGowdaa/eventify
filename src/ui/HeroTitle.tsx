type Props = {
  children: string;
};

function HeroTitle({ children }: Props) {
  return (
    <h1 className='text-6xl font-brand text-gradient-orange max-w-max'>
      {children}
    </h1>
  );
}

export default HeroTitle;
