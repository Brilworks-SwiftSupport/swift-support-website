export function Icon({ id, open, openClass, closeClass }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open
          ? `${openClass ? openClass : ""}`
          : `${closeClass ? closeClass : "-rotate-90"}`
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

export function scrollToSection(e, sectionId) {
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.scrollIntoView({
      behavior: "smooth",
    });
  }
}

export const formattedDate = (dateString) => {
  const date = new Date(dateString);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[date.getMonth()];

  // Get the day
  const day = date.getDate();

  // Get the year
  const year = date.getFullYear();

  // Format the date
  return `${month} ${day}, ${year}`;
};

export const blogAuthor = (authorName) => {
  const authorData = [
    {
      name: "Hitesh Umaletiya",
      authorImage:
        "https://a.storyblok.com/f/219851/150x150/9caa5563dc/hitesh-150x150.jpg",
      authorLinkedIn: "https://www.linkedin.com/in/hitesh-umaletiya-266a6077/",
      authorDesc:
        "Co-founder of Brilworks. As technology futurists, we love helping startups turn their ideas into reality. Our expertise spans startups to SMEs, and we're dedicated to their success.",
    },
    {
      name: "Vikas Singh",
      authorImage:
        "https://a.storyblok.com/f/219851/800x800/35b061522a/vikas.jpg",
      authorLinkedIn: "https://www.linkedin.com/in/vksingh319/",
      authorDesc:
        "Vikas, the visionary CTO at Brilworks, is passionate about sharing tech insights, trends, and innovations. He helps businesses—big and small—improve with smart, data-driven ideas.",
      authorPageDesc:
        "Vikas is the Chief Technology Officer (CTO) at Brilworks, leads the company's tech innovations with extensive experience in software development. He drives the team to deliver impactful digital solutions globally​.",
    },
  ];

  const selectedAuthor = authorData.find(
    (author) => author?.name === authorName
  );

  return selectedAuthor;
};

export const calculateReadingTime = (content) => {
  // Average reading speed in words per minute (adjust as needed)
  const wordsPerMinute = 200;

  // Calculate the number of words in the content
  const wordCount = content.split(/\s+/).length / 2;

  // Calculate the reading time in minutes
  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  return readingTime;
};
