type Props = {
  children: string;
};

function HeroParagraph({ children }: Props) {
  return <p className=' text-lg text-base-black mt-[-0.5rem]'>{children}</p>;
}

export default HeroParagraph;
