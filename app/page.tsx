import Hero from "./components/Hero";
import Newest from "./components/Newest";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import Service from "./components/Service";
import Blog from "./components/Blog";
import PersonalizedRecommendations from "./components/PersonalizedRecommendations";

export default function Home() {
  return (
    <div>
      <Hero />
      <Newest />
      <PersonalizedRecommendations />
      <Testimonials />
      <CTA />
      <Service />
      <Blog />
    </div>
  );
}
