import React, { useState } from 'react';
import { Form, Input, Button, message, Select } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../../assets/images/foto5.jpg';// Yol güncellendi
import './RegisterPage.css'; // CSS dosyasını import et




const { Option } = Select;
const RegisterPage = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await axios.post('/api/Auth/register', {
                username: values.username,
                name: values.name,
                surname: values.surname,
                email: values.email,
                password: values.password,
                role: values.role,
            });

            console.log('Register response:', response.data);
            message.success('Kayıt Başarılı!');

            // Kayıt başarılı olduğunda login sayfasına yönlendirin
            navigate('/login');
        } catch (error) {
            console.error('Register error:', error);
            message.error('Kayıt Başarısız. Lütfen Tekrar Deneyiniz.');
        }
        setLoading(false);
    };

    const handleRegisterRedirect = () => {
        navigate('/login'); // Kayıt ol butonuna tıklanıldığında yönlendirme yapın
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="register-container">
            <div className="register-background" style={{ backgroundImage: `url(${backgroundImage})` }} />
            <div className="register-form-container">
                <h5 className="login-title">Kayıt Ol</h5>
            <Form
                name="registerForm"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Kullanıcı Adı"
                    name="username"
                    rules={[{ required: true, message: 'Lütfen kullanıcı adınızı girin!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="İsim"
                    name="name"
                    rules={[{ required: true, message: 'Lütfen isminizi girin!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Soyisim"
                    name="surname"
                    rules={[{ required: true, message: 'Lütfen soyisminizi girin!' }]}
                >
                    <Input />
                </Form.Item>

               
                <Form.Item
                    label="Şifre"
                    name="password"
                    rules={[{ required: true, message: 'Lütfen şifrenizi girin!' }]}
                >
                    <Input.Password />
                </Form.Item>


                <Form.Item
                    label="Rol"
                    name="role"
                    rules={[{ required: true, message: 'Lütfen rolünüzü seçin!' }]}
                >
                    <Select placeholder="Rolünüzü seçin">
                        <Option value="Öğrenci">Öğrenci</Option>
                        <Option value="Öğretmen">Öğretmen</Option>
                    </Select>
                </Form.Item>

                    <Form.Item>
                        <Button type="submit" className='register-submit-button' htmlType="submit" loading={loading} style={{ width: '100%' }}>
                        Kayıt Ol
                    </Button>
                </Form.Item>
                <Form.Item>
                        <Button type="submit" className='register-submit-button' onClick={handleRegisterRedirect} style={{ width: '100%' }}>
                        Giriş Yap
                    </Button>
                </Form.Item>
            </Form>
            </div>
        </div>
    );
};

export default RegisterPage;
