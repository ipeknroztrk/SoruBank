import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Button, Row, Col } from 'antd';
import backgroundImage from '../assets/images/foto5.jpg';
import { DeleteOutlined, EditOutlined, HomeOutlined, UserOutlined, UnorderedListOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
const { Meta } = Card;

const ExamDetailsPage = () => {
    const { examId } = useParams();

    const [exam, setExam] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    useEffect(() => {
        const fetchExamDetails = async () => {
            try {
                // Sınav ve soruları getir
                const examResponse = await axios.get(`/api/Exam/${examId}`);
                setExam(examResponse.data);

                const questionResponse = await axios.get(`/api/Exam/${examId}/questions`);
                setQuestions(questionResponse.data);
            } catch (error) {
                console.error('Error fetching exam details:', error);
            }
        };

        fetchExamDetails();
    }, [examId]);

    // Sonraki soruya geçme işlemi
    const nextQuestion = () => {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    };

    // Önceki soruya geçme işlemi
    const prevQuestion = () => {
        setCurrentQuestionIndex(prevIndex => prevIndex - 1);
    };

    // Yükleniyor durumu
    if (!exam || questions.length === 0) {
        return <div style={{ textAlign: 'center', marginTop: '100px' }}>Yükleniyor...</div>;
    }

    // Aktif soruyu al
    const currentQuestion = questions[currentQuestionIndex];

    // Seçenek harflerini oluşturma
    const renderOptionLetter = (index) => {
        return String.fromCharCode(65 + index);
    };

    return (
        <div style={{ padding: '20px', marginTop: '110px' }}>
            
            <Row justify="center" style={{ marginBottom: '20px' }}>
                <Col span={20}>
                    <Card
                        title={<span style={{ color: 'purple', fontFamily: 'Cambria, Cochin, Georgia, Times, Times New Roman, serif' }}>SINAV DETAYLARI</span>}
                        bordered={false}
                        style={{ background: 'white', padding: '20px', textAlign: 'center', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
                    >
                        
                        <Card
                            hoverable
                            style={{ width: '100%', backgroundColor: '#f0f0f0' }}
                            bodyStyle={{ padding: '20px' }}
                        >
                            <Meta title={`Soru ${currentQuestionIndex + 1}`} description={currentQuestion.questionText} />
                            {/* Seçenek listesi ve doğru cevap göstergesi */}
                            <ul style={{ listStyleType: 'none', padding: 0 }}>
                                <li style={{ color: currentQuestion.correctAnswer === currentQuestion.optionA ? 'green' : 'inherit' }}>
                                    {renderOptionLetter(0)}. {currentQuestion.optionA}
                                </li>
                                <li style={{ color: currentQuestion.correctAnswer === currentQuestion.optionB ? 'green' : 'inherit' }}>
                                    {renderOptionLetter(1)}. {currentQuestion.optionB}
                                </li>
                                <li style={{ color: currentQuestion.correctAnswer === currentQuestion.optionC ? 'green' : 'inherit' }}>
                                    {renderOptionLetter(2)}. {currentQuestion.optionC}
                                </li>
                                <li style={{ color: currentQuestion.correctAnswer === currentQuestion.optionD ? 'green' : 'inherit' }}>
                                    {renderOptionLetter(3)}. {currentQuestion.optionD}
                                </li>
                            </ul>
                          
                            <p style={{ color: 'green', fontWeight: 'bold' }}>Doğru Cevap: {currentQuestion.correctAnswer}</p>
                        </Card>
                       
                        <div style={{ marginTop: '20px' }}>
                            <Button type="primary" style={{ backgroundColor: 'purple', borderColor: 'purple' }} disabled={currentQuestionIndex === 0} onClick={prevQuestion}>
                                Önceki Soru
                            </Button>
                            <Button type="primary" style={{ backgroundColor: 'purple', borderColor: 'purple', marginLeft: '10px' }} disabled={currentQuestionIndex === questions.length - 1} onClick={nextQuestion}>
                                Sonraki Soru
                            </Button>
                        </div>
                       
                        <div style={{ position: 'fixed', top: '140px', right: '150px', zIndex: '100' }}>
                            <Link to="/home">
                                <Button type="primary" shape="circle" icon={<HomeOutlined />} size="large" style={{ background: 'purple', marginBottom: '10px', display: 'block' }} />
                               
                            </Link>
                            <Link to="/studentprofilepage">
                                <Button type="primary" shape="circle" icon={<UserOutlined />} size="large" style={{ background: 'purple', marginBottom: '10px', display: 'block' }} />
                               
                            </Link>
                            <Link to="/examlistpage">
                                <Button type="primary" shape="circle" icon={<UnorderedListOutlined />} size="large" style={{ background: 'purple', marginBottom: '10px', display: 'block' }} />
                               
                            </Link>
                            <Link to="/teacherexammanagementpage">
                                <Button type="primary" shape="circle" icon={<PlusOutlined />} size="large" style={{ background: 'purple', marginBottom: '10px', display: 'block' }} />
                               
                            </Link>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default ExamDetailsPage;
