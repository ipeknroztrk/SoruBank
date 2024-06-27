import React, { useRef, useState } from 'react';
import { Card, Col, Row, Carousel, message, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import { PlusOutlined, UnorderedListOutlined, TeamOutlined, PhoneOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import backgroundVideo from '../assets/images/video.mp4';
import teacher7Image from '../assets/images/foto7.jpg';
import teacher8Image from '../assets/images/foto11.jpg';
import teacher9Image from '../assets/images/foto12.jpg';
import teacher1Image from '../assets/images/teacher1.jpg';
import teacher2Image from '../assets/images/teacher2.jpg';
import teacher3Image from '../assets/images/teacher5.jpg';
import teacher4Image from '../assets/images/teacher4.jpg';

import './HomePage.css';

const teachers = [
    {
        name: 'İpek Nur Öztürk',
        subject: 'Fizik Öğretmeni',
        location: 'İstanbul',
        image: teacher1Image
    },
    {
        name: 'Mehmet Demir',
        subject: 'Kimya Öğretmeni',
        location: 'İzmir',
        image: teacher2Image
    },
    {
        name: 'Eylem Seyhan',
        subject: 'Kimya Öğretmeni',
        location: 'İzmir',
        image: teacher3Image
    },
    {
        name: 'Ebrar Seda Gündüz',
        subject: 'Biyoloji Öğretmeni',
        location: 'Bursa',
        image: teacher4Image
    }
];

const HomePage = () => {
    const carouselRef = useRef(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [messageText, setMessageText] = useState('');
    const [phone, setPhone] = useState('');

    const handleNext = () => {
        carouselRef.current.next();
    };

    const handlePrev = () => {
        carouselRef.current.prev();
    };

    const handleSendMessage = () => {
        message.success('Mesaj başarılı bir şekilde gönderildi.');
    };

    return (
        <div className="home-page">
            <div className="home-content">
               
                <Row gutter={[16, 16]} justify="center">
                    <Col span={24}>
                        <div className="carousel-container">
                            <div className="carousel">
                                <Carousel autoplay={false} ref={carouselRef}>
                                   
                                    <div>
                                        <div className="carousel-video-container">
                                            <video autoPlay loop muted className="carousel-video">
                                                <source src={backgroundVideo} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                            <div className="carousel-overlay">Hoş geldiniz, keşfedin!</div>
                                        </div>
                                    </div>

                                    
                                    <div>
                                        <div className="carousel-image-container">
                                            <img src={teacher8Image} alt="Teacher 2" className="teacher-image" />
                                            <div className="carousel-overlay">Hadi başlayalım, burası sizin alanınız!</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="carousel-image-container">
                                            <img src={teacher9Image} alt="Teacher 3" className="teacher-image" />
                                            <div className="carousel-overlay">Başarıya giden yolda bizimle olun!</div>
                                        </div>
                                    </div>
                                </Carousel>
                                <div className="carousel-controls">
                                    <LeftOutlined onClick={handlePrev} className="control-icon" />
                                    <RightOutlined onClick={handleNext} className="control-icon" />
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>

                
                

                <h2 className="title">Öğretmenlerimiz</h2>
                
                <Row gutter={[16, 16]} justify="center" className="home-cards">
                    {teachers.map((teacher, index) => (
                        <Col span={6} key={index}>
                            <Card hoverable className="teacher-card">
                                <div className="teacher-avatar">
                                    <img src={teacher.image} alt={teacher.name} />
                                </div>
                                <div className="teacher-info">
                                    <h3 className="teacher-name">{teacher.name}</h3>
                                    <p className="teacher-subject">{teacher.subject}</p>
                                    <p className="teacher-location">{teacher.location}</p>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>


                <h2 className="title">İşlemlerimiz</h2>
                
                <Row gutter={[16, 16]} justify="center" className="home-cards">
                    <Col span={8}>
                        <Link to="/teacherexammanagementpage">
                            <div className="card-container">
                                <div className="card-icon"><PlusOutlined /></div>
                                <Card hoverable className="home-card" bordered={false}>
                                    Sınav eklemek için tıklayın
                                </Card>
                            </div>
                        </Link>
                    </Col>
                    <Col span={8}>
                        <Link to="/examlistpage">
                            <div className="card-container">
                                <div className="card-icon"><UnorderedListOutlined /></div>
                                <Card hoverable className="home-card" bordered={false}>
                                    Sınav listesini görüntülemek için tıklayın
                                </Card>
                            </div>
                        </Link>
                    </Col>
                    <Col span={8}>
                        <Link to="/studentprofilepage">
                            <div className="card-container">
                                <div className="card-icon"><TeamOutlined /></div>
                                <Card hoverable className="home-card" bordered={false}>
                                    Öğrenci listesini görüntülemek için tıklayın
                                </Card>
                            </div>
                        </Link>
                    </Col>
                </Row>
                <Row gutter={[16, 16]} justify="center" className="contact-panel">
                    <Col span={12}>
                        <div className="map-section">
                            <h2>Adresimiz</h2>
                            <iframe
                                title="Map"
                                width="100%"
                                height="300"
                                frameBorder="0"
                                style={{ border: 0 }}
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.675109301293!2d28.98763081580744!3d41.04274517929785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac61f2a40b01d%3A0x8e48d8f1d7d8e3a7!2sBe%C5%9Fikta%C5%9F%2C%20%C4%B0stanbul!5e0!3m2!1str!2str!4v1624605203113!5m2!1str!2str"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="contact-info">
                            <h2 >İletişim İçin Ulaşın.</h2>
                            <Input placeholder="Adınız ve Soyadınız" value={name} onChange={(e) => setName(e.target.value)} />
                            <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <Input placeholder="Telefon Numarası" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            <Input.TextArea placeholder="Mesajınızı yazın" value={messageText} onChange={(e) => setMessageText(e.target.value)} rows={4} />
                            <Button type="primary"  onClick={handleSendMessage}>Mesaj Gönder</Button>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default HomePage;
