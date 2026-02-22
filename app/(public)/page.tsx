import { HeroSection } from "@/components/home/HeroSection";
import { ServiceCategoryCards } from "@/components/home/ServiceCategoryCards";
import { BlogPreview } from "@/components/home/BlogPreview";
import { ReviewsCarousel } from "@/components/home/ReviewsCarousel";
import { ContactCTA } from "@/components/home/ContactCTA";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServiceCategoryCards />
      <BlogPreview />
      <ReviewsCarousel />
      <ContactCTA />
    </>
  );
}
