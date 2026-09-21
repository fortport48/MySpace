import { redirect } from 'next/navigation';

interface Props {
  params: {
    username: string;
  };
}

export default function UserProfileRedirect({ params }: Props) {
  redirect(`/u/${params.username}`);
}
