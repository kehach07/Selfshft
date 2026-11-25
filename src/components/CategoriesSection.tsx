import { useState } from "react";
import { 
  ShoppingBag, 
  Utensils, 
  Dumbbell, 
  ChefHat, 
  Hotel, 
  Home,
  GraduationCap,
  Palette,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import categoryTuition from "@/assets/category-tuition.jpg";
import categoryChef from "@/assets/category-chef.jpg";
import categoryFitness from "@/assets/category-fitness.jpg";
import categoryCrafts from "@/assets/category-crafts.jpg";
import categoryRetail from "@/assets/category-retail.jpg";
import categoryHotel from "@/assets/category-hotel.jpg";

const categories = [
  {
    icon: ShoppingBag,
    title: "Shop Staff",
    description: "Retail, cashier, and customer service positions",
    jobs: 1250,
    image: categoryRetail,
    color: "from-teal to-teal-light",
  },
  {
    icon: Utensils,
    title: "Restaurant Staff",
    description: "Waiters, hosts, and service positions",
    jobs: 890,
    image: categoryChef,
    color: "from-coral to-coral-light",
  },
  {
    icon: Dumbbell,
    title: "Gym Trainers",
    description: "Personal training and fitness coaching",
    jobs: 430,
    image: categoryFitness,
    color: "from-purple to-purple-light",
  },
  {
    icon: ChefHat,
    title: "Chefs & Cooks",
    description: "Kitchen staff and culinary positions",
    jobs: 670,
    image: categoryChef,
    color: "from-secondary to-pink",
  },
  {
    icon: Hotel,
    title: "Hotel Management",
    description: "Front desk, housekeeping, and hospitality",
    jobs: 520,
    image: categoryHotel,
    color: "from-teal to-purple",
  },
  {
    icon: Home,
    title: "Home Services",
    description: "Maids, mess workers, and domestic help",
    jobs: 980,
    image: categoryTuition,
    color: "from-coral to-purple",
  },
  {
    icon: GraduationCap,
    title: "Tutoring",
    description: "Academic tutoring and coaching",
    jobs: 1500,
    image: categoryTuition,
    color: "from-accent to-pink",
  },
  {
    icon: Palette,
    title: "Creative Work",
    description: "Crafts, pottery, and artistic services",
    jobs: 340,
    image: categoryCrafts,
    color: "from-pink to-coral",
  },
];

const CategoriesSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="categories" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-teal/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-purple/5 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Employment Categories
          </span>
          <h2 className="text-4xl md:text-5xl font-syne font-bold mb-6">
            Find Your <span className="gradient-text">Perfect Role</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Browse through diverse employment categories and find opportunities that match your skills
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Background Image */}
              <div className="aspect-[4/5] relative">
                <img
                  src={category.image}
                  alt={category.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60 group-hover:opacity-70 transition-opacity duration-500`} />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                  <category.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                
                <h3 className="text-xl font-syne font-bold text-primary-foreground mb-2">
                  {category.title}
                </h3>
                <p className="text-primary-foreground/80 text-sm mb-3 line-clamp-2">
                  {category.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-primary-foreground/70 text-sm">
                    {category.jobs.toLocaleString()} openings
                  </span>
                  <ArrowRight className={`w-5 h-5 text-primary-foreground transition-all duration-300 ${hoveredIndex === index ? 'translate-x-1' : ''}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button variant="outline-gradient" size="xl">
            View All Categories
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
