import React from 'react';

// Individual Tool Card Component
const Tools = ({
  imageUrl,
  title,
  description,
  button_title,
  link,
  imageAlt = '',
  
}) => {
  return (
    <div className="max-w-sm bg-[#FFFEEE] border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 ">
      <a href={link}>
        <img 
          className="rounded-t-lg w-full h-48 object-cover" 
          src={imageUrl} 
          alt={imageAlt}
        />
      </a>
      <div className="p-5">
        <h2 className="text-colorBlack md:text-2xl text-xl font-semibold mb-4">
          {title}
        </h2>
        <p className="mb-3 text-gray-700">
          {description}
        </p>
        <a 
          href={link}
          className="common-button header-btn"
        >
          {button_title}
          <svg 
            className="w-4 h-4 ml-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

// Grid Container Component
const ToolsGrid = ({ tools }) => {
  return (
    <div className="container mx-auto py-8 px-4  ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
        {tools.map((tool, index) => (
          <Tools
            key={index}
            imageUrl={tool.imageUrl}
            title={tool.title}
            description={tool.description}
            link={tool.link}
            imageAlt={tool.imageAlt}
            button_title={tool.button_title}
          />
        ))}
      </div>
    </div>
  );
};

export { Tools, ToolsGrid };