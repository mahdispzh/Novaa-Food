interface Category {
  id: string;
  label: string;
}

interface CategoryTabsProps {
  categories: Category[];
  activeCategory: string;
  onChange: (id: string) => void;
}

export function CategoryTabs({
  categories,
  activeCategory,
  onChange,
}: CategoryTabsProps) {
  return (
    <div className="mt-2 flex gap-4 overflow-x-auto border-b border-gray-200 text-sm">
      {categories.map((category) => {
        const isActive = category.id === activeCategory;
        return (
          <button
            key={category.id}
            className={`whitespace-nowrap pb-2 ${
              isActive
                ? "border-b-2 border-primary font-bold text-secondary"
                : "text-gray-400"
            }`}
            type="button"
            onClick={() => onChange(category.id)}
          >
            {category.label}
          </button>
        );
      })}
    </div>
  );
}