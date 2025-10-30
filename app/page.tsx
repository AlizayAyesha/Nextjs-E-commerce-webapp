import Hero from "./components/Hero";
import Newest from "./components/Newest";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import Service from "./components/Service";
import Blog from "./components/Blog";

export default function Home() {
  return (
    <div>
      <Hero />
      <Newest />
      <Testimonials />
      <CTA />
      <Service />
      <Blog />
    </div>
  );
}
