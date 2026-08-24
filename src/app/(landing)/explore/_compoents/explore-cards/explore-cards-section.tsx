import ExploreCards from './explore-cards';
import { exploreCardsData } from './explore-cards-constants';

export default function ExploreCardsSection() {
  return (
    <div className="flex flex-col divide-y divide-beige">
      {exploreCardsData.map((exploreCard) => (
        <ExploreCards key={exploreCard.id} {...exploreCard} />
      ))}
    </div>
  );
}