
import '../css/HomeCarousel.css'
import Carousel from 'react-bootstrap/Carousel';
import slider1Dec1 from '../img/cl_carousel.png';
import slider2Dec2 from '../img/decoration1.png'
import slider1Dec2 from '../img/decoration2.png';


function HomeCarousel() {
  const slides = [
    {
      id: 1,
      imageUrls: [slider1Dec1],
      backgroundColor: "#ECF5F6",
      title: "Ignite careers with captivating cover letters.",
      description: "We are your perfect writing helper for resumes and cover letters. Choose from several templates and follow easy prompts to create the perfect job-ready resume effortlessly.",
      buttonText: "Write Coverletters",
      highlightedWord: "Ignite"
    },
    {
      id: 2,
      imageUrls: [slider1Dec1, slider1Dec2, slider1Dec1],
      backgroundColor: "#E8EDFA",
      title: "Your Resume, Could be Outstanding.",
      description: "We are your perfect writing helper for resumes and cover letters. Choose from several templates and follow easy prompts to create the perfect job-ready resume effortlessly.",
      buttonText: "Learn More"
    },
    {
      id: 3,
      imageUrls: [slider1Dec1, slider1Dec2, slider1Dec1],
      backgroundColor: "#F6E8EA",
      title: "Third slide label",
      description: "Praesent commodo cursus magna, vel scelerisque nisl consectetur.",
      buttonText: "Learn More"
    },
    {
      id: 4,
      imageUrls: [slider1Dec1, slider1Dec2, slider1Dec1],
      backgroundColor: "#F7F7F7",
      title: "Fourth slide label",
      description: "Curabitur ullamcorper ultricies nisi. Nam eget dui.",
      buttonText: "Learn More"
    },
    {
      id: 5,
      imageUrls: [slider1Dec1, slider1Dec2, slider1Dec1],
      backgroundColor: "#F6E8EA",
      title: "Fifth slide label",
      description: "Etiam justo. Etiam pretium iaculis justo.",
      buttonText: "Learn More"
    }
  ];
  
  return ( 
    <Carousel interval={10000} slide={true}>
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
                <button>{slide.buttonText}</button>
              </div>
            </div>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default HomeCarousel;