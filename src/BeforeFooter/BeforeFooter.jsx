import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Slider from 'react-slick';

const beforeFooter = [
  {
    id: 1,
    name: "Victor",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio",
    img: "https://picsum.photos/101/101",
  },
  {
    id: 2,
    name: "Satya Nadella",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio",
    img: "https://picsum.photos/102/102",
  },
  {
    id: 3,
    name: "Virat Kohli",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio",
    img: "https://picsum.photos/104/104",
  },
  {
    id: 5,
    name: "Sachin Tendulkar",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio",
    img: "https://picsum.photos/103/103",
  },
];



const BeforeFooter = () => {


    const settings = {
      dots: false,
      arrows: false,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      speed: 800,
      autoplaySpeed: 4000,
      rtl: true,
      pauseOnHover: false,
      pauseOnFocus: true,
      cssEase: "ease-in-out",
    };






  return (
    <div className="">
      <Slider {...settings}>
        {beforeFooter.map((beforeFooterr) => (
          <Container  key={beforeFooterr.id} className="h-[300px] relative">
            <h1></h1>
            <Row  className=" gap-4">
              <Col className='bg-gray-100 shadow-sm rounded-lg w-1/3 px-4 mx-2 flex flex-col'>
                <div>
                  <img src={beforeFooterr.img} alt="gg" className='rounded-full' />
                </div>
                <div>
                  <p className='text-sm'>{beforeFooterr.text} </p>
                  <h3 className='text-lg font-bold'>{beforeFooterr.name} </h3>
                </div>
                <p className='absolute -top-8 right-3 font-serif text-9xl text-gray-600'>,,</p>
              </Col>
            </Row>
          </Container>
        ))}
      </Slider>
    </div>
  );
}

export default BeforeFooter