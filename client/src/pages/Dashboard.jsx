import Card from "../components/Card";
import { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "../components/Skeleton";

const Dashboard = () => {
  const [auctions, setAuctions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("useEffect triggered - Starting data fetch process...");

    const fetchData = async () => {
      console.log("fetchData function called - Preparing to fetch data...");

      setLoading(true);
      console.log("Loading state set to true");

      try {
        console.log("Attempting to fetch data from API: https://fakestoreapi.com/products");
        const response = await axios.get("https://fakestoreapi.com/products");
        console.log("API response received successfully:", response.data.slice(0, 2)); // First 2 items for brevity

        const formattedData = response.data.map((item) => ({
          _id: item.id,
          itemName: item.title,
          itemPrice: item.price,
          itemPhoto: item.image,
          itemDescription: item.description || "No description available",
          createdAt: new Date().toISOString(),
          itemStartDate: new Date().toISOString(),
          itemEndDate: new Date().toISOString(),
          seller: { _id: "dummy", name: "Fake Seller" },
        }));

        console.log("Formatted data prepared:", formattedData.slice(0, 2)); // First 2 formatted items for brevity
        setAuctions(formattedData);
        console.log("Auctions state updated with data");
      } catch (err) {
        console.error("Error fetching data from API:", err.message);
        setError(err.message);
        console.log("Error state set:", err.message);
      } finally {
        console.log("Loading state set to false - Fetch process completed");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading || auctions === null) {
    console.log("Rendering Skeleton - Loading is true or auctions is null:", {
      loading,
      auctions,
    });
    return (
      <>
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </>
    );
  }
  if (error) {
    console.log("Rendering Error message - Error state:", error);
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }

  console.log("Rendering Auction Cards - Auctions data:", auctions.slice(0, 2)); // First 2 items for brevity

  return (
    <div className="min-h-[calc(100svh-9rem)] px-4 py-4 w-full">
      {auctions && auctions.length > 0 ? (
        auctions.map((auction) => (
          <Card
            key={auction._id}
            auction_id={auction._id}
            item_id={auction.seller._id}
            itemName={auction.itemName}
            itemDescription={auction.itemDescription}
            itemPrice={auction.itemPrice}
            itemPostDate={auction.createdAt}
            itemStartDate={auction.itemStartDate}
            itemEndDate={auction.itemEndDate}
            itemPhoto={auction.itemPhoto}
            sellerName={auction.seller.name}
          />
        ))
      ) : (
        <div className="flex flex-col items-center justify-center py-8 px-4 text-center bg-gray-100 rounded-lg shadow-md my-2 max-w-md max-md:mx-auto">
          <h3 className="text-xl font-medium mt-4 text-gray-700">
            Product not found
          </h3>
          <p className="text-gray-500 mt-2">
            No products available right now.
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;