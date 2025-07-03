type Props = {
  message: string;
};

export default function ErrorText({ message }: Props) {
  return <p className=' text-sm text-red-600'>{message}</p>;
}
