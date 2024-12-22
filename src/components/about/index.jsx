import React from "react";
import ItemLayout from "./ItemLayout";
import Link from "next/link";

const AboutDetails = () => {
  return (
    <section className="py-20 w-full">
      <div className="grid grid-cols-12 gap-4 xs:gap-6  md:gap-8 w-full">
        <ItemLayout
          className={
            " col-span-full lg:col-span-8 row-span-2 flex-col items-start"
          }
        >
          <h2 className="  text-xl md:text-2xl text-left w-full capitalize">
            Architect of Tomorrow
          </h2>
          <p className="font-light  text-xs sm:text-sm md:text-base   ">
          My journey in 3D modeling and programming is fueled by a passion for shaping immersive worlds that tell powerful stories. From 
          the gritty streets of dystopian cities to towering futuristic skyscrapers, I bring visions of the future to life using cutting-edge tools and technologies.
          I craft these environments with precision and artistry, wielding industry-leading software like Blender, Houdini, Unreal Engine, 
          and Unity. Each tool serves as a key to unlocking new dimensions of creativity, enabling me to design visually stunning, 
          interactive spaces that resonate with realism and imagination. <br />
          With programming expertise as my foundation, I integrate functionality and innovation into every creation. 
          Whether it's scripting interactive experiences, optimizing workflows, or developing tools, my work bridges the 
          gap between technical precision and artistic vision. <br />
          Join me as I continue to push the boundaries of what's possible in environmental design, merging art and technology to 
          construct the architectural landscapes of tomorrow.
          </p>
        </ItemLayout>

        <ItemLayout
          className={" col-span-full xs:col-span-6 lg:col-span-4 text-accent"}
        >
          <p className="font-semibold w-full text-left text-2xl sm:text-5xl">
            4+ <sub className="font-semibold text-base">projects</sub>
          </p>
        </ItemLayout>

        <ItemLayout
          className={"col-span-full xs:col-span-6 lg:col-span-4 text-accent"}
        >
          <p className="font-semibold w-full text-left text-2xl sm:text-5xl">
            3+{" "}
            <sub className="font-semibold text-base">years of experience</sub>
          </p>
        </ItemLayout>

        {/* <ItemLayout
          className={"col-span-full sm:col-span-6 md:col-span-4 !p-0"}
        >
          <img
            className="w-full h-auto"
            src={`${process.env.NEXT_PUBLIC_GITHUB_STATS_URL}/api/top-langs?username=Satii775&theme=transparent&hide_border=true&title_color=FEFE5B&text_color=FFFFFF&icon_color=FEFE5B&text_bold=false`}
            alt="Satii"
            loading="lazy"
          />
        </ItemLayout>

        <ItemLayout className={"col-span-full md:col-span-8 !p-0"}>
          <img
            className="w-full h-auto"
            src={`${process.env.NEXT_PUBLIC_GITHUB_STATS_URL}/api?username=Satii775&theme=transparent&hide_border=true&title_color=FEFE5B&text_color=FFFFFF&icon_color=FEFE5B&text_bold=false`}
            alt="Satii"
            loading="lazy"
          />
        </ItemLayout> */}

        <ItemLayout className={"col-span-full"}>
          <img
            className="w-full h-auto"
            src={`https://skillicons.dev/icons?i=appwrite,aws,bootstrap,css,d3,fgit,github,html,js,jquery,mysql,nextjs,nodejs,npm,react,tailwind,threejs,vercel,vscode`}
            alt="Satii"
            loading="lazy"
          />
        </ItemLayout>

        {/* <ItemLayout className={"col-span-full md:col-span-6 !p-0"}>
          <img
            className="w-full h-auto"
            src={`${process.env.NEXT_PUBLIC_GITHUB_STREAK_STATS_URL}?user=Satii775&theme=dark&hide_border=true&type=svg&background=EB545400&ring=FEFE5B&currStreakLabel=FEFE5B`}
            alt="Satii"
            loading="lazy"
          />
        </ItemLayout> */}

        {/* <ItemLayout className={"col-span-full md:col-span-6 !p-0"}>
          <Link
            href="https://github.com/Satii775/350-Local-Multiplayer-Game.git"
            target="_blank"
            className="w-full"
          >
            <img
              className="w-full h-auto"
              src={`${process.env.NEXT_PUBLIC_GITHUB_STATS_URL}/api/pin/?username=Satii775&repo=350-Local-Multiplayer-Game&theme=transparent&hide_border=true&title_color=FEFE5B&text_color=FFFFFF&icon_color=FEFE5B&text_bold=false&description_lines_count=2`}
              alt="Satii"
              loading="lazy"
            />
          </Link>
        </ItemLayout> */}
      </div>
    </section>
  );
};

export default AboutDetails;
