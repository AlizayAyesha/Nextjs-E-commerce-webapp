// my-app/app/components/Footer.tsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-cover bg-center py-10 mt-10" style={{ backgroundImage: `url('https://i.pinimg.com/1200x/62/24/3c/62243cc748156ad36b7252e1e332e774.jpg')` }}>
      <div className="container mx-auto text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Nextjs Ecommerce Store</h2>
        <p className="mb-2">Made in atleast 48Hours</p>
        <ul className="flex justify-center space-x-4 mb-4">
  <li>
    <a
      href="https://github.com/panaverse/learn-nextjs/blob/main/HACKATHONS/-02.HackathonMilestone-BasedE-CommerceAppBuilder/01_Hackathon%20Milestone-Based%20E-Commerce%20App%20with%20Nextjs.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:underline"
    >
      Hackathon by PIAIC
    </a>
  </li>
</ul>

        <p className="text-sm">&copy; {new Date().getFullYear()} Made By Alizay Ayesha</p>
      </div>
    </footer>
  );
};

export default Footer;
