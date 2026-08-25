import ExploreCards from './explore-cards';
import { exploreCardsData } from './explore-cards-constants';

export default function ExploreCardsSection() {
  return (
    <div className="flex flex-col">
      {exploreCardsData.map((exploreCard) => (
        <ExploreCards key={exploreCard.id} {...exploreCard} />
      ))}
    </div>
  );
}