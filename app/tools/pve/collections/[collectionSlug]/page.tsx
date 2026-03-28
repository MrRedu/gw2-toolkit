interface CollectionsPageProps {
  params: Promise<{ collectionSlug: string }>;
}

export default async function CollectionsPage({
  params,
}: CollectionsPageProps) {
  const { collectionSlug } = await params;

  return (
    <>
      <h2>{`</CollectionsPage ${collectionSlug}>`}</h2>
    </>
  );
}
