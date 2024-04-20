"use sever";
import Image from "next/image";
import Link from "next/link";
import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";

async function getCategories() {
  const data = await fetch("http://localhost:3000/api/public/get-categories");

  return await data.json();
}

const Projects = async () => {
  const categories = await getCategories();
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-2 lg:grid-cols-3">
      {categories.category.map((category, i) => {
        return (
          <div>
            <div
              className="h-52 md:h-72 rounded-t-xl relative group"
              style={{
                background: `url(${category.image.image_url})`,
                backgroundSize: "cover",
              }}
            >
              <div className="overlay items-center justify-center absolute top-0 left-0 w-full h-full bg-[#181818] bg-opacity-0 hidden group-hover:flex group-hover:bg-opacity-80 transition-all duration-500 ">
                <a
                  href={category.gitUrl}
                  className="h-14 w-14 mr-2 border-2 relative rounded-full border-[#ADB7BE] hover:border-white group/link"
                >
                  <CodeBracketIcon className="h-10 w-10 text-[#ADB7BE] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  cursor-pointer group-hover/link:text-white" />
                </a>
                <a
                  href={category.webUrl}
                  className="h-14 w-14 border-2 relative rounded-full border-[#ADB7BE] hover:border-white group/link"
                >
                  <EyeIcon className="h-10 w-10 text-[#ADB7BE] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  cursor-pointer group-hover/link:text-white" />
                </a>
              </div>
            </div>
            <div className="text-white rounded-b-xl mt-3 bg-[#181818]py-6 px-4">
              <h5 className="text-xl font-semibold mb-2">{category.name}</h5>
              <p className="text-[#ADB7BE]">{category.discription}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Projects;
