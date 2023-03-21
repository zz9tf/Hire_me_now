import React from 'react';
import '../css/FunctionBorders.css';

import coverletterImg from '../img/coverletter_icon.png';
import writtingHelpImg from '../img/writinghelper_icon.png'
import interviewImg from '../img/Interview_icon.png'
import translateImg from '../img/Translate_icon.png'

const FunctionBorders = () => {
  const items = [
    {
      id: 1,
      imageUrl: writtingHelpImg,
      title: 'Find Your AI Writing Helper',
    },
    {
      id: 2,
      imageUrl: coverletterImg,
      title: 'Write<br />Coverletters',
    },
    {
      id: 3,
      imageUrl: interviewImg,
      title: 'Interview Question Guidance',
    },
    {
      id: 4,
      imageUrl: translateImg,
      title: 'Translate<br />Your Resume',
    },
  ];
  return (
    <div className="horizontal-borders">
      {items.map((item) => (
        <div key={item.id} className="border-item">
          <img src={item.imageUrl} alt={item.title} className="border-image" />
          <h4 className="border-title">
          {item.title.split('<br />').map((line, index) => (
              <React.Fragment key={index}>
                {index > 0 && <br />}
                {line}
              </React.Fragment>
            ))}
          </h4>
        </div>
      ))}
    </div>
  );
};

export default FunctionBorders;