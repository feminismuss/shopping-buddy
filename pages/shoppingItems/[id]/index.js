import { useRouter } from "next/router";
import useSWR from "swr";
import ItemDetails from "@/components/ItemDetails";

export default function ItemDetailsPage() {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: item,
    isLoading,
    error,
  } = useSWR(id ? `/api/shoppingitems/${id}` : null);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading items</p>;
  if (!item) return <p>Item not found</p>;

  return (
    <ItemDetails
      id={item._id}
      name={item.name}
      quantity={item.quantity}
      category={item.category}
      comment={item.comment}
      imageUrl={item.imageUrl}
    />
  );
}
