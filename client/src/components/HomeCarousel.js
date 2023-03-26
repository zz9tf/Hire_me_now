
import '../css/HomeCarousel.css'
import Carousel from 'react-bootstrap/Carousel';
import slider1Dec1 from '../img/cl_carousel.png';
import slider2Dec2 from '../img/cv_carousel.png'
import slider1Dec2 from '../img/decoration2.png';
import { Link } from 'react-router-dom';



function HomeCarousel() {
  const slides = [
    {
      id: 1,
      imageUrls: [slider1Dec1],
      backgroundColor: "#ECF5F6",
      title: "Ignite careers with captivating cover letters.",
      description: "We are your perfect writing helper for resumes and cover letters. Choose from several templates and follow easy prompts to create the perfect job-ready resume effortlessly.",
      buttonText: "Write Coverletters",
      highlightedWord: "Ignite",
      link: "/coverletter",
    },
    {
      id: 2,
      imageUrls: [slider2Dec2],
      backgroundColor: "#F6E8EA",
      title: "Your Resume, Could be Outstanding.",
      description: "We are your perfect writing helper for resumes and cover letters. Choose from several templates and follow easy prompts to create the perfect job-ready resume effortlessly.",
      buttonText: "Build Resume",
      link: "/coverletter",
    },
    {
      id: 3,
      imageUrls: [slider1Dec1],
      backgroundColor: "#F7F7F7",
      title: "Transform Your Text: AI Genius.",
      description: "We are your perfect writing helper for resumes and cover letters. Choose from several templates and follow easy prompts to create the perfect job-ready resume effortlessly.",
      buttonText: "Find AI Writing Helper",
      link: "/WritingHelper",
    },
    {
      id: 4,
      imageUrls: [slider1Dec1],
      backgroundColor: "#F7F7F7",
      title: "Fourth slide label",
      description: "We are your perfect writing helper for resumes and cover letters. Choose from several templates and follow easy prompts to create the perfect job-ready resume effortlessly.",
      buttonText: "Learn More",
      link: "/coverletter",
    },
    {
      id: 5,
      imageUrls: [slider1Dec1],
      backgroundColor: "#F6E8EA",
      title: "Fifth slide label",
      description: "We are your perfect writing helper for resumes and cover letters. Choose from several templates and follow easy prompts to create the perfect job-ready resume effortlessly.",
      buttonText: "Learn More",
      link: "/coverletter",
    }
  ];
  
  return ( 
    <Carousel interval={5000} slide={true}>
      {slides.map((slide) => (
        <Carousel.Item key={slide.id}>
          <div
            className="carousel-slide"
            style={{
              backgroundColor: slide.backgroundColor,
              height: "600px",
            }}
          >
            <div className="image-container">
              {slide.imageUrls.map((imageUrl, index) => (
                <img key={index} className="slider-image" src={imageUrl} alt="" />
              ))}
            </div>
            <div className="carousel-caption-container">
              <div className="caption-right">
                <h3>
                  {slide.title}
                {/* {slide.title.split(' ').map((word, index) => {
                    if (word === slide.highlightedWord) {
                      return <span key={index} className="highlighted-word">{word} </span>;
                    }
                    return <span key={index}>{word} </span>;
                  })} */}
                </h3>
                <p>{slide.description}</p>
                <Link to={slide.link}>
                  <button>{slide.buttonText}</button>
                </Link>
              </div>
            </div>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default HomeCarousel;