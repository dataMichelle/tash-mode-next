import React from "react";
import heroImg from "@/assets/images/hero.jpg";
import Image from "next/image";

const Hero = () => {
  return (
    <div>
      <Image src={heroImg} alt="" height={600} width={600} />
    </div>
  );
};

export default Hero;
