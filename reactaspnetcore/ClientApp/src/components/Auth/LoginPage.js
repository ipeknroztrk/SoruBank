import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../../assets/images/foto5.jpg'; 
import './LoginPage.css';
const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const [weather, setWeather] = useState(null);
    
    const [error, setError] = useState(null);
    const navigate = useNavigate();
   

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await axios.post('/api/Auth/login', {
                username: values.username,
                password: values.password
            });
            console.log('Giriş yanıtı:', response.data);
            message.success('Giriş başarılı!');
            navigate('/home');
        } catch (error) {
            console.error('Giriş hatası:', error);
            if (error.response && error.response.data) {
                message.error(`Giriş başarısız: ${error.response.data.message}`);
            } else {
                message.error(`Giriş başarısız. Lütfen tekrar deneyin.`);
            }
        }
        setLoading(false);
    };

    const handleRegisterRedirect = () => {
        navigate('/register'); 
    };

    const handleForgotPassword = () => {
        message.info('Mailinize yeni şifreniz yollandı.');
       
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Başarısız:', errorInfo);
    };

    return (
        <div className="login-container">
          
            <div className="login-form-container">
                <h5 className="login-title">GİRİŞ YAP </h5>
                <Form
                    name="loginForm"
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
                        label="Şifre"
                        name="password"
                        rules={[{ required: true, message: 'Lütfen şifrenizi girin!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item>
                        <Button type="submit" htmlType="submit" loading={loading} className="login-submit-button">
                            Giriş Yap
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Button type="button" onClick={handleRegisterRedirect} className="login-submit-button">
                            Kayıt Ol
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Button type="link" onClick={handleForgotPassword} style={{ color: 'purple' }}>
                            Şifremi Unuttum?
                        </Button>
                    </Form.Item>
                </Form>
               
            </div>
        </div>
    );
};

export default LoginPage;
