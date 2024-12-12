const FAQSection = ({ faqItems, activeFAQ, toggleFAQ }) => (
  <div>
    <h1 className="text-[40px] font-semibold leading-[60px] text-center text-[#212121] w-full mt-24">
      Frequently Asked Questions
    </h1>
    <div className="w-full mx-auto space-y-6 mt-8 px-4 sm:px-6 lg:px-8">
      {faqItems.map((item, index) => (
        <div
          key={index}
          className="border rounded-2xl"
          style={{
            background:
              activeFAQ === index
                ? "linear-gradient(45deg, #DCD536 10%, #56D5FF 50%, #FF8585 80%)"
                : "#E4E4E4",
            padding: "1px",
            paddingBottom: activeFAQ === index ? "4px" : "1px",
          }}
        >
          <div className={`bg-white border-white rounded-2xl p-6 `}>
            <div
              className="flex items-center gap-4 cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <span
                className={`w-6 h-6 flex items-center justify-center rounded-full text-4xl text-blue-500`}
              >
                {activeFAQ === index ? "−" : "+"}
              </span>
              <h3 className="text-2xl text-start font-semibold text-gray-900">
                {item.question}
              </h3>
            </div>
            {activeFAQ === index && (
              <div className="mt-4 text-gray-700 text-base">{item.answer}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default FAQSection;
