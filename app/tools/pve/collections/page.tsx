import Link from 'next/link';
import { HeaderSection } from './_components/header-section';

export default function CollectionsPage() {
  return (
    <>
      <HeaderSection />
      <Link href="/tools/pve/collections/x-collection">
        Go to &quot;X collection&quot;
      </Link>
    </>
  );
}
