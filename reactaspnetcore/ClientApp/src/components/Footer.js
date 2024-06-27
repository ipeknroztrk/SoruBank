import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; 
import footerImage from '../assets/images/footer.jpg';

const Footer = () => {
    return (
        <footer className="footer" style={{ backgroundImage: `url(${footerImage})` }}>
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <div className="footer-section">
                            <h5 className="footer-title">Hakkımda</h5>
                            <p className="footer-text">Bu proje, İNÖ Yazılım Şirketi tarafından soru bankası projesi için geliştirilmiştir.</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="footer-section">
                            <h5 className="footer-title">Linkler</h5>
                            <ul className="footer-list">
                                <li><Link to="/" className="footer-link">Anasayfa</Link></li>
                                <li><Link to="/iletisim" className="footer-link">İletişim</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="footer-section">
                            <h5 className="footer-title">İletişim</h5>
                            <address className="footer-text">
                                <p>Adres: 1234 Beşiktaş İstnabul , Türkiye </p>
                                <p>Email: ipeknurozturk@inoyazilim.com</p>
                            </address>
                        </div>
                    </div>
                </div>
                <hr className="footer-hr" />
                <div className="row">
                    <div className="col-12 text-center">
                        <p className="footer-copy">&copy; {new Date().getFullYear()} İNÖ Yazılım Şirketi. Tüm hakları saklıdır.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
