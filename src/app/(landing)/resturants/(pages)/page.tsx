import Main from "@/src/shared/ui/main/main";
import { getRestaurants } from "../_services/restaurants.server";

export default async function RestaurantsPage() {
	const { data: restaurants } = await getRestaurants();

	return (
		<Main>
			<div className="min-h-screen bg-light-beige p-6">
				<div className="mx-auto grid w-[95%] max-w-5xl gap-4">
					{restaurants.map((restaurant) => (
						<a key={restaurant.id} href={`/restaurant-detail/${restaurant.slug}`} className="border border-gray-200 bg-white p-4">
							<h2 className="text-lg font-medium text-secondary">{restaurant.name}</h2>
							<p className="text-sm text-gray">{restaurant.short_description ?? restaurant.address ?? ""}</p>
						</a>
					))}
				</div>
			</div>
		</Main>
	);
}
