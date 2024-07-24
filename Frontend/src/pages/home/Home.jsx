import React from "react";
import Featured from "../../components/featured/Featured";
import Trustedby from "../../components/trustedby/Trustedby";
import Slide from "../../components/slide/Slide";
import CatCard from "../../components/catCard/CatCard";
import { cards, projects } from "../../data";
import "./Home.scss";
import Features from "../../components/features/Features";
import Purple from "../../components/purple/Purple";
import ProjectCard from "../../components/projectcard/ProjectCard";

const Home = () => {
  return (
    <div>
      <Featured />
      <Trustedby />
      <Slide slidesToShow={5} arrowsScroll={5}>
        {cards.map((card) => (
          <CatCard key={card.id} item={card} />
        ))}
      </Slide>
      <Features />
      <Purple />
      <Slide slidesToShow={4} arrowsScroll={4}>
        {projects.map((card) => (
          <ProjectCard key={card.id} item={card} />
        ))}
      </Slide>
    </div>
  );
};

export default Home;
