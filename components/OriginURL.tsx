import { useRouter } from 'next/router';

function OriginURL() {
  const router = useRouter();
  const originUrl = `${window.location.protocol}//${window.location.host}`;

  return (
    <div>
      The origin URL is: {originUrl}
    </div>
  );
}
export default OriginURL;