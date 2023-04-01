const scrollToSection = (sectionName) => {
    const section = document.querySelector(`#${sectionName}`);
    section.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default scrollToSection;