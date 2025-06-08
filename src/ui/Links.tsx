import { Link } from 'react-router-dom';

type props = {
  to: string;
  label: string;
};
export default function Links({ to, label }: props) {
  return <Link to={to}>{label}</Link>;
}
