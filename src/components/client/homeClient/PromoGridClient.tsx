import React from "react";

const sections = {
  left: {
    title: "NEW ARRIVALS",
    image: "https://images.unsplash.com/photo-1599059810747-14a58c0374c1?auto=format&fit=crop&w=800&q=80",
  },
  topRight: {
    title: "NOW TRENDING",
    image: "https://images.unsplash.com/photo-1554284126-aa88f22d8b74?auto=format&fit=crop&w=800&q=80",
  },
  bottomRight: [
    {
      title: "CAMPAIGNS",
      image: "https://images.unsplash.com/photo-1581092918349-5a03e2b100ad?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "LOOKBOOK",
      image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=800&q=80",
    },
  ],
};

const PromoGrid = () => {
  return (
<div className="w-[80%] mx-auto py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[500px]">
        {/* Left Large Block */}
        <div
          className="relative h-full rounded-xl overflow-hidden"
          style={{ backgroundImage: `url(${sections.left.image})` }}
        >
          <div className="absolute inset-0 bg-black/40 z-0" />
          <h2 className="absolute bottom-4 left-4 text-white text-3xl font-extrabold z-10">
            {sections.left.title}
            <div className="w-12 h-[3px] bg-lime-400 mt-1" />
          </h2>
        </div>

        {/* Right Column */}
        <div className="col-span-1 flex flex-col gap-4 h-full">
          {/* Top */}
          <div
            className="relative flex-1 rounded-xl overflow-hidden"
            style={{ backgroundImage: `url(${sections.topRight.image})`, backgroundSize: "cover" }}
          >
            <div className="absolute inset-0 bg-black/40 z-0" />
            <h2 className="absolute bottom-4 left-4 text-white text-xl font-bold z-10">
              {sections.topRight.title}
              <div className="w-10 h-[2px] bg-lime-400 mt-1" />
            </h2>
          </div>

          {/* Bottom: Two small blocks */}
          <div className="flex flex-1 gap-4">
            {sections.bottomRight.map((item, index) => (
              <div
                key={index}
                className="relative w-1/2 rounded-xl overflow-hidden"
                style={{ backgroundImage: `url(${item.image})`, backgroundSize: "cover" }}
              >
                <div className="absolute inset-0 bg-black/40 z-0" />
                <h2 className="absolute bottom-4 left-4 text-white text-xl font-bold z-10">
                  {item.title}
                  <div className="w-10 h-[2px] bg-lime-400 mt-1" />
                </h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoGrid;
