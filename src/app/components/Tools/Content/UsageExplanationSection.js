const UsageExplanationSection = ({ title, explanation }) => (
  <div className="bg-[#FFFBFB] px-4 sm:px-8 lg:px-28 py-12 flex flex-col w-full mt-28">
    <div className="flex flex-col items-center gap-5 w-full mx-auto">
      <h1 className="text-[#212121] font-urbanist font-semibold text-3xl sm:text-4xl lg:text-[40px] leading-tight text-center">
        {title}
      </h1>
      {explanation.map((text, index) => (
        <p
          key={index}
          className="text-[#212121] font-urbanist font-normal text-base sm:text-lg lg:text-xl leading-[1.6] text-center"
        >
          {text}
        </p>
      ))}
    </div>
  </div>
);

export default UsageExplanationSection;
