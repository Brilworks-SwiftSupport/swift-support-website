import Image from "next/image";

const FeatureSection = ({ features }) => (
  <div>
    <h1 className="text-[40px] font-semibold leading-[60px] text-center text-[#212121] w-full mt-24">
      Features
    </h1>
    <div className="container mx-auto px-4 mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="relative flex flex-col items-start bg-white border border-[#E4E4E4] rounded-2xl"
          >
            <div className="flex items-start justify-start w-[72px] h-[72px] bg-[#FFFEEE] rounded-[10px] mt-6 ml-6">
              <Image
                className="mx-auto w-auto h-auto"
                src={feature.icon}
                alt={feature.title}
              />
            </div>
            <div className="w-full text-black text-start px-6 py-6">
              <h2 className="font-urbanist text-[24px] font-semibold leading-[29px] text-[#212121]">
                {feature.title}
              </h2>
              <p className="font-urbanist text-[16px] font-normal leading-[26px] text-[#212121] mt-4">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default FeatureSection;
