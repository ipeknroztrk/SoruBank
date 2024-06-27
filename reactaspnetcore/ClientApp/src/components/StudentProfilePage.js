import React, { useState } from 'react';
import { Row, Col, Card, Button, Avatar, Collapse, Tag, message } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, UserOutlined, UnorderedListOutlined, PlusOutlined } from '@ant-design/icons';
import studentsData from '../Data/students.json';
import './StudentProfilePage.css';

const { Panel } = Collapse;

const StudentProfilePage = () => {
    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const handleClassSelect = (classId) => {
        setSelectedClass(classId);
        setSelectedStudent(null);
        const className = studentsData.classes.find(cls => cls.id === classId).name;
      
    };

    const handleStudentSelect = (studentId) => {
        setSelectedStudent(studentId);
    };

    const getClassStudents = () => {
        if (selectedClass) {
            const classData = studentsData.classes.find(cls => cls.id === selectedClass);
            return classData ? classData.students : [];
        }
        return [];
    };

    return (
        <div style={{ padding: '20px', marginTop: '120px' }}>
            <Row justify="center" gutter={[16, 16]} style={{ marginBottom: '20px' }}>
                <Col xs={24} md={8}>
                    <Card title="Sınıf Seçimi" bordered={false} className="class-selection-card">
                        {studentsData.classes.map(cls => (
                            <Button
                                key={cls.id}
                                type="primary"
                                block
                                onClick={() => handleClassSelect(cls.id)}
                            >
                                {cls.name}
                            </Button>
                        ))}
                    </Card>
                </Col>
                <Col xs={24} md={16}>
                    {selectedClass ? (
                        <Card title={` ${studentsData.classes.find(cls => cls.id === selectedClass).name} Öğrencileri`} bordered={false} className="student-list-card-alt">
                            {getClassStudents().map(student => (
                                <Card
                                    key={student.id}
                                    className="student-card-alt"
                                    onClick={() => handleStudentSelect(student.id)}
                                >
                                    <Row align="middle" gutter={[16, 16]} style={{ padding: '8px' }}>
                                        <Col flex="auto">
                                            <Avatar size={94} src={require(`../assets/images/${student.image}`)} className="avatar-style" />

                                        </Col>
                                        <Col flex="auto">
                                            <p className="student-name">{student.name}</p>
                                            {selectedStudent === student.id && (
                                                <Collapse bordered={false} accordion>
                                                    {student.exams.map(exam => (
                                                        <Panel key={exam.examCode} header={`${exam.examCode}`} className="exam-panel">
                                                            <p>Doğru Cevap Sayısı: <Tag color="green">{exam.correctAnswers}</Tag></p>
                                                            <p>Yanlış Cevap Sayısı: <Tag color="red">{exam.wrongAnswers}</Tag></p>
                                                            <p>Toplam Puan: {exam.totalScore}</p>
                                                        </Panel>
                                                    ))}
                                                </Collapse>
                                            )}
                                        </Col>
                                    </Row>
                                </Card>
                            ))}
                        </Card>
                    ) : (
                        <Card title="Öğrenci Seçimi" bordered={false} className="student-list-card-alt">
                            <p>Lütfen bir sınıf seçin.</p>
                        </Card>
                    )}
                </Col>
            </Row>

            <div className="menu-icons">
                <Link to="/home">
                    <Button type="primary" shape="circle" icon={<HomeOutlined />} size="large" />
                </Link>
                <Link to="/studentprofilepage">
                    <Button type="primary" shape="circle" icon={<UserOutlined />} size="large" />
                </Link>
                <Link to="/examlistpage">
                    <Button type="primary" shape="circle" icon={<UnorderedListOutlined />} size="large" />
                </Link>
                <Link to="/teacherexammanagementpage">
                    <Button type="primary" shape="circle" icon={<PlusOutlined />} size="large" />
                </Link>
            </div>
        </div>
    );
};

export default StudentProfilePage;
