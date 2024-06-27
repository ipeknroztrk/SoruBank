import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Space, Table, Popconfirm, message, Card, Row, Col, InputNumber } from 'antd';
import axios from 'axios';
import backgroundImage from '../assets/images/foto5.jpg';
import { DeleteOutlined, EditOutlined, HomeOutlined, UserOutlined, UnorderedListOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'; 

const TeacherExamManagementPage = () => {
    const [exams, setExams] = useState([]);
    const [form] = Form.useForm();
    const [questions, setQuestions] = useState([]);
    const [selectedExam, setSelectedExam] = useState(null); 
    const teacherId = 1;

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
    const handleEditExam = async (examId) => {
        try {
            const response = await axios.get(`/api/Exam/${examId}`);
            if (response.data) {
                setSelectedExam(response.data);
                form.setFieldsValue({
                    examCode: response.data.examCode,
                    examName: response.data.examName,
                    description: response.data.description,
                    gradingCriteria: response.data.gradingCriteria,
                    timingInfo: response.data.timingInfo,
                });

                // Soruları güncellemek için state'i doğrudan kontrol et
                if (response.data.questions && Array.isArray(response.data.questions)) {
                    setQuestions(response.data.questions);
                } else {
                    // Eğer questions boş veya undefined ise, questions state'ini boş bir dizi olarak ayarlayın
                    setQuestions([]);
                }
            } else {
                message.error('Sınav detayları getirilirken bir hata oluştu.');
            }
        } catch (error) {
            console.error('Error fetching exam details:', error);
            message.error('Sınav detayları getirilirken bir hata oluştu.');
        }

      
    };



    const handleUpdateExam = async (values) => {
        const examData = {
            examId: selectedExam.examId,
            examCode: values.examCode,
            examName: values.examName,
            description: values.description,
            gradingCriteria: values.gradingCriteria,
            timingInfo: values.timingInfo,
            teacherId: teacherId,
            questions: questions.map(q => ({
                questionText: q.question,
                optionA: q.optionA,
                optionB: q.optionB,
                optionC: q.optionC,
                optionD: q.optionD,
                correctAnswer: q.correctAnswer
            }))
        };

        try {
            await axios.put(`/api/Exam/${selectedExam.examId}`, examData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            message.success('Sınav başarıyla güncellendi.');
            fetchExams(); // Sınavları yeniden getirerek tabloyu güncelliyoruz.
            setQuestions([]); // Sorular listesini sıfırlıyoruz.
            setSelectedExam(null); // Seçilen sınavı null olarak işaretliyoruz.
            form.resetFields(); // Formu sıfırlıyoruz.
        } catch (error) {
            console.error('Sunucu hatası:', error);
            message.error('Sınav güncellenirken bir hata oluştu.');
        }
    };




    const handleAddExam = async (values) => {
        const examData = {
            examCode: values.examCode,
            examName: values.examName,
            description: values.description,
            gradingCriteria: values.gradingCriteria,
            timingInfo: values.timingInfo,
            teacherId: teacherId,
            questions: questions.map(q => ({
                questionText: q.question,
                optionA: q.optionA,
                optionB: q.optionB,
                optionC: q.optionC,
                optionD: q.optionD,
                correctAnswer: q.correctAnswer
            }))
        };

        try {
            const examResponse = await axios.post('/api/Exam/AddExamWithQuestions', examData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            
            message.success('Sınav başarıyla eklendi.');
            fetchExams();
            setQuestions([]);
        } catch (error) {
            console.error('Sunucu hatası:', error);

            if (error.response) {
                console.error('Yanıt verisi:', error.response.data);
                console.error('Yanıt durumu:', error.response.status);
                console.error('Yanıt başlıkları:', error.response.headers);

                if (error.response.status === 400) {
                    console.error('Hata ayrıntıları:', error.response.data);
                    if (error.response.data.errors) {
                        const validationErrors = Object.values(error.response.data.errors).flat();
                        validationErrors.forEach(errorMsg => {
                            message.error(errorMsg);
                        });
                    } else {
                        message.error('Bir doğrulama hatası oluştu.');
                    }
                } else {
                    message.error(`Sunucu hatası: ${error.response.data}`);
                }
            } else if (error.request) {
                console.error('Yanıt alınamadı:', error.request);
                message.error('Yanıt alınamadı.');
            } else {
                console.error('İstek hatası:', error.message);
                message.error('İstek hatası: ' + error.message);
            }
        }
    };


    const handleDeleteExam = async (examId) => {
        try {
            await axios.delete(`/api/Exam/${examId}`);
            message.success('Sınav başarıyla silindi.');
            fetchExams();
        } catch (error) {
            console.error('Sınav silinirken bir hata oluştu:', error);
            message.error('Sınav silinirken bir hata oluştu.');
        }
    };



    const handleQuestionCountChange = (value) => {
        const count = parseInt(value, 10) || 0;
        const initialQuestions = Array.from({ length: count }, (_, index) => ({
            id: index + 1,
            question: '',
            optionA: '',
            optionB: '',
            optionC: '',
            optionD: '',
            correctAnswer: ''
        }));
        setQuestions(initialQuestions);
    };

    const handleQuestionChange = (index, key, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index][key] = value;
        setQuestions(updatedQuestions);
    };

    const handleAddQuestion = () => {
        const updatedQuestions = [
            ...questions,
            {
                id: questions.length + 1,
                question: '',
                optionA: '',
                optionB: '',
                optionC: '',
                optionD: '',
                correctAnswer: ''
            },
        ];
        setQuestions(updatedQuestions);
    };

    const handleRemoveQuestion = (index) => {
        const updatedQuestions = questions.filter((_, idx) => idx !== index);
        setQuestions(updatedQuestions);
    };

    const onDeleteExam = async (examId) => {
        try {
            await handleDeleteExam(examId);
        } catch (error) {
            console.error('Sınav silinirken bir hata oluştu:', error);
            message.error('Sınav silinirken bir hata oluştu.');
        }
    };

    const columns = [
        {
            title: 'Sınav Kodu',
            dataIndex: 'examCode',
            key: 'examCode',
            align: 'center',
            width: '20%',
        },
        {
            title: 'Sınav Adı',
            dataIndex: 'examName',
            key: 'examName',
            align: 'center',
            width: '50%',
        },
        {
            title: 'İşlemler',
            key: 'action',
            align: 'center',
            render: (text, record) => (
                <Space size="small">
                    
                    <Popconfirm
                        title="Sınavı silmek istediğinizden emin misiniz?"
                        onConfirm={() => handleDeleteExam(record.id)}
                        okText="Evet"
                        cancelText="Hayır"
                    >
                        <Button
                            type="text"
                            icon={<DeleteOutlined />}
                            style={{ color: 'purple' }}
                            danger
                        />
                    </Popconfirm>
                </Space>
            ),
           
          
        },
    ];

   
    return (

        <div style={{ padding: '20px', marginTop: '110px' }}>
           
            <Row justify="center" style={{ marginBottom: '20px' }}>
                <Col span={20}>
                    <Card title={<span style={{ color: 'purple', fontFamily: 'Cambria, Cochin, Georgia, Times, Times New Roman, serif'  }}>SINAV EKLEME SAYFASI  </span>} bordered={false} style={{ background: 'white', padding: '20px', textAlign: 'center' }}>
                        <Form form={form} layout="vertical" onFinish={handleAddExam} >
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        name="examCode"
                                        label="Sınav Kodu"
                                        rules={[{ required: true, message: 'Lütfen sınav kodunu girin.' }]}
                                    >
                                        <Input placeholder="Sınav Kodu" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="examName"
                                        label="Sınav Adı"
                                        rules={[{ required: true, message: 'Lütfen sınav adını girin.' }]}
                                    >
                                        <Input placeholder="Sınav Adı" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        name="description"
                                        label="Açıklama"
                                        rules={[{ required: true, message: 'Lütfen sınav açıklamasını girin.' }]}
                                    >
                                        <Input placeholder="Açıklama" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="gradingCriteria"
                                        label="Puanlama Kriterleri"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Lütfen puan kriterlerini girin.'
                                            },
                                            {
                                                pattern: /^[0-9]*$/,
                                                message: 'Sadece rakam giriniz.'
                                            }
                                        ]}
                                    >
                                        <Input placeholder="Puanlama Kriterleri" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        name="timingInfo"
                                        label="Zaman Bilgisi"
                                        rules={[{ required: true, message: 'Lütfen zaman bilgisini girin.' }]}
                                    >
                                        <Input placeholder="Zaman Bilgisi" />
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Form.Item
                                        name="questionCount"
                                        label="Soru Sayısı"
                                        labelAlign=""
                                        rules={[{ required: true, message: 'Lütfen soru sayısını girin.' }]}
                                    >
                                        <InputNumber min={0} onChange={handleQuestionCountChange} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item style={{ textAlign: 'right' }}>
                                <Button style={{ color: 'purple' }} htmlType="submit">
                                    Sınav Ekle
                                </Button>
                            </Form.Item>
                        </Form>
            <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
    {questions.map((question, index) => (
        <Col span={8} key={index}>
            <Card
                title={`Soru ${index + 1}`}
                bordered={false}
                style={{ marginBottom: '20px', minHeight: '200px' }}
                extra={
                    <Button
                        type="link"
                        style={{ color: 'purple' }}  // Adjusted to a muted purple color
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleRemoveQuestion(index)}
                        style={{ color: '#8a2be2', borderColor: '#8a2be2' }}
                    />
                }
            >
                <Form layout="vertical" style={{ background: '#cdc5df', padding: '16px', borderRadius: '8px' }}>
                    <Form.Item label="Soru" style={{ marginBottom: '12px' }}>
                        <Input
                            value={question.question}
                            onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                            placeholder="Soru metni"
                        />
                    </Form.Item>
                    <Form.Item label="Seçenek A" style={{ marginBottom: '12px' }}>
                        <Input
                            value={question.optionA}
                            onChange={(e) => handleQuestionChange(index, 'optionA', e.target.value)}
                            placeholder="Seçenek A"
                        />
                    </Form.Item>
                    <Form.Item label="Seçenek B" style={{ marginBottom: '12px' }}>
                        <Input
                            value={question.optionB}
                            onChange={(e) => handleQuestionChange(index, 'optionB', e.target.value)}
                            placeholder="Seçenek B"
                        />
                    </Form.Item>
                    <Form.Item label="Seçenek C" style={{ marginBottom: '12px' }}>
                        <Input
                            value={question.optionC}
                            onChange={(e) => handleQuestionChange(index, 'optionC', e.target.value)}
                            placeholder="Seçenek C"
                        />
                    </Form.Item>
                    <Form.Item label="Seçenek D" style={{ marginBottom: '12px' }}>
                        <Input
                            value={question.optionD}
                            onChange={(e) => handleQuestionChange(index, 'optionD', e.target.value)}
                            placeholder="Seçenek D"
                        />
                    </Form.Item>
                    <Form.Item label="Doğru Cevap" style={{ marginBottom: '12px' }}>
                        <Input
                            value={question.correctAnswer}
                            onChange={(e) => handleQuestionChange(index, 'correctAnswer', e.target.value)}
                            placeholder="Doğru Cevap"
                        />
                    </Form.Item>
                </Form>

            </Card>
        </Col>
    ))}
                           
    {questions.length === 0 && (
        <Col span={24}>
            <Card style={{ textAlign: 'center', padding: '10px', minHeight: '100px' }}>
                Soru eklemek için yukarıdaki formu kullanın.
            </Card>
        </Col>
    )}
    <Col span={24} style={{ textAlign: 'right' }}>
                                <Button type="dashed" style={{ color: 'purple' }} onClick={handleAddQuestion}>
            + Soru Ekle
        </Button>
    </Col>
</Row>

                        <Table dataSource={exams} columns={columns} rowKey="id" />
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
export default TeacherExamManagementPage;


