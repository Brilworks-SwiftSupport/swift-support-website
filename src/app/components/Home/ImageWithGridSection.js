import Image from "next/image";
import React from "react";

const ImageWithGridSection = ({ sectionName }) => {
  const unlockPotentialGridData = {
    title: "Unlock the Full Potential of Your Business with an AI Automation",
    imageSrc: "/images/AI-AUTOMATION.svg",
    imageAlt: "ai-automation",
    gridData: [
      {
        title: "Problem",
        description: (
          <>
            <p className="mb-2">
              <span className="font-semibold">Critical Issues: </span>Customer
              inquiries regarding critical issues often require responses within
              2-4 hours.
            </p>
            <p className="mb-2">
              <span className="font-semibold">Non-Critical Issues: </span>
              Non-urgent requests typically expect responses within 4-8 hours.
            </p>
            <p className="mb-2">
              <span className="font-semibold">Customer Frustration: </span>
              During these waiting periods, customers are left without answers,
              leading to dissatisfaction and potential loss of trust.
            </p>
            <p>
              <span className="font-semibold">Manual Workload: </span>
              Support teams are overwhelmed by repetitive tasks, such as sorting
              emails, categorizing them, and drafting responses.
            </p>
          </>
        ),
        bgColor: "bg-[#FFEFEF]",
      },

      {
        title: "Solution",
        description: (
          <>
            <p className="mb-2">
              <span className="font-semibold">Automated Responses: </span>
              Implement automation to handle 1/3 of emails that don’t require
              manual intervention.
            </p>
            <p className="mb-2">
              <span className="font-semibold">Categorization: </span>
              Automatically categorize inquiries (e.g., technical support,
              sales, general inquiries).
            </p>
            <p className="mb-2">
              <span className="font-semibold">Email Automation: </span>
              Integrate email automation into sending a mail or prepare a draft
              email to help a support team.
            </p>
          </>
        ),
        bgColor: "bg-[#E3FFF3]",
      },
      {
        title: "Output",
        description: (
          <>
            <p className="mb-2">
              <span className="font-semibold">Faster Response Times: </span>

              <p className="ml-6">
                <>
                  <span className="font-semibold">ii. </span> For automated
                  emails, response times drop to &lt; 1 second.
                </>
              </p>
              <p className="ml-6">
                <span className="font-semibold">ii. </span> Critical issues can
                be flagged and directed to human agents, ensuring they’re
                handled swiftly.
              </p>
            </p>
            <p className="mb-2">
              <span className="font-semibold">Reduced Workload: </span>
              Support teams can focus on complex, high-priority issues, while
              automation handles routine inquiries.
            </p>
            <p>
              <span className="font-semibold">
                Improved Customer Satisfaction:{" "}
              </span>
              Quicker, more accurate responses lead to better customer
              experiences, reducing frustration and improving brand loyalty.
            </p>
          </>
        ),
        bgColor: "bg-[#F9F1FF]",
      },
    ],
  };
  const aiCopilotData = {
    imageSrc: "/images/AI-COPILOT.svg",
    imageAlt: "ai-copilot",
    gridData: [
      {
        title: "Problem",
        description: (
          <>
            <p className="mb-2">
              <span className="font-semibold">
                Manual Information Retrieval:
              </span>
              Field service agents often need to sift through multiple
              documents, databases, and systems to find the information they
              need. This manual process can take 15-30 minutes just for reading
              and gathering relevant data.
            </p>
            <p className="mb-2">
              <span className="font-semibold">Delayed Response: </span>
              This time-consuming process leads to significant delays in
              providing solutions to customers or resolving on-site issues,
              causing frustration and inefficiencies.
            </p>
            <p className="mb-2">
              <span className="font-semibold">Data Silos: </span>
              Vital information is often scattered across different sources
              (e.g., manuals, PDF documents, databases), making it difficult to
              access quickly and effectively.
            </p>
          </>
        ),
        bgColor: "bg-[#FFEFEF]",
      },

      {
        title: "Solution",
        description: (
          <>
            <p className="mb-2">
              <span className="font-semibold">
                Faster Search Capabilities:{" "}
              </span>
              AI Copilot allows agents to search for specific answers across
              multiple data sources in seconds.
              <p className="ml-6">
                <span className="font-semibold">i. Unified Access: </span>
                Centralize access to all relevant information (e.g., service
                manuals, customer history, technical documentation) in one
                place.
              </p>
              <p className="ml-6">
                <span className="font-semibold">
                  ii. Real-Time Recommendations:{" "}
                </span>
                AI Copilot provides real-time, step-by-step suggestions for
                complex queries, helping agents troubleshoot faster.
              </p>
            </p>
            <p>
              <span className="font-semibold">Data Streamlining: </span>
              <p className="ml-6">
                <span className="font-semibold">i. </span>Organize scattered
                data into actionable insights, filtering out irrelevant
                information and bringing critical data to the forefront.
              </p>
              <p className="ml-6">
                <span className="font-semibold">ii. </span>Integrate with
                various platforms to ensure up-to-date, comprehensive
                information is available at all times.
              </p>
            </p>
          </>
        ),
        bgColor: "bg-[#E3FFF3]",
      },
      {
        title: "Output",
        description: (
          <>
            <p className="mb-2">
              <span className="font-semibold">Faster Resolution Times: </span>
              By cutting down the manual search and reading time from 15-30
              minutes to just seconds, agents can resolve issues more
              efficiently.
            </p>
            <p className="mb-2">
              <span className="font-semibold">On-Time Solutions: </span>
              The streamlined access to vital information ensures that problems
              are addressed promptly, leading to timely resolution of field
              queries.
            </p>
            <p className="mb-2">
              <span className="font-semibold">Increased Productivity: </span>
              Field agents can focus on solving complex problems rather than
              searching for information, enhancing overall productivity and
              reducing downtime.
            </p>
            <p>
              <span className="font-semibold">
                Improved Customer Experience:
              </span>
              Faster response and resolution times lead to increased customer
              satisfaction and stronger trust in the service provided.
            </p>
          </>
        ),
        bgColor: "bg-[#F9F1FF]",
      },
    ],
  };
  const aiAgentData = {
    imageSrc: "/images/AI-AGENT.svg",
    imageAlt: "ai-agent",
    gridData: [
      {
        title: "Problem",
        description: (
          <>
            <p className="mb-2">
              <span className="font-semibold">
                Increased Workforce Demand:{" "}
              </span>
              Handling a large volume of customer inquiries manually requires
              more staff, which leads to a higher need for human resources to
              manage different communication channels like email, phone, and
              chat.
            </p>
            <p>
              <span className="font-semibold">High Operational Costs: </span>
              The cost of hiring, training, and maintaining a larger team of
              support agents is substantial, especially when inquiries are
              repetitive or routine.
            </p>
          </>
        ),
        bgColor: "bg-[#FFEFEF]",
      },

      {
        title: "Solution",
        description: (
          <>
            <p>
              <span className="font-semibold">
                Automated Responses via Multiple Platforms:
              </span>
              Implement AI-driven automation to handle customer queries across
              preferred platforms like web chat and WhatsApp.
              <p className="ml-6">
                <span className="font-semibold">i. Omnichannel Support: </span>
                Connect with customers on the platforms they use most (e.g.,
                website chat, WhatsApp) to provide seamless, AI-powered
                interactions.
              </p>
              <p className="ml-6">
                <span className="font-semibold">ii. 24/7 Availability: </span>
                AI agents are available around the clock, offering immediate
                assistance without the need for human intervention.
              </p>
            </p>
          </>
        ),
        bgColor: "bg-[#E3FFF3]",
      },
      {
        title: "Output",
        description: (
          <>
            <p className="mb-2">
              <span className="font-semibold">Reduced Costs: </span>
              By automating routine inquiries and providing instant responses,
              operational costs can be reduced by up to 66%.
            </p>
            <p className="mb-2">
              <span className="font-semibold">
                Lower Manpower Requirements:
              </span>
              Automation minimizes the need for human agents to respond to
              repetitive or common queries, freeing up staff to focus on
              complex, high-priority issues.
            </p>
            <p>
              <span className="font-semibold">Faster Customer Support: </span>
              With AI responding instantly to inquiries on platforms like web
              chat and WhatsApp, response times drop significantly, improving
              customer satisfaction.
            </p>
          </>
        ),
        bgColor: "bg-[#F9F1FF]",
      },
    ],
  };

  const showDataBasedOnSectionName = {
    "Unlock Full Potential": unlockPotentialGridData,
    "AI Copilot": aiCopilotData,
    "AI Agent": aiAgentData,
  };

  const sectionData = showDataBasedOnSectionName[sectionName] || {};

  return (
    <div
      className="md:py-[60px] py-10"
      id={sectionName?.replace(" ", "-")?.toLowerCase()}
    >
      <div className="container max-w-[1200px] mx-auto w-full">
        {sectionData?.title && (
          <h2 className="new-h2 md:w-[80%] w-full mx-auto lg:mb-[50px] md:mb-10 mb-6 px-4">
            {sectionData?.title}
          </h2>
        )}
        <div className="flex items-center justify-center mb-[30px] px-4">
          <Image
            className="w-full"
            src={sectionData?.imageSrc}
            alt={sectionData?.imageAlt}
            width="1080"
            height="510"
          />
        </div>
        <div className="grid grid-cols-1 gap-5 md:mb-[30px] mb-0 mx-5">
          {sectionData?.gridData.map((item, index) => (
            <div key={index} className={`${item.bgColor} rounded-[20px] p-5`}>
              <p className="text-colorBlack text-2xl mb-[10px] font-semibold">
                {item.title}:
              </p>
              <p className="text-lg text-colorBlack">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageWithGridSection;
