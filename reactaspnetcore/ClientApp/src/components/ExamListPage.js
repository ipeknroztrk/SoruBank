import React, { useState, useEffect } from 'react';
import { Card, message, Row, Col, Button, Input } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/images/foto5.jpg';
import { DeleteOutlined, EditOutlined, HomeOutlined, UserOutlined, PlusOutlined, UnorderedListOutlined, SearchOutlined } from '@ant-design/icons';

const ExamListPage = () => {
    const [exams, setExams] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchExams();
    }, []);

    const fetchExams = async () => {
        try {
            const response = await axios.get('/api/Exam');
            setExams(response.data);
        } catch (error) {
            console.error('Error fetching exams:', error);
            message.error('Sınavlar getirilirken bir hata oluştu.');
        }
    };

    const handleSearch = (value) => {
        setSearchTerm(value.trim().toUpperCase());
    };

    // Sınavları filtrelemek için fonksiyon
    const filteredExams = exams.filter(exam => {
        return exam.examCode.toUpperCase().includes(searchTerm);
    });

    const handleSearchButtonClick = () => {
        // Buraya arama butonu tıklama işlemleri
        console.log('Arama butonuna tıklandı');
    };

    return (
        <div style={{ padding: '20px', marginTop: '100px' }}>
            
            <Row justify="center" style={{ marginBottom: '20px' }}>
                <Col span={20}>
                    {/* Arama kutusu */}
                    <Input

                        placeholder="Sınav Kodunu Girin"
                        prefix={<SearchOutlined style={{ color: 'purple' }} />}
                        style={{ width: 300, marginBottom: 5, borderRadius: 10, marginTop:20 }}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </Col>
            </Row>
            <Row justify="center">
                <Col span={20}>
                    <Card title={<span style={{ color: 'purple', fontFamily: 'Cambria, Cochin, Georgia, Times, Times New Roman, serif', fontSize: '24px' }}>SINAV LİSTESİ</span>} bordered={false} style={{ background: 'white', padding: '20px', textAlign: 'center', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                        {/* Filtrelenmiş sınavları göstermek için map fonksiyonu */}
                        {filteredExams.map(exam => (
                            <Card key={exam.id} style={{ marginBottom: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                                <div style={{ padding: '10px' }}>
                                    <p style={{ fontSize: '18px', fontWeight: 'bold', color: 'purple', marginBottom: '5px' }}>{exam.examCode}</p>
                                    <p style={{ marginBottom: '5px' }}><strong>Sınav Adı:</strong> {exam.examName}</p>
                                    <p style={{ marginBottom: '5px' }}><strong>Açıklama:</strong> {exam.description}</p>
                                    <p style={{ marginBottom: '5px' }}><strong>Puanlama Kriterleri:</strong> {exam.gradingCriteria}</p>
                                    <p style={{ marginBottom: '10px' }}><strong>Zamanlama Bilgileri:</strong> {exam.timingInfo}</p>
                                    <Link to={`/examdetailspage/${exam.id}`} style={{ color: 'purple', fontWeight: 'bold' }}>Detayları Gör</Link>
                                </div>
                            </Card>
                        ))}
                    </Card>
                </Col>
            </Row>
          
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
        </div>
    );
};

export default ExamListPage;
